const globalErrorHandler = (err, req, res, next) => {
  // Gönderilecek hata bilgilerini belirle
  const errStatus = err.status || 500;
  const errMessage = err.message || "Bilinmeyen hata";

  // Terminale hata bilgilerini yazdır
  console.error("Hata detayları: \n\n", {
    message: errMessage,
    status: errStatus,
    stack: err?.stack || "Stack bilgisi yok.",
  });

  // Client ' a cevap gönder
  return res.status(errStatus).json({
    success: false,
    statusCode: errStatus,
    message: errMessage,
  });
};

export default globalErrorHandler;
