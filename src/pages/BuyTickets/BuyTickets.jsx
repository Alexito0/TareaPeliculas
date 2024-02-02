import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function BuyTickets() {
  const { imdbId } = useParams();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePurchase = () => {
    setIsModalVisible(true);
  };

  const handleConfirmModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-1">Compra de Entradas</h1>
      <p >Selecciona la cantidad de entradas y el método de pago: </p>
      <p >Precio: 7€/entrada</p>
      <div className="my-4">
        <label htmlFor="ticketQuantity">Cantidad de Entradas: </label>
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
        <label htmlFor="paymentMethod">Método de Pago: </label>
        <select
          className="text-black"
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="creditCard" className="text-black">Tarjeta de Crédito</option>
          <option value="paypal" className="text-black">PayPal</option>
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
            <p className="mb-4">¿Confirmar compra de {ticketQuantity} entradas por {ticketQuantity*7}€?</p>
            <button
              onClick={handleConfirmModal}
              className="bg-primary-200 text-white px-4 py-2 rounded-md mr-2"
            >
                <Link
                  to={`/`}
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
