import React, {useState} from "react";
import Input from "../../component/input";
import Button from "../../component/customButton";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const Forgot = () => {
  // Bağlantı gönderilip gönderilmediğini tutan state
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    // Sayfa yenilemesini engelle
    e.preventDefault();

    const email = e.target[0].value;

    try {
      const response = await fetch(
        "http://localhost:4044/api/auth/forgot-password",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.info("Şifre sıfırlama linki e-postanıza gönderildi.");
        setSent(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="pt-24 max-w-[700px] mx-auto sm:max-w-[400px] max-sm:w-full">
      {!sent ? (
        <>
          <h1 className="text-xl md:text-2xl font-bold text-gray-500">
            Şifrenizi Sıfırlayın
          </h1>

          <form onSubmit={handleSubmit} className="mt-10">
            <Input label="Email adresiniz" type="email" name="email" />

            <Button text="Sıfırlama bağlantısını gönder" />
          </form>

          <p className="mt-5 text-gray-500">
            Hesabınız yok mu?{" "}
            <Link className="ms-4 text-blue-500" to="/register">
              Kaydol
            </Link>
          </p>
        </>
      ) : (
        <div className="my-4">
          <h2 className="text-center font-bold text-2xl mb-8">
            Bağlantı gönderildi
          </h2>
          <p className="text-md">
            E-posta adresine şifre sıfırlama bağlantısı gönderildi. Süresi 15
            dakikadır.
          </p>
        </div>
      )}
    </div>
  );
};

export default Forgot;
