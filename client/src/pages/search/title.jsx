import React from "react";

const Title = ({category, search}) => {
  return (
    <h1>
      {
        // Eğer kelimeye göre arandıysa
        search ? (
          <p>
            <span className="font-bold">{search}</span> için arama sonuçları
          </p>
        ) : category ? (
          <p>
            <span className="font-bold">{category}</span> kategorisi için arama
            sonuçları
          </p>
        ) : (
          <p>Bütün sonuçlar</p>
        )
      }
    </h1>
  );
};

export default Title;
