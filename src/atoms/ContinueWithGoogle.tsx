import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

interface ContinueWithGoogleProps {
  style?: React.CSSProperties;
  navigation: String;
}

export const ContinueWithGoogle = ({style, navigation}: ContinueWithGoogleProps) => {
  const navigate = useNavigate();
      const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      navigate(String(navigation))
      console.log("Decoded user:", decoded);
    } else {
      console.error("No credential found.");
    }
  };
  return (
    <div style={style}>
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
            />
    </div>
  )
}