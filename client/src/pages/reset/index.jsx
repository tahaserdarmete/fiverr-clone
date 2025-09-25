import React from "react";
import Input from "../../component/input";
import Button from "../../component/customButton";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

const ResetPassword = () => {
  const {token} = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Sayfa yenilemesini engelle
    e.preventDefault();

    const password = e.target[0].value;
    const passwordConfirm = e.target[1].value;

    try {
      const response = await fetch(
        `http://localhost:4044/api/auth/reset-password/${token}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            newPass: password,
            newPassConfirm: passwordConfirm,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Şifreniz başarıyla değiştirildi.");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="pt-23 max-w-[700px] mx-auto sm:max-w-[400px] max-sm:w-full">
      <h1 className="text-xl md:text-2xl font-bold text-gray-500">
        Yeni Şifrenizi Giriniz
      </h1>

      <form onSubmit={handleSubmit} className="mt-10">
        <Input label="Yeni Şifre" type="password" name="password" />
        <Input
          label="Yeni Şifre Onay"
          type="password"
          name="password-confirm"
        />

        <Button text="Şifreyi Kaydet" />
      </form>
    </div>
  );
};

export default ResetPassword;
