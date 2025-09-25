import React, {useContext} from "react";
import {AuthContext} from "../../context/authContext";
import {Navigate, Outlet} from "react-router-dom";

const Protected = () => {
  const {user} = useContext(AuthContext);

  // Eğer kullanıcı Seller ise Outlet'i göster

  // Eğer kullanıcı değilse sayfaya girdirme anasayfaya yönlendir

  //   return user.isSeller ? <Outlet /> : <Navigate to="/login" replace />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.isSeller === "false") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Protected;
