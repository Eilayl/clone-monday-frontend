import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import { NotFound } from './components/NotFound/NotFound';
import { ScreenSizesProvider } from './context/ScreenSizesProvider';
import { SignUp } from './components/SignUp/SignUp';
import { SetUpAccount } from './components/SignUp/SetUpAccount';
import { GoogleProvider } from './context/GoogleProvider';
import { Dashboard } from './components/Dashboard/Dashboard';
function App() {

  return(
    <ScreenSizesProvider>
      <GoogleProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/sign_up_new" element={<SignUp/>}/> 
        <Route path="*" element={<NotFound/>}/> 
        <Route path="/users/signupsteps" element={<SetUpAccount/>} />
        <Route path="/userPage" element={<SetUpAccount/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
      </GoogleProvider>
    </ScreenSizesProvider>
  )
}

export default App;
