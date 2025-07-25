import { Header } from '@/atoms/Header/Header'
import mondayworkplatform from '@/assets/images/mondayworkplatform.png'
import arrowicon from "@/assets/images/arrowicon.svg";
import { HeaderMobile } from '../../atoms/Header/HeaderMobile';
import { useScreenWidth } from '@/context/ScreenSizesProvider';
import { HomeMobile } from './HomeMobile';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useEmail } from '@/context/GoogleProvider';
export default function Home() {
  const navigate = useNavigate();
  let isMobile = useScreenWidth() < 1300 ? true : false  
  const {setEmail } = useEmail();
  
  useEffect(() => {
    setEmail('');
  }, [])
    return (
    <div>
        { !isMobile? <Header /> : <HeaderMobile/>}
       {!isMobile ? <div className="home-container" >
        <img src={mondayworkplatform} className='monday-platform'/>
        <span className="review-title">Made for work, <br/> designed to love</span>
        <p className='review-text'>Streamline workflows, gain clear visibility across teams, and empower<br/> smarter decisions with AI seamlessly woven into your work.</p>
                <button className="purple-button" onClick={() => {navigate('users/sign_up_new')}}>Get Started
          <img src={arrowicon} className="header-arrow-icon"/>
        </button>
        <p className="review-smalltext">No credit card needed  ✦  Unlimited time on Free plan</p>
        
        </div> : <HomeMobile/>}
    </div>
  )
}
