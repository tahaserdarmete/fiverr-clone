import React from "react";
import Input from "../../component/input";
import Button from "../../component/customButton";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import {useContext} from "react";

const Login = () => {
  // Context'e abone ol
  const {login} = useContext(AuthContext);

  const handleSubmit = (e) => {
    // Sayfa yenilemesini engelle
    e.preventDefault();

    // FormData ile form içerisindeki elemanlara eriş
    const formData = new FormData(e.target);

    // formData içerisindeki değerlere bir obje şeklinde eriş
    const user = Object.fromEntries(formData.entries());

    // Kullanıcının giriş işlemi için API'a istek at
    login(user);
  };
  return (
    <div className="pt-24 max-w-[700px] mx-auto sm:max-w-[400px] max-sm:w-full">
      <h1 className="text-xl md:text-2xl font-bold text-gray-500">
        Hesabınıza Giriş Yapın
      </h1>

      <form onSubmit={handleSubmit} className="mt-10">
        <Input label="İsim" type="text" name="username" />
        <Input label="Şifre" type="password" name="password" />

        <Button text="Giriş Yap" />
      </form>

      <p className="mt-5 text-gray-500">
        Hesabınız yok mu?{" "}
        <Link className="ms-4 text-blue-500" to="/register">
          Kaydol
        </Link>
      </p>

      <p className="mt-5 text-gray-500">
        Şifrenizi mi unuttunuz?{" "}
        <Link className="ms-4 text-blue-500" to="/forgot-password">
          Şifremi Sıfırla
        </Link>
      </p>
    </div>
  );
};

export default Login;
