import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getFilms } from "../../slices/filmsThunks";

function BuyTickets() {
  const { id } = useParams();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [filmDetails, setFilmDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [horario, setHorario] = useState("1");

  const dispatch = useDispatch();
  const { films } = useSelector(state => state.films);

  useEffect(() => {
    dispatch(getFilms(id));
    const film = films.find(film => film["#IMDB_ID"] === id);
    setFilmDetails(film);
  }, [id, films, dispatch]);

  const handlePurchase = () => {
    const existingData = localStorage.getItem("purchaseData");
    let purchases = existingData ? JSON.parse(existingData) : [];
  
    const purchaseData = {
      filmDetails,
      ticketQuantity,
      paymentMethod,
      horario
    };
  
    purchases = [...purchases, purchaseData];
  
    localStorage.setItem("purchaseData", JSON.stringify(purchases));
    setIsModalVisible(true);
  };
  

  const handleConfirmModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="text-center">
      {filmDetails && (
        <>
          <h1 className="text-3xl font-bold">{filmDetails["#TITLE"]}</h1>
          <img
            src={filmDetails["#IMG_POSTER"]}
            alt={filmDetails["#TITLE"]}
            className="mx-auto my-4 img-fluid"
            style={{ maxWidth: "33%", height: "auto" }}
          />
        </>
      )}

      <h1 className="text-3xl font-bold mb-1">Compra de Entradas</h1>
      <p>Selecciona la cantidad de entradas y el método de pago:</p>
      <p>Precio: 7€/entrada</p>
      <div className="my-4">
        <label htmlFor="ticketQuantity">Cantidad de Entradas:</label>
        <input
          className="text-black"
          type="number"
          id="ticketQuantity"
          value={ticketQuantity}
          onChange={(e) => setTicketQuantity(Number(e.target.value))}
          min={1}
        />
      </div>
      <div className="my-4">
        <label htmlFor="paymentMethod">Método de Pago:</label>
        <select
          className="text-black"
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="creditCard">Tarjeta de Crédito</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>
      <div className="my-4">
        <label htmlFor="horario">Horario: </label>
        <select
          className="text-black"
          id="horario"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
        >
          <option value="1">12:00</option>
          <option value="2">13:00</option>
          <option value="3">17:00</option>
          <option value="4">18:00</option>
        </select>
      </div>
      <button
        onClick={handlePurchase}
        className="bg-primary-200 text-white px-4 py-2 rounded-md mt-4"
      >
        Comprar Entradas
      </button>

      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black p-4 rounded-md text-center">
            <p className="mb-4">¿Confirmar compra de {ticketQuantity} entradas por {ticketQuantity * 7}€ para las {horario}?</p>
            <button
              onClick={handleConfirmModal}
              className="bg-primary-200 text-white px-4 py-2 rounded-md mr-2"
            >
              <Link
                to={{
                  pathname: `/`
                }}
                className="inline-block"
              >
                Confirmar
              </Link>
            </button>
            <button
              onClick={handleConfirmModal}
              className="bg-primary-200 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyTickets;
