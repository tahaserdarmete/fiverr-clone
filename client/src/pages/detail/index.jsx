import React from "react";
import {useParams} from "react-router-dom";
import {useGetOneGig} from "../../services/gig";
import GigInfo from "./giginfo";
import {notFound} from "../../utils/constants";
import Breadcrumb from "./breadcrumb";
import UserInfo from "./userinfo";

const Detail = () => {
  // Önce URL'deki ID'yi almamız gerekir
  // Ürünün sayfasında girdiğimzide ürünün detaylarını renderlamak için
  const {id} = useParams();

  // API isteği at
  const {isLoading, data, error, refetch} = useGetOneGig(id);

  console.log("Şuan incelenen gig:", data);

  if (isLoading) return <div>Yükleniyor</div>;

  if (error) return <div>Bir Hata Oluştu</div>;

  if (!data) return <div>İçerik yok veya kaldırıldı</div>;

  return (
    <div className="md:px-10 xl:px-15">
      <div className="mx-[5vw]">
        <div className="">
          <Breadcrumb category={data.category} />
          <GigInfo gig={data} />

          <UserInfo user={data.user} />
        </div>
      </div>
      {/* Paket bilgisi */}
    </div>
  );
};

export default Detail;
