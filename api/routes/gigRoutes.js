import express from "express";
import {
  createGig,
  deleteGig,
  getAllGigs,
  getGig,
  updateGig,
} from "../controller/gigController.js";
import protect from "../middlewares/protect.js";
import upload from "../utils/multer.js";

// 1) Router oluşturma
const router = express.Router();

// 2) Rotaları(Endpoint) belirle

router
  .route("/")
  .get(getAllGigs)
  .post(
    protect,
    // Form-data tarzında gönderilen isteklerdeki dosyaları alabilmek adına multer kullanacağız
    upload.fields([
      // Kapak resmi adında dosya alanımız için 1 tane resim kabul ediyoruz.
      {name: "coverImage", maxCount: 1},
      // Düz resimler adında dosya alanımız için 6 resim kabul ediyoruz.
      {name: "images", maxCount: 6},
    ]),
    createGig
  );

// ID gerektiren rotalar
router
  .route("/:id")
  .get(getGig)
  .patch(
    protect, // Form-data tarzında gönderilen isteklerdeki dosyaları alabilmek adına multer kullanacağız
    upload.fields([
      // Kapak resmi adında dosya alanımız için 1 tane resim kabul ediyoruz.
      {name: "coverImage", maxCount: 1},
      // Düz resimler adında dosya alanımız için 6 resim kabul ediyoruz.
      {name: "images", maxCount: 6},
    ]),
    updateGig
  )
  .delete(protect, deleteGig);

export default router;
