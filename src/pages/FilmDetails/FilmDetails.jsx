import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getFilms, getFilms2 } from "../../slices/filmsThunks";
import { Link, useParams } from "react-router-dom";

function Films() {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const { films } = useSelector(state => state.films);
    const { films2 } = useSelector(state => state.films);

    useEffect(() => {
        dispatch(getFilms(id));
        dispatch(getFilms2(id));
    }, [id]);

    const handleAddToFavorites = (film) => {
        const favorites = localStorage.getItem("favoriteFilms");
        const favoriteFilms = favorites ? JSON.parse(favorites) : [];
        const isDuplicate = favoriteFilms.some(favorite => favorite["#IMDB_ID"] === film["#IMDB_ID"]);
        if (!isDuplicate) {
            const updatedFavorites = [...favoriteFilms, film];
            localStorage.setItem("favoriteFilms", JSON.stringify(updatedFavorites));
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="text-center flex justify-center items-center">
            {films.map((film) => (
                <>
                    <div className="pr-4" key={film["#IMDB_ID"]}>
                        <h1 className="text-3xl font-bold">{film["#TITLE"]}</h1>
                        <img
                            src={film["#IMG_POSTER"]}
                            alt={film["#TITLE"]}
                            className="mx-auto my-4 img-fluid"
                            style={{ maxWidth: "33%", height: "auto" }}
                        />
                        <p><b className="text-primary-200">Año:</b> {film["#YEAR"]}</p>
                        <p><b className="text-primary-200">Actores:</b> {film["#ACTORS"]}</p>
                        <p><b className="text-primary-200">Género:</b> {films2.genre}</p>
                        <p><b className="text-primary-200">Duración:</b> {films2.duration}</p>
                        <p><b className="text-primary-200">Fecha de Publicación:</b> {films2.datePublished}</p>
                        <p><b className="text-primary-200">Descripción:</b> {films2.description}</p>

                        <button
                            onClick={() => handleAddToFavorites(film)}
                            className="bg-primary-200 text-white px-4 py-2 rounded-md mt-4"
                        >
                            Añadir a Favoritos ❤️
                        </button>
                        <br/>
                        <Link
                            to={`/buyTickets/${film["#IMDB_ID"]}`}
                            className="inline-block mt-4 text-primary-300 underline"
                        >
                            Comprar Entradas
                        </Link>

                        {showModal && (
                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-black p-8 rounded-md">
                                    <p>La película ha sido añadida a favoritos</p>
                                    <p>(～￣▽￣)～</p>
                                    <button
                                        onClick={handleCloseModal}
                                        className="bg-primary-200 text-white px-4 py-2 rounded-md mt-4"
                                    >
                                        Aceptar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="ml-3">
                        <h2 className="text-2xl font-bold mb-4">Tráiler</h2>
                        <iframe
                            title="Trailer"
                            width="100%"
                            height="300px"
                            src={films2.url}
                            frameBorder="0"
                            allowFullScreen
                            className="mb-4"
                        ></iframe>
                    </div>
                </>
            ))}
        </div>
    );
}

export default Films;
