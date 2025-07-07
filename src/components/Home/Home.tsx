import { Header } from '@/atoms/Header/Header'
import mondayworkplatform from '@/assets/images/mondayworkplatform.png'
import arrowicon from "@/assets/images/arrowicon.svg";
import { useEffect, useState } from 'react';

import './Home.css'

export default function Home() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
              const handleResize = () => setScreenWidth(window.innerWidth);
              window.addEventListener('resize', handleResize);
              return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
    <div>
        {screenWidth > 1300 && <Header />}
      <div className="home-container">
        <img src={mondayworkplatform} className='monday-platform'/>
        <span className="review-title">Made for work, <br/> designed to love</span>
        <p className='review-text'>Streamline workflows, gain clear visibility across teams, and empower<br/> smarter decisions with AI seamlessly woven into your work.</p>
                <button className="purple-button" onClick={() => {alert('hi')}}>Get Started
          <img src={arrowicon} className="header-arrow-icon"/>
        </button>
        <p className="review-smalltext">No credit card needed  ✦  Unlimited time on Free plan</p>
        </div>
    </div>
  )
}
