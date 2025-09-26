import {Gig} from "../models/gigModel.js";
import {upload} from "../utils/cloudinary.js";
import c from "../utils/catchAsync.js";
import e from "../utils/error.js";

// Bütün gigleri alırken eğer filtrelerimiz varsa bunları mongoose'un çalışabileceği hale getirmek adına fonksiyon yaz
const buildFilters = (query) => {
  const filters = {};

  let sort = {};

  // query (arama) isteğindende category değeri geliyorsa filtrele
  if (query.category) filters.category = query.category;

  // query (arama) isteğindende userId değeri geliyorsa filtrele
  if (query.userId) filters.user = query.userId;

  // query (arama) isteğindende min/max değeri geliyorsa filtrele
  if (query.min || query.max) {
    filters.packagePrice = {};

    if (query.min) filters.packagePrice.$gte = query.min;
    if (query.max) filters.packagePrice.$lte = query.max;
  }

  if (query.search) filters.title = {$regex: query.search, $options: "i"}; // insensitive (büyük-küçük harfe duyarsız.)

  // arama nesnesinden sortNy değeri geliyorsa sortBy değerine göre sırala
  if (query.sortBy) {
    // order değeri "desc" gönderildiyse yüksekten alçağa ise -1 değilse alçaktan çoğa doğru sırala 1
    const order = query.order === "desc" ? -1 : 1;

    // * sort objesinin içerisine kullanıcı neye göre sıralamak istiyorsa o değeri koyuyoruz ve o değer "desc" ya da "asc" olma durumuna göre -1 ya da 1 değeri alıyor
    sort[query.sortBy] = order;
  } else {
    // eğer sortBy gönderilmediyse (kullanıcı sıralamadıysa) oluşturulma tarihine göre sıralama yap diyoruz
    sort.createdAt = -1;
  }

  return {filters, sort};
};

export const getAllGigs = c(async (req, res) => {
  const {filters, sort} = buildFilters(req.query);

  // * yukarıda oluşturduğumuz filtreleri find fonksiyonunda, sıralamaları ise sort fonksiyonunun içerisinde kullanıyoruz
  const gigs = await Gig.find(filters)
    .sort(sort)
    .populate("user", "username photo");

  if (gigs.length === 0)
    throw e(404, "Aradığınız kriterlere uyan ilan bulunamadı.");

  res.status(200).json({
    message: "Hizmet verileri alındı.",
    results: gigs.length,
    data: gigs,
  });
});

export const createGig = c(async (req, res, next) => {
  console.log("satıcı hesabı:", req.isSeller);
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

    req.body.coverImage = coverImage?.secure_url || "/notFound.jpeg";

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

  return res.status(201).send({
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

// Gig düzenleme Fonksiyonu
export const updateGig = c(async (req, res, next) => {
  if (!req.isSeller)
    throw e(403, "Sadece satıcı hesabı sahipleri ilan düzenleyebilir.");

  const gig = await Gig.findById(req.params.id);

  if (req.userId != gig.user)
    throw e(403, "Bu gig size ait olmadığından düzenleme yapamazsınız.");

  const b = req.body;

  if (req?.files?.coverImage?.length > 0) {
    console.log("Kapak resmi gönderilmiş");

    const coverImage = await upload(
      next,
      req.files.coverImage[0].path,
      "gig-images",
      900,
      900,
      "fill",
      "80"
    );

    req.body.coverImage = coverImage?.secure_url || "/notFound.jpeg";
  }

  if (req?.files?.images?.length > 0) {
    console.log("Kullanıcı resmi gönderilmiş");
    const promises = req.files.images.map((image) =>
      upload(next, image.path, "gig-images", 900, 900, "fill", "80")
    );

    const images = await Promise.allSettled(promises);

    req.body.images = images.map((image) => image.value.secure_url);
  }

  (gig.title = b.title),
    (gig.description = b.description),
    (gig.category = b.category),
    (gig.packageTitle = b.packageTitle),
    (gig.packageDescription = b.packageDescription),
    (gig.packagePrice = b.packagePrice),
    (gig.packageFeatures = b.packageFeatures),
    (gig.packageDuration = b.packageDuration),
    (gig.packageRevisions = b.packageRevisions);

  if (req.body.coverImage) gig.coverImage = req.body.coverImage;
  if (req.body.images) gig.images = req.body.images;

  const updatedGig = await gig.save();

  return res.status(200).send({
    success: true,
    message: "Hizmet başarıyla güncellendi",
    data: updatedGig,
  });
});

export const deleteGig = c(async (req, res) => {
  if (!req.isSeller)
    throw e(403, "Satıcı hesabınız aktif olmadığınızdan silemezsiniz.");

  const gig = await Gig.findById(req.params.id);

  if (req.userId != gig.user)
    throw e(403, "Bu gig size ait olmadığından silemezsiniz.");

  await gig.deleteOne();

  return res.status(200).send({
    success: true,
    message: "Hizmet başarıyla silindi.",
  });
});
