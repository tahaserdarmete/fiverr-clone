import error from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Protect(koruma) middleware'i giriş yapmamış veya JWT olmayan kullanıcıların bazı endpointlere istek atmasını engeller.

// Aynı zamanda isteğe giriş atmış kullanıcının ID vb. verilerini de ekleyerek ilerleyen süreçte kullanıcıyı find fonksiyonu ile bulmaktan kurtarır.

const protect = async (req, res, next) => {
  // 1) Cookie ile gelen token'a eriş
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  //   2) Cookie ya da header'da token yoksa hata döndür
  if (!token) {
    // next() içerisi boşsa sorun yok. Eğer içine değer girilirse eğer hata döndür anlamına geliyor.
    return next(error(403, "Yetki yok. Token bulunamadı."));
  }

  //   3) Token varsa geçerli mi kontrol et
  jwt.verify(token, process.env.JWT_TOKEN, (err, payload) => {
    // 4) Token geçersizse hata ver

    if (err) {
      return next(
        error(403, "Token geçersiz veya süresi dolmuş, tekrar giriş yapınız.")
      );
    }

    //  5) Token geçerli ise req nesnesinin içine kullanıcı bilgilerini ekle

    // Bu sayede middleware'den sonra çalıştıracağımız bütün fonksiyonlar kullanıcının ID'sine ve satıcı olup olmadığı değerine tekrardan find isteği atmadan erişebilecek.

    req.userId = payload.id;
    req.isSeller = payload.isSeller;
  });

  //   6) Eğer hepsi tamamla sonraki adıma geç
  next();
};

export default protect;
