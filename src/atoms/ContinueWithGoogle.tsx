import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useEmail } from '@/context/GoogleProvider';

interface ContinueWithGoogleProps {
  style?: React.CSSProperties;
  navigation: () => void;
}

export const ContinueWithGoogle: React.FC<ContinueWithGoogleProps> = ({ style, navigation }) => {
  const { setEmail } = useEmail();
  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      setEmail(decoded.email); // <-- Correct way to set email
      navigation();
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
  );
};