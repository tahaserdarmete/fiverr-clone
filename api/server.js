import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import gigRouter from "./routes/gigRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

// Dotenv Kurulumu
dotenv.config();

// Express uygulaması oluştur
const app = express();

// İsteğin body'sini işle
app.use(express.json());

//  İStekle gelen cookie'leri işle
app.use(cookieParser());

// Cors Hatalarını Önüne Geç
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

// Veritabanı ile iletişime geç
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("⚡️ Veri Tabanına başarıyla bağlanıldı.");
  })
  .catch((err) => {
    console.log("❌ Veri Tabanına bağlanırken hata oluştu.", err);
  });

// Route'ları oluştur
app.use("/api/auth", authRouter);
app.use("/api/gig", gigRouter);

app.use((req, res) => {
  return res.status(404).send({
    success: false,
    message: "Aradığınız yol bulunamadı.",
  });
});

// Evrensel Hata Yakalama ve Şekillendirme Fonksiyonu
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server 4044 portunda çalışıyor...`);
});
