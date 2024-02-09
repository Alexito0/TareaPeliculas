import React, { useEffect, useState } from "react";
import { getMoviesBy } from '../../services/films';
import FilmPoster from '../../components/FilmPoster';
import { useDispatch, useSelector } from 'react-redux';
import { getFilms } from "../../slices/filmsThunks";

function Films() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();
  const {films} = useSelector( state => state.films)

  useEffect(() => {
    dispatch(getFilms(searchTerm));
  }, [searchTerm]);

  useEffect(() => {
    setSearchResults(films);
  }, [films, searchTerm]);

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  return (
    <section className="py-8">
      <div className="mb-6">
        <h1 className="font-rubiksh text-gray-200 font-extrabold text-4xl mb-3">Cartelera</h1>
        <div className="flex items-center space-x-4 text-black">
          <input
            type="text"
            placeholder="Buscar películas..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary-200"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {(searchTerm === "" ? films : searchResults).map((film) => 
          <FilmPoster key={film["#IMDB_ID"]} film={film} />
        )}  
      </div>
    </section>
  );
}

export default Films;
