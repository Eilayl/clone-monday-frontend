import React, { useState } from 'react';
import './HeaderMobile.css';
import '../Header/Header.css';
import { VscMenu, VscClose } from "react-icons/vsc";
import logo from "@/assets/images/logo.png";

export const HeaderMobile = () => {
  const [isOpen, setIsOpened] = useState(false);

  return (
    <div>

    <div className="header-container">
      <img src={logo} alt="Logo" className='header-logo' />
      <div 
        className="icon-container" 
        onClick={() => setIsOpened(!isOpen)}
        style={{ cursor: 'pointer' }}
        >
        <VscMenu 
          size={24} 
          className={`icon menu-icon ${isOpen ? 'icon-hidden' : 'icon-visible'}`} 
          />
        <VscClose 
          size={24} 
          className={`icon close-icon ${isOpen ? 'icon-visible' : 'icon-hidden'}`} 
          />
      </div>
    </div>
        <div className={`header-open ${isOpen ? "visible" : ""}`}>
          <div className="items">
          <span>Products</span>
          <span>Teams</span>
          <span>Features</span>
          <span>Resources</span>
          <span>Discover AI</span>
          <span>Pricing</span>
          <span>Contact Sales</span>
          </div>
          <span className="return-to-homepage" onClick={() => setIsOpened(!isOpen)}>Go back to Homepage</span>
        </div>
    </div>
  );
};
