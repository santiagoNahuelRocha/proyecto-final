import axios from "axios";
import React, { useEffect, useReducer } from "react";

const Home = () => {
  return (
    <>
    <div
        id="carouselExampleControls"
        className="carousel slide h-full"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner h-full">
          <div className="carousel-item active h-full">
            <img
              src="https://imagenes.compragamer.com/bannerPrincipal/DC_20221104105427_pTu1uEmz.jpg"
              alt="..."
              className="h-full"
            />
          </div>
          <div className="carousel-item h-full">
            <img
              src="https://imagenes.compragamer.com/bannerPrincipal/DC_20221222142710_QhpIKJ3S.jpg"
              alt="..."
              className="h-full"
            />
          </div>

          <div className="carousel-item h-full">
            <img
              src="https://imagenes.compragamer.com/bannerPrincipal/DC_20221104134733_3AWpvspP.jpg"
              alt="..."
              className="h-full"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
      
  );
};

export default Home;
