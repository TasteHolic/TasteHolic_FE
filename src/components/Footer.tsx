import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p className="footer-text">Driven by taste, not alcohol.</p>
      <img
        src="/image/logoFooter.svg"
        alt="Tasteholic Logo"
        className="footer-logo"
      />
      <p className="footer-brand">Tasteholic</p>
      <p className="footer-rights">
        © 2025 UMC 7기 TasteHolic. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
