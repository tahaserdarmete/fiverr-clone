import {model, Schema} from "mongoose";
import validator from "validator";
import crpyto from "crypto";
import bcrypt from "bcrypt";

// Kullanıcı Şeması Oluştur
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Lütfen kullanıcı adı alanını doldurunuz."],
      unique: [
        true,
        "Bu isimde bir kullanıcı mevcut. Lütfen farklı bir kullanıcı adı seçiniz.",
      ],
    },

    email: {
      type: String,
      required: [true, "Lütfen mail alanını doldurunuz."],
      unique: [
        true,
        "Bu mail adresine kayıtlı bir kullanıcı mevcut. Lütfen farklı bir mail adresi seçiniz",
      ],
    },

    password: {
      type: String,
      required: [true, "Lütfen şifre alanını doldurunuz."],
    },

    passwordConfirm: {
      type: String,
      required: [true, "Şifreler uyuşmuyor"],
      validate: [validator.isStrongPassword, "Şifreniz yeterince güçlü değil."],
    },

    photo: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/574/369/png-transparent-avatar-computer-icons-user-random-icons-purple-blue-heroes.png",
    },

    country: {
      type: String,
      required: [true, "Lütfen ülke alanını doldurunuz."],
    },

    isSeller: {
      type: Boolean,
      default: false,
    },

    phone: {
      type: Number,
      // required: [true, "Lütfen telefon numarası alanını doldurunuz."],
    },

    description: {
      type: String,
      min: 20,
    },

    // Şifre Değiştirmeye yarayan token
    passwordResetToken: String,

    // Şifre değiştirilme tarihi ile bütün oturumlardan çıkış yapalım
    passwordResetAt: Date,

    // Şifre sıfırlama tokeninin tükenme tarihi(genellikle 10-15 dk)
    passResetExpires: Date,
  },
  {timestamps: true}
);

// ? MIDDLEWARE
// ? --------------------------------------------------
// Kullanıcı oluşturulduktan sonra ihtiyaç duymadığımız passwordConfirm değerini siliyoruz.

userSchema.pre("save", function (next) {
  this.passwordConfirm = undefined;

  // Kullanıcının şifresini Hash ve Salt'la
  this.password = bcrypt.hashSync(this.password, 12);

  next();
});

// Şifre değişirse değiştirilme tarihini güncelle
userSchema.pre("save", async function (next) {
  // Eğer şifre değiştirilmediyse veya kullanıcı ilk defa oluşturduysa geç
  if (!this.isModified("password") || this.isNew) return next();

  // Şifre değiştirildi ise değiştirme tarihi güncellensin
  this.passwordResetAt = Date.now() - 2000;
});

// ? METHODS
// ? --------------------------------------------------

userSchema.methods.createResetToken = function () {
  // 1) 32 bpte rastgele veri oluştur ve hex cinsine çevir
  const resetToken = crpyto.randomBytes(32).toString("hex");

  // 2) Şifreyi haslediğimiz gibi kötü amaçlı kişiler erişim sağlayıp şifreyi sıfırlayamasın
  this.passwordResetToken = crpyto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // 3) Reset Tokeninin son geçerlilik tarihini kaydet
  this.passResetExpires = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

// Şifrelerş kıyaslayan methods
userSchema.methods.comparePassword = async function (pass, hashedPass) {
  // İki şifre eşleşiyorsa true, değilse false
  return await bcrypt.compare(pass, hashedPass);
};

export default model("User", userSchema);
