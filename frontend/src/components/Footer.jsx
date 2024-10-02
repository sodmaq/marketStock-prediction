import React from "react";
import { CiBank } from "react-icons/ci";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-blue-500 bottom-0 fixed w-full">
      <div className="marquee-container">
        <p className="marquee flex items-center p-2">
          <CiBank size={30} className="mx-2 text-2xl" />
          Made by
          <b className="ml-1 font-sans font-extrabold text-2xl text-white">
            {" "}
            GANIYU rofiat olatundun, Olatunbosun barakat Dasola, Ayodeji
            oluwapelumi oluwadamilola and Oladejo Toheeb Ayobami
          </b>
          😎
        </p>
      </div>
    </footer>
  );
};

export default Footer;
