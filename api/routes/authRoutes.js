import express from "express";
import {
  login,
  logout,
  register,
  forgot,
  reset,
} from "../controller/authController.js";
import upload from "../utils/multer.js";

// Route oluştur
const router = express.Router();

// Her route'a karşılık gelecek fonksiyonu belirle
router.post("/register", upload.single("photo"), register);

router.post("/login", login);

router.post("/logout", logout);

// Şifre unuttum isteği
router.post("/forgot-password", forgot);

// Yeni Şifre Belirleme İsteği
router.patch("/reset-password/:token", reset);

export default router;
