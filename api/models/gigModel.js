import {model, Schema} from "mongoose";

// Belge Şeması

// Fiverr'da yayınlanan her bir iş(gig) her mongo verisinde olduğu gibi birer döküman yani belgedir.

// Mongoose'un Schema özelliğini kullanarak bu belgenin sahip olması gereken verileri belirtebiliyoruz.

const gigSchema = new Schema(
  {
    user: {
      // Obje referansı, ID olarak tutulan kullanıcıya gönderilmeden hemen önce asıl veriler gönderilir
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true, // Yazının başında ve sonunda boşluk varsa kırpar
    },

    description: {
      type: String,
      required: true,
      minLength: [15],
      maxLength: [500],
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    starCount: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      required: true,
      // default:
      //   "https://raw.githubusercontent.com/Abdurrahman-Subh/mdx-blog/main/images/logo-fiverr.png",
    },

    images: {
      type: [String],
      //   required: true,
    },

    packageTitle: {
      type: String,
      required: true,
    },

    packageDescription: {
      type: String,
      required: true,
    },

    packagePrice: {
      type: Number,
      required: true,
    },

    packageFeatures: {
      type: [String],
      required: true,
    },

    packageDuration: {
      type: Number,
      required: true,
    },

    packageRevisions: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Oluşturulma ve güncellenme tarihlerini otomatik olarak tutar
  }
);

export const Gig = model("Gig", gigSchema);
