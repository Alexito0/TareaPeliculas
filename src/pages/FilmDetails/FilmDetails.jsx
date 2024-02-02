import React, { useEffect, useState } from "react";
import { getMoviesBy } from '../../services/films';
import { Link, useParams } from "react-router-dom";

function FilmDetails() {
    const [filmDetails, setFilmDetails] = useState(null);
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [additionalDetails1, setAdditionalDetails1] = useState(null);
    const [additionalDetails2, setAdditionalDetails2] = useState(null);
    const [additionalDetails3, setAdditionalDetails3] = useState(null);
    const [additionalDetails4, setAdditionalDetails4] = useState(null);
    const [additionalDetails5, setAdditionalDetails5] = useState(null);
    useEffect(() => {
        const fetchFilmDetails = async () => {
            try {
                const response = await getMoviesBy(id);
                if (!response || !response.description || !Array.isArray(response.description)) {
                    throw new Error('Results not available in the expected format in the API response');
                }

                setFilmDetails(response.description[0]);
                fetchAdditionalDetails(id);
            } catch (error) {
                console.error('Error fetching film details:', error);
            }
        };

        fetchFilmDetails();
    }, [id]);

    const fetchAdditionalDetails = async (id) => {
        try {
            const additionalDetailsResponse = await fetch(`https://search.imdbot.workers.dev/?tt=${id}`);
            const additionalDetailsData = await additionalDetailsResponse.json();
            console.log(additionalDetailsData);

            setAdditionalDetails1(additionalDetailsData.short.duration);
            setAdditionalDetails2(additionalDetailsData.short.datePublished);
            setAdditionalDetails3(additionalDetailsData.short.description);
            setAdditionalDetails4(additionalDetailsData.short.genre);
            setAdditionalDetails5(additionalDetailsData.short.url);
        } catch (error) {
            console.error('Error fetching additional details:', error);
        }
    };

    const handleAddToFavorites = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="text-center flex justify-center items-center">
            {filmDetails ? (
                <>
                    <div className="pr-4">
                        <h1 className="text-3xl font-bold">{filmDetails["#TITLE"]}</h1>
                        <img
                            src={filmDetails["#IMG_POSTER"]}
                            alt={filmDetails["#TITLE"]}
                            className="mx-auto my-4 img-fluid"
                            style={{ maxWidth: "33%", height: "auto" }}
                        />
                        <p><b className="text-primary-200">Año:</b> {filmDetails["#YEAR"]}</p>
                        <p><b className="text-primary-200">Actores:</b> {filmDetails["#ACTORS"]}</p>
                        <p><b className="text-primary-200">Género:</b> {additionalDetails4 || "N/A"}</p>
                        <p><b className="textprimary-200">Duración:</b> {additionalDetails1 || "N/A"}</p>
                        <p><b className="text-primary-200">Fecha de Publicación:</b> {additionalDetails2 || "N/A"}</p>
                        <p><b className="text-primary-200">Descripción:</b> {additionalDetails3 || "N/A"}</p>

                        <button
                            onClick={handleAddToFavorites}
                            className="bg-primary-200 text-white px-4 py-2 rounded-md mt-4"
                        >
                            Añadir a Favoritos ❤️
                        </button>
                        <br/>
                        <Link
                            to={`/buyTickets/${filmDetails["#IMDB_ID"]}`}
                            className="inline-block mt-4 text-primary-200 underline"
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
                            src={additionalDetails5}
                            frameBorder="0"
                            allowFullScreen
                            className="mb-4"
                        ></iframe>
                    </div>
                </>
            ) : (
                <p>Cargando detalles de la película...</p>
            )}
        </div>
    );
}

export default FilmDetails;
