import {Gig} from "../models/gigModel.js";
import {upload} from "../utils/cloudinary.js";
import c from "../utils/catchAsync.js";
import e from "../utils/error.js";

// Bütün gigleri alırken eğer filtrelerimiz varsa bunları mongoose'un çalışabileceği hale getirmek adına fonksiyon yaz
const buildFilters = (query) => {
  const filters = {};

  if (query.category) filters.category = query.category;
  if (query.userId) filters.user = query.userId;
  if (query.min || query.max) {
    filters.packagePrice = {};

    if (query.min) filters.packagePrice.$gte = query.min;
    if (query.max) filters.packagePrice.$lte = query.max;
  }

  if (query.search) filters.title = {$regex: query.search, $options: "i"}; // insensitive (büyük-küçük harfe duyarsız.)

  return filters;
};

export const getAllGigs = c(async (req, res) => {
  const filters = buildFilters(req.query);

  const gigs = await Gig.find(filters).populate("user", "username photo");

  if (gigs.length === 0)
    throw e(404, "Aradığınız kriterlere uyan ilan bulunamadı.");

  res.status(200).json({
    message: "Hizmet verileri alındı.",
    results: gigs.length,
    data: gigs,
  });
});

export const createGig = c(async (req, res, next) => {
  // İsteği atan kullanıcı satıcı hesabı değilse hata döndür
  if (!req.isSeller)
    throw e(403, "Sadece satıcı hesapları yeni bir ilan oluşturabilir.");

  console.log("\n\n İSTEĞİN GÖVDESİ: ", req.body, "\n\n");

  // Resimler geliyor mu kontrol et
  const files = req.files;

  console.log("files:", req.files);

  let coverImage;

  // 1) Kapak fotosunu cloudinary yükle
  if (req.files) {
    coverImage = await upload(
      next,
      files.coverImage[0].path,
      "gig-images",
      900,
      900,
      "fill",
      "80"
    );

    req.body.coverImage = coverImage?.secure_url || "notFound.jpeg";

    // coverImage'den gelen URL'i isteğin body'sine ekle

    // 2) Geri Kalan Resimler için async fonksiyonlar direkt asenkron işlem çalıştıramadığı için promise oluştur. (async-await kullanmadan)

    const promises = files.images.map((image) =>
      upload(next, image.path, "gig-images", 900, 900, "fill", "80")
    );

    // Yukarıda oluşturduğumuz promise leri çözümleyeceğiz

    const images = await Promise.allSettled(promises);

    // Resimleri body nin imagesine yükle
    req.body.images = images.map((image) => image.value.secure_url);

    console.log(req.body);

    // WIP (work-in-progess) kullanıcı satıcı olup olmadığını kontrol etmek için protect middleware'i lazım
  }

  const savedGig = await Gig.create({...req.body, user: req.userId});

  res.status(201).send({
    message: " İlân başarıyla oluşturuldu",
    data: savedGig,
    success: true,
  });
});

export const getGig = c(async (req, res) => {
  const gig = await Gig.findById(req.params.id).populate("user");

  if (!gig) throw e(404, "Aradığınız hizmet bulunamadı");

  return res.status(200).send({
    success: true,
    message: "Hizmet verisi alındı.",
    data: gig,
  });
});
