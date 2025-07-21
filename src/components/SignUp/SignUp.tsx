import React, { useEffect, useRef, useState } from "react"
import WelcomeImage from "@/assets/images/welcome-to-monday.avif"
import './SignUp.css'
import { ContinueWithGoogle } from "@/atoms/ContinueWithGoogle"
import { useNavigate } from "react-router-dom"
export const SignUp = () => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const CheckEmail = () => {
        if(!input.includes('@') || !input.includes('.com'))
            setError("Please enter a valid email address")
        else {
            setError('');
            FirstAuth();
        }
    }

    const FirstAuth = () => {
        if(input.includes('@') && input.includes('.com'))
            navigate('../users/signupsteps', { state: { stage: 0, email: input } })
    }

    return(
        <div className="signup-container">
            <div className="remain-width">
            <div className="signup-text-container">
                <span className="signup-title">Welcome to monday.com</span>
                <span className="signup-subtitle">Get started - it's free. No credit card needed</span>
                <ContinueWithGoogle style={{marginTop:'7vh', width:'100%',alignSelf:'center'}}   navigation={() => navigate('../users/signupsteps', { state: { stage: 1 } })}/>
                <div className="divider" style={{width:'30vw'}}>
                    <hr className="line" />
                    <span className="text">Or</span>
                    <hr className="line" />
                    </div>
                    <input placeholder="name@company.com" onFocus={() => setError('')} onBlur={() => CheckEmail()}
                    ref={inputRef} value={input} style={{border: error != '' ? '1px solid red' : '1px solid gainsboro'}}
                     onChange={(e) => setInput(e.target.value)} className="signup-input"
                     onKeyDown={(e) => {if (e.key === 'Enter') FirstAuth();}}/>
                    <span className="signup-error">{error}</span>
                    <button className="signup-continue" onClick={() => {CheckEmail()}}>Continue</button>
                    <span className="terms-and-privacy-note">By proceeding, you agree to the <a href="terms-of-service">Terms of Service</a> and <a href="privacy-policy">Privacy Policy</a></span>
                    <span className="signup-login-direction">Already have an account? <a href="login">Log in</a></span>
            </div>
            </div>
            <img src={WelcomeImage} className="welcome-image"/>
        </div>
    )
}
