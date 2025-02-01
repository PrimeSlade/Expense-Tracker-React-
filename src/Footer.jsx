import React, { useRef } from "react";
import "./Footer.css";

const Footer = ({ footerRef }) => {
  return (
    <>
      <div className="footer" ref={footerRef}>
        <a href="https://github.com/PrimeSlade">
          <img
            className="img"
            src="https://w7.pngwing.com/pngs/1003/487/png-transparent-github-pages-random-icons-white-logo-monochrome.png"
            alt=""
          />
        </a>
      </div>
    </>
  );
};

export default Footer;
