import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useEmail } from '@/context/GoogleProvider';
import { SignIn } from '@/services/AuthService';

interface ContinueWithGoogleProps {
  style?: React.CSSProperties;
  navigation: () => void;
}

export const ContinueWithGoogle: React.FC<ContinueWithGoogleProps> = ({ style, navigation }) => {
  const { setEmail } = useEmail();
  const navigate = useNavigate();
  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      setEmail(decoded.email);
      const isExists = await SignIn(decoded.email);
      if(isExists.success)
        return navigate('/dashboard/test')
      else navigation();
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