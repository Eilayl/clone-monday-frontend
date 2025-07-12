import './App.css';
import logo from '@/assets/images/logo.png'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import { NotFound } from './components/NotFound/NotFound';
import { ScreenSizesProvider } from './context/ScreenSizesProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SignUp } from './components/SignUp/SignUp';

function App() {

  return(
    <ScreenSizesProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/sign_up_new" element={<SignUp/>}/> 
        <Route path="*" element={<NotFound/>}/> 
      </Routes>
    </Router>
    </ScreenSizesProvider>
  )
}

export default App;
