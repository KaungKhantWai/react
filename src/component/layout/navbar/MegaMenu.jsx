import React from 'react';
import "./MegaMenu.css";

function MegaMenu({ isOpen, label }) {
  return (
    <div
      className={`mega ${isOpen ? 'is-active' : ''}`}
      role="menu"
      aria-label={label ? `${label} menu` : 'Menu'}
    >
      <div className="mega__panel">
        <div className="mega__col">
          <p className="mega__title">Featured</p>
          <a className="mega__link" href="#service-1">Digital Transformation</a>
          <a className="mega__link" href="#service-2">e-Government Systems</a>
          <a className="mega__link" href="#service-3">Cybersecurity & SOC</a>
        </div>
        <div className="mega__col">
          <p className="mega__title">Citizen Services</p>
          <a className="mega__link" href="#service-4">Online Licensing</a>
          <a className="mega__link" href="#service-5">Case Tracking</a>
          <a className="mega__link" href="#service-6">Public Records</a>
        </div>
        <div className="mega__col">
          <p className="mega__title">Enterprise</p>
          <a className="mega__link" href="#service-7">Consulting & Audit</a>
          <a className="mega__link" href="#service-8">Cloud Migration</a>
          <a className="mega__link" href="#service-9">Managed Services</a>
        </div>
        <div className="mega__promo">
          <p className="mega__eyebrow">Spotlight</p>
          <h4 className="mega__headline">Unified Service Portal</h4>
          <p className="mega__copy">A single hub for citizen access, with secure login and multilingual support.</p>
          <a className="mega__cta" href="#service-spotlight">Explore the portal</a>
        </div>
      </div>
    </div>
  );
}

export default MegaMenu;
