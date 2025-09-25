import React from "react";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext";
import {IoLogInOutline} from "react-icons/io5";
import api from "../../api";

const User = () => {
  const {user, setUser} = useContext(AuthContext);

  const handleLogout = () => {
    api
      .post("/auth/logout")
      .then((res) => {
        // Önce geçici hafızada tutulan kullanıcıyı sildik
        setUser(null);
        // Sonra kalıcı hafızada tutulan kullanıcıyı sildik
        localStorage.removeItem("user");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <img
        src={user?.photo}
        className="w-8 h-8 rounded-full border border-neutral-400"
      />
      <button
        onClick={handleLogout}
        className="cursor-pointer inline-flex items-center bg-red-500 p-1 rounded-md text-white"
      >
        <IoLogInOutline className="text-2xl  " />
        Çıkış
      </button>
    </div>
  );
};

export default User;
