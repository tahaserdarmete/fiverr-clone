const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.log("catchAsync Hata Yakalandı.", err);

      const statusCode = err.status || err.statusCode || 500;

      return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: err.message || "Beklenmeyen bir hata oluştu.",
      });
    });
  };
};

export default catchAsync;
