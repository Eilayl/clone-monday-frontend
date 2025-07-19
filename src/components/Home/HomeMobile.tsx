import './Home.css'
import { ContinueWithGoogle } from '@/atoms/ContinueWithGoogle';
import { useNavigate } from 'react-router-dom';
import arrowicon from "@/assets/images/arrowicon.svg";
import { useState } from 'react';

export const HomeMobile = () => {
    const navigate = useNavigate();
    const[input, setInput] = useState('');
    const[error, setError] = useState('');
const CheckEmail = () => {
    const emailRegex = /^[^@]+@[^@]+\.com$/;
    if (!emailRegex.test(input) || input.length < 6)
        setError("Please enter a valid email address");
    else {
        setError('');
        FirstAuth();
    }
}

    const FirstAuth = () => {
        if(input.includes('@') && input.includes('.com') && input.length > 6)
            navigate('../users/signupsteps')
    }
  return (
        <div className="home-mobile-container">
            <span className="review-title-mobile">Your go-to<br/> work platform</span>
            <ContinueWithGoogle style={{width:'80%', alignSelf:'center', marginTop:'5vh'}} navigation={'/users/signupsteps'}/>
            <div className="divider" style={{width:'80%'}}>
                    <hr className="line" />
                    <span className="text">Or</span>
                    <hr className="line" />
                    </div>
            <input value={input} onChange={(e) => setInput(e.target.value)}className="email-input" placeholder="Enter your work email"/>
            <span className="home-mobile-error">{error}</span>
            <button className="purple-button" onClick={() => {CheckEmail()}}>Get Started
          <img src={arrowicon} className="header-arrow-icon"/>  
        </button>
        <span className="terms-and-privacy-note">By proceeding, you agree to the <a href="terms-of-service">Terms of Service</a> and <a href="privacy-policy">Privacy Policy</a></span>
        </div>
    )
}