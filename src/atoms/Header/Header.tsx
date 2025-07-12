import React from 'react'
import logo from '@/assets/images/logo.png'
import switchericon from '@/assets/images/switcher-icon.png';
import arrowicon from "@/assets/images/arrowicon.svg";
import './Header.css'
import { useNavigate } from 'react-router-dom';
import { useScreenHeight, useScrollTop, } from '@/context/ScreenSizesProvider';
export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header-container" style={{boxShadow: useScrollTop() > 0 ?  '10px 2px 5px rgba(0, 0, 0, 0.2)' : '10px 2px 5px rgba(0, 0, 0, 0)'}}>
      <div className="header-left-side">
      <img src={logo} className="header-logo"/>
      <span>Products</span>
      <span>Solutions</span>
      <span>Resources</span>
      <span>Enterprise</span>
      </div>
      <div className="header-right-side">
        <span>Pricing</span>
        <span onClick={() => navigate('users/sign_up_new')}>Log in</span>
        <button className="white-button">Contact Sales</button>
        <button className="purple-button" onClick={() => {navigate('/signin')}}>Get Started
          <img src={arrowicon} className="header-arrow-icon"/>
        </button>
        <img src={switchericon} className="header-switcher"/>
      </div>
    </div>
  )
}
