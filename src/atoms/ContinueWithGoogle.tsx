import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

interface ContinueWithGoogleProps {
  style?: React.CSSProperties;
}

export const ContinueWithGoogle = ({style}: ContinueWithGoogleProps) => {
      const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
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