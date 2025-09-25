import {
  FaBriefcase,
  FaBullhorn,
  FaLaptopCode,
  FaMusic,
  FaPaintBrush,
  FaPenFancy,
  FaRobot,
  FaUserTie,
  FaVideo,
} from "react-icons/fa";

export const categories = [
  {
    name: "Programlama ve Teknoloji",
    icon: <FaLaptopCode />,
  },

  {
    name: "Grafik ve Tasarım",
    icon: <FaPaintBrush />,
  },

  {
    name: "Dijital Pazarlama",
    icon: <FaBullhorn />,
  },

  {
    name: "Yazma ve Çeviri",
    icon: <FaPenFancy />,
  },

  {
    name: "Video ve Animasyon",
    icon: <FaVideo />,
  },

  {
    name: "Yapay Zeka Hizmetleri",
    icon: <FaRobot />,
  },

  {
    name: "Müzik ve Ses",
    icon: <FaMusic />,
  },

  {
    name: "İş",
    icon: <FaBriefcase />,
  },

  {
    name: "Danışmanlık",
    icon: <FaUserTie />,
  },
];

export const items = [
  {
    title: "Uzman işe alım danışmanları",
    text: "Doğru yeteneği bulmanız ve projenizin her ihtiyacını karşılamanız için bir hesap yöneticisine güvenin.",
  },
  {
    title: "Memnuniyet garantisi",
    text: "Eksik teslimatlar için garantili iade ile güvenle sipariş verin.",
  },
  {
    title: "Gelişmiş yönetim araçları",
    text: "Serbest çalışanları ekibinize ve projelerinize sorunsuz bir şekilde entegre edin.",
  },
  {
    title: "Esnek ödeme modelleri",
    text: "Proje başına ödeme yapın veya daha uzun süreli işbirlikleri için saatlik ücret seçeneklerini tercih edin.",
  },
];

export const notFound = "/notFound.jpeg";

export const inputs = [
  {
    label: "Başlık",
    name: "title",
    required: true,
  },

  {
    label: "Kapak Fotoğrafı",
    name: "coverImage",
    required: true,
    type: "file",
  },

  {
    label: "Fotoğraflar",
    name: "images",
    required: true,
    type: "file",
    multiple: true,
  },

  {
    label: "Revizyon Sayısı",
    name: "packageRevisions",
    required: true,
    type: "number",
    min: 1,
  },

  {
    label: "Özellikler(',' ile ayırınız)",
    name: "packageFeatures",
    required: true,
    type: "textarea",
  },

  {
    label: "Açıklama",
    name: "description",
    required: true,
    type: "textarea",
  },

  {
    label: "Paket Açıklaması",
    name: "packageDescription",
    required: true,
  },

  {
    label: "Paket Başlığı",
    name: "packageTitle",
    required: true,
  },

  {
    label: "Teslimat Süresi (gün)",
    name: "packageDuration",
    required: true,
    min: 1,
    max: 90,
    type: "number",
  },

  {
    label: "Fiyat ($)",
    name: "packagePrice",
    type: "number",
    required: true,
    min: 1,
  },
];
