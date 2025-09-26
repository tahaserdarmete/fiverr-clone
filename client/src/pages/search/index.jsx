import React, {useEffect, useState} from "react";
import {useGetAllGigs} from "../../services/gig";
import {Link, useSearchParams} from "react-router-dom";
import Card from "../../component/card";
import Title from "./title";
import Loader from "../../component/loader";
import Error from "../../component/error";
import NotFound from "../../component/notfound";

const Search = () => {
  // Url'deki query ve category değerlerini almak için useSearchParams kullanıcaz
  const [params] = useSearchParams();

  const search = params.get("query");

  const category = params.get("category");

  const [sortBy, setSortBy] = useState("packagePrice");

  const [order, setOrder] = useState("desc");

  const apiParams = {
    search,
    category,
    sortBy,
    order,
  };

  const {isLoading, error, data, refetch} = useGetAllGigs(apiParams);

  return (
    <div>
      <div className="mb-4 flex justify-between flex-col sm:flex-row gap-4 items-center">
        <Title search={search} category={category} />

        <div className="flex gap-3">
          <div className="inline-flex flex-col">
            <label htmlFor="" className="text-gray-400">
              Sıralama
            </label>
            <select
              name="sortBy"
              id="sortBy"
              defaultValue="default"
              className="border-2 border-neutral-300 rounded-md p-1"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default" disabled>
                Sıralama seçiniz.
              </option>
              <option value="packagePrice">Fiyat</option>
              <option value="title">İsim</option>
              <option value="createdAt">Tarih</option>
              <option value="reviewCount">İnceleme Sayısı</option>
              <option value="packageDuration">Süre</option>
            </select>
          </div>

          <div className="inline-flex flex-col">
            <label htmlFor="" className="text-gray-400">
              Gelişmiş Sıralama
            </label>
            <select
              name="sortBy"
              id="sortBy"
              defaultValue="default"
              className="border-2 border-neutral-300 rounded-md p-1"
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="default" disabled>
                seçiniz...
              </option>
              <option value="asc">Düşükten Yükseğe (A-Z)</option>
              <option value="desc">Yüksekten Düşüğe (Z-A)</option>
            </select>
          </div>
        </div>
      </div>

      {
        // Eğer Yükleniyorsa
        isLoading ? (
          <div className="flex justify-center mt-10">
            <Loader />
          </div>
        ) : // Eğer bir hata alırsak veya veri yoksa
        error ? (
          <Error error={error} refetch={refetch} />
        ) : (
          // Eğer veri gelirse
          <div className="grid [@media(min-width:480px)]:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.map((item, key) => (
              <Card item={item} key={key} />
            ))}
          </div>
        )
      }
    </div>
  );
};

export default Search;
