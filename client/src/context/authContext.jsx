import {createContext, useState} from "react";
import api from "../api/index.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  //  Kullanıcı için state oluştur
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Navigate Kurulumu
  const navigate = useNavigate();

  //  Register
  const register = (user) => {
    api
      .post("/auth/register", user)
      .then((res) => {
        // Kullanıcıya bildirim gönder
        toast.success("Kayıt işlemi başarılı");

        // Giriş yapma sayfasına yönlendir
        navigate("/login");
      })
      .catch((err) => {
        alert(err);
      });
  };
  //   Login
  const login = (user) => {
    api
      .post("/auth/login", user)
      .then((res) => {
        // Kullanıcı verisini state'de tut
        setUser(res.data.user);

        setToken(res.data.token);

        // Kullanıcı verilerini locale kayıt et
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        // Kullanıcıya bildirim gönder
        toast.success("Giriş işlemi başarılı");

        // Ana sayfaya yönlendir
        navigate("/");
      })
      .catch((err) => {
        toast.error(`Giriş işlemi sırasında bir hata oluştu: ${err}`);
      });
  };

  return (
    <AuthContext.Provider value={{register, login, user, setUser, token}}>
      {children}
    </AuthContext.Provider>
  );
};
