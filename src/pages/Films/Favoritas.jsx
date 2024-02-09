import React from "react";
import { Link } from "react-router-dom";

function Favoritas() {
  const storedData = localStorage.getItem("favoriteFilms");
  const favoriteFilms = storedData ? JSON.parse(storedData) : [];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-bold mb-4">Películas Favoritas</h1>
      {favoriteFilms.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favoriteFilms.map((film, index) => (
            <div key={index} className="border border-gray-300 rounded-md shadow-md p-4">
              <h2 className="text-2xl font-semibold mb-2 text-primary-400">{film["#TITLE"]}</h2>
              <div className="flex justify-center items-center mb-4">
                <img
                  src={film["#IMG_POSTER"]}
                  alt={film["#TITLE"]}
                  className="rounded-md"
                />
              </div>
              <Link
                to={`/buyTickets/${film["#IMDB_ID"]}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md block text-center w-full text-xl"
              >
                Comprar Entrada
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No hay películas favoritas</p>
      )}
    </div>
  );
}

export default Favoritas;
