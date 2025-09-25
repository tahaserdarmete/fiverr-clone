import multer from "multer";

// Sana vereceğim verileri geçici hafızada tut sonra kullanacağız
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Yukarıdaki ayarlara sahip multer örneği oluştur
const upload = multer({storage: storage});

export default upload;
