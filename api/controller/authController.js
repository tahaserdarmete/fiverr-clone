import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {upload} from "../utils/cloudinary.js";
import {sendMail} from "../utils/mailtrap.js";
import crypto from "crypto";
import c from "../utils/catchAsync.js";
import e from "../utils/error.js";

// Kayıt Ol
const register = c(async (req, res, next) => {
  // Kullanıcıdan gelen resme eriş

  // ? Eğer middleware olarak "upload.single" kullandıysak req.file diye erişiriz.
  // ? Eğer middleware olarak "upload.fields" yani birden fazla resim yüklediysek req.files olarak erişiriz.

  const file = req.file;

  // Üstteki resmi buluta yükle
  const image = req.file
    ? await upload(next, file.path, "avatars", 200, 200, "fill", "auto")
    : " ";

  // Artık image objesinin içinde secure_url yani resmimizein linkine eriştik. İsteğimizin body'sinde image alanına bu url ile değiştirebiliriz.
  req.body.photo = image.secure_url;

  // Kullanıcıyı veri tabanına kayıt etmek için yeni kullanıcı oluştur
  const newUser = await User.create({
    // İsteğin body'si içerisinde bulunan tüm verileri aynen tut sadece password kısmında Hash&Salt şifreyi ekle
    ...req.body,
    password: req.body.password,
  });

  // Client'a gönderilecek cevap içerisinden şifre kısmını kaldır
  newUser.password = null;

  // Client'a cevap gönder
  return res
    .status(201)
    .json({message: "Kayıt işlemi başarılı", user: newUser});
});

// Giriş Yap
const login = c(async (req, res, next) => {
  // Kullanıcıyı Db içerisinde bul
  const user = await User.findOne({username: req.body.username});

  // Eğer kullanıcı yoksa hata döndür
  if (!user) throw e(404, "Giriş bilgileriniz yanlış");

  // Kullanıcı bulunursa kullanıcının şifresini kontrol et
  const isCorrect = await user.comparePassword(
    req.body.password,
    user.password
  );

  //  Şifre yanlışsa hata döndür
  if (!isCorrect) throw e(404, "Girdiğiniz şifre doğru değil");

  // Şifre doğru ise jwt token oluştur
  const token = jwt.sign(
    {id: user.id, isSeller: user.isSeller},
    process.env.JWT_TOKEN,
    {
      expiresIn: "7d",
    }
  );

  // Client'a gönderilecek cevap içerisinden şifre alanını kaldır
  user.password = null;

  // Client'a cevap gönder
  res
    .cookie("token", token, {httpOnly: true, sameSite: "none"})
    .status(200)
    .json({message: "Giriş işlemi başarılı", user, token});
});

// Çıkış Yap
const logout = c((req, res) => {
  // Cookie içerisindeki token'i kaldır
  res.clearCookie("token").json({message: "Çıkış işlemi başarılı"});
  res.json({message: "Çıkış işlemi"});
});

// Şifre Sıfırlama Bağlantısı
const forgot = c(async (req, res) => {
  const user = await User.findOne({email: req.body.email});

  // Kullanıcı yoksa hata döndür
  if (!user)
    throw e(404, "Bu e-posta adresine kayıtlı kullanıcı bulunmamaktadır.");

  // Şifre sıfırlama tokeni oluştur
  const token = user.createResetToken();

  // Güncellemeleri veri doğrulaması olmadan kaydedilim.
  await user.save({validateBeforeSave: false});

  const passwordResetLink = `http://localhost:5173/reset-password/${token}`;

  // Kullanıcıya şifre sıfırlama maili gönder
  await sendMail({
    email: user.email,
    subject: "Şifre sıfırlama bağlantınız.",
    text: token,
    html: `
        <h2> Merhaba ${user.username}</h2>
        <p>
          <b>${user.email}</b> e-posta adresine bağlı Fiverr Hesabı için şifre sıfırlama bağlantısı oluşturuldu.
        </p>

        <p> Aşağıdaki linke tıklayarak şifrenizi sıfırlayabilirsiniz.</p>

        <a href="${passwordResetLink}">${passwordResetLink}</a>
      `,
  });

  return res.status(200).send({
    success: true,
    message: "Şifre sıfırlama bağlantısı gönderildi.",
  });
});

// Şifre Sıfırlama İsteği
const reset = c(async (req, res) => {
  // Parametrelerde gelen tokeni kullanarak kullanıcıyı bul
  const resetToken = req.params.token;

  // Emailden ulaştığımız için şifrelenmemiş tokeni şifreleyerek vt ile uyuyor mu kontrol et
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Veri Tabanında Hash'lediğimiz tokene sahip kullanıcı var mı
  const user = await User.findOne({
    // Tokenleri uyuşan kullanıcı var mı
    passwordResetToken: hashedToken,

    // Tokenin bitiş tarihi şuanki tarihten büyük mü (Büyükse daha o tarihe daha gelmedik kabul et, küçükse etme)
    passResetExpires: {$gt: Date.now()},
  });

  if (!user)
    throw e(403, "Şifre sıfırlama tokeninin süresi dolmuş veya geçersiz.");

  // Buraya kadar hiç bir sorun yoksa (Kullanıcı var, token doğru, süres var)
  // Artık bilgileri güncelleyelim
  user.password = req.body.newPass;
  user.passwordConfirm = req.body.newPassConfirm;
  user.passwordResetToken = undefined;
  user.passResetExpires = undefined;

  // Kullanıcıyı kaydet
  await user.save();

  res.status(200).send({
    success: true,
    message: "Şifreniz başarıyla güncellendi.",
  });
});

export {register, login, logout, forgot, reset};
