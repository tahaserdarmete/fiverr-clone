import React, {useEffect} from "react";
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

  const apiParams = {
    search,
    category,
  };

  const {isLoading, error, data, refetch} = useGetAllGigs(apiParams);

  return (
    <div>
      <div className="mb-4">
        <Title search={search} category={category} />
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
