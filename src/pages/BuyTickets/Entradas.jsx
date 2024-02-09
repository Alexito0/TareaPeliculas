import React from "react";

function Entradas() {
  const storedData = localStorage.getItem("purchaseData");
  const purchases = storedData ? JSON.parse(storedData) : [];

  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4">Entradas Compradas</h1>
      {purchases.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {purchases.map((purchase, index) => (
            <div key={index} className="border border-gray-300 rounded-md shadow-md p-4">
              <h2><b className="text-4xl font-semibold mb-2 text-blue-500">Compra {index + 1}</b></h2>
              <p className="text-2xl"><b className="text-primary-400">Película:</b> {purchase.filmDetails && purchase.filmDetails["#TITLE"]}</p>
              <div className="flex justify-center items-center">
                <img
                  src={purchase.filmDetails["#IMG_POSTER"]}
                  alt={purchase.filmDetails["#TITLE"]}
                  className="rounded-md"
                />
              </div>
              <p className="text-2xl"><b className="text-primary-400">Cantidad de Entradas:</b> {purchase.ticketQuantity}</p>
              <p className="text-2xl"><b className="text-primary-400">Método de Pago:</b> {purchase.paymentMethod}</p>
              <p className="text-2xl"><b className="text-primary-400">Horario:</b> {purchase.horario}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay entradas compradas</p>
      )}
    </div>
  );
}

export default Entradas;
