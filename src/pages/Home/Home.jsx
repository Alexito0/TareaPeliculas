import React, { useEffect, useState } from "react";
import { getMoviesBy } from '../../services/films';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [films, setFilms] = useState([]);

  const fetchEstrenos = async () => {
    try {
      const response = await getMoviesBy("");

      if (!response || !response.description || !Array.isArray(response.description)) {
        throw new Error('Results not available in the expected format in the API response');
      }

      const sortedFilms = response.description.sort((a, b) => a["#RANK"] - b["#RANK"]);

      setFilms(sortedFilms);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching estrenos:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEstrenos();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section
        className="w-full mb-6 py-12 md:py-24 lg:py-32 xl:py-48"
        style={{
          backgroundImage: "url('./public/img/espacio.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="container px-4 md:px-6 relative ">
          <div className="flex flex-col items-center space-y-4 text-center relative z-10">
            <div className="space-y-2">
              <h1 className="text-3xl text-gray-500 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl relative z-10">
                <span className='text-primary-400'> Space cinema</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-black-700 md:text-xl dark:text-gray-400">
                Despega hacia las mejores películas del universo
              </p>
            </div>
            <div className="space-x-4">
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary-200 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-primary-200/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
                to="/films"
              >
                Reserva tu entrada ahora
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h1 className='font-rubiksh text-3xl text-gray-200 font-bold tracking-tighter sm:text-4xl lg:text-6xl relative z-10'>Estrenos</h1>
        <div className="h-96 mb-60 mt-6 sm:h-96 xl:h-96 2xl:h-96 relative z-10">
          {isLoading ? (
            <p>Cargando estrenos...</p>
          ) : (
            <Slider {...settings}>
              {films.map((film) => (
                <div key={film["#IMDB_ID"]} className="relative">
                  <img
                    src={film["#IMG_POSTER"]}
                    alt={film["#TITLE"]}
                    className="h-full w-full object-cover rounded-md"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black p-2 text-white">
                    <Link
                      to={`/filmDetails/${film["#IMDB_ID"]}`}
                      className="text-md font-bold"
                    >
                      {film["#TITLE"]}
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
