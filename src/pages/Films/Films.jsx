import React, { useEffect, useState } from "react";
import { getMoviesBy } from '../../services/films';
import FilmPoster from '../../components/FilmPoster';

function Films() {
  const [isLoading, setIsLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await getMoviesBy(searchTerm);
        if (!response || !response.description || !Array.isArray(response.description)) {
          throw new Error('Results not available in the expected format in the API response');
        }

        setFilms(response.description);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching films:', error);
        setIsLoading(false);
      }
    };

    fetchFilms();
  }, [searchTerm]);

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    try {
      const response = await getMoviesBy(term);
      if (!response || !response.description || !Array.isArray(response.description)) {
        throw new Error('Results not available in the expected format in the API response');
      }

      setSearchResults(response.description);
    } catch (error) {
      console.error('Error searching films:', error);
    }
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
        {isLoading ? (
          <p>Cargando películas...</p>
        ) : (
          (searchTerm === "" ? films : searchResults).map((film) => (
            <FilmPoster key={film["#IMDB_ID"]} film={film} />
          ))
        )}
      </div>
    </section>
  );
}

export default Films;
