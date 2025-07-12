import React from "react"
import WelcomeImage from "@/assets/images/welcome-to-monday.avif"
import './SignUp.css'
import { ContinueWithGoogle } from "@/atoms/ContinueWithGoogle"
export const SignUp = () => {
    return(
        <div className="signup-container">
            <div className="signup-text-container">
                <span className="signup-title">Welcome to monday.com</span>
                <span className="signup-subtitle">Get started - it's free. No credit card needed</span>
                <ContinueWithGoogle style={{marginTop:'7vh', width:'45%', alignSelf:'center'}}/>
                <div className="divider" style={{width:'30vw'}}>
                    <hr className="line" />
                    <span className="text">Or</span>
                    <hr className="line" />
                    </div>
                    <input placeholder="name@company.com" className="signup-input"/>
            </div>
            <img src={WelcomeImage} className="welcome-image"/>
        </div>
    )
}
