import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import './Home.css'
import { ContinueWithGoogle } from '@/atoms/ContinueWithGoogle';
export const HomeMobile = () => {

  return (
        <div className="home-mobile-container">
            <span className="review-title-mobile">Your go-to<br/> work platform</span>
            <span className="review-small-text">or</span>
            <input className="email-input" placeholder="Enter your work email"/>
            <ContinueWithGoogle style={{width:'80%', alignSelf:'center', marginTop:'5vh'}} navigation={''}/>
        </div>
    )
}