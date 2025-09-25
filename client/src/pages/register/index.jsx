import React, {useContext, useState} from "react";
import Input from "../../component/input";
import Switch from "../../component/switch";
import Button from "../../component/customButton";
import {AuthContext} from "../../context/authContext";

const Register = () => {
  // Satıcı Hesabı için State
  const [isSeller, setIsSeller] = useState(false);

  const {register} = useContext(AuthContext);

  // Form gönderildiğinde çalışacak fonksiyon
  const HandleSubmit = (e) => {
    e.preventDefault();

    // Form data örneği oluştur
    const formData = new FormData(e.target);

    // formData nesnesi içerisinden inputlara eriş
    const newUser = formData;

    // isSeller değerini newUser içerisine iliştir
    newUser.isSeller = isSeller;

    console.log(newUser);

    // Backend' e kayıt edilecek kullanıcıyı gönder
    register(newUser);
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <form
        onSubmit={HandleSubmit}
        className="grid md:grid-cols-2 md:gap-10 md:pt-24"
      >
        {/* Left Area */}
        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            Yeni Hesap Oluştur
          </h1>

          <Input label="İsim" type="text" name="username" />
          <Input label="Email" type="email" name="email" />
          <Input label="Ülke" type="text" name="country" />
          <Input label="Şifre" type="password" name="password" />
          <Input label="Şifre Tekrar" type="password" name="passwordConfirm" />
          <Input label="Fotoğraf" type="file" name="photo" />
        </div>

        {/* Right Area */}
        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            Satıcı Olmak İstiyorum
          </h1>

          <Switch setIsSeller={setIsSeller} />

          <Input
            label="Telefon"
            type="number"
            disabled={!isSeller}
            name="phone"
          />
          <Input
            label="Açıklama"
            type="text"
            disabled={!isSeller}
            name="desc"
          />

          <Button text="Kaydol" />
        </div>
      </form>
    </div>
  );
};

export default Register;
