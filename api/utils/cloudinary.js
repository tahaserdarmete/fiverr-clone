import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary'i konfigürasyon
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Üstükei cloudinary örneğini kullanarak resim yükleyen fonksiyon
const upload = async (
  next,
  file_path,
  folder,
  width,
  height,
  crop,
  quality,
  type
) => {
  return await cloudinary.uploader.upload(
    // Yüklenecek dosyanın yolu
    file_path,

    // Dosya yükleme ayarları
    {
      folder,
      resource_type: type,
      width,
      height,
      crop,
      quality,
    },

    // İşlem bittiğinde çalışan fonksiyon
    (err) => {
      if (err) return next(new Error("Fotoğraf yüklenemedi"));
    }
  );
};

export {upload};
