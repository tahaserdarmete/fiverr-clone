import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendMail = async ({email, subject, text, html}) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  });

  const mailOptions = {
    // Gönderen Adres
    from: "'Furkan Ercan' <info@fiverrclone.com>",

    // Gönderilecek Adres
    to: email,

    // Konu
    subject,

    // Düz Yazı
    text,

    // Varsa Html
    html,
  };

  //   Oluşturduğum ayarlara sahip maili, oluşturduğum mail sağlayıcı ile gönder
  await transport.sendMail(mailOptions);
};

export {sendMail};
