import './App.css';
import logo from '@/assets/images/logo.png'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import { NotFound } from './components/NotFound/NotFound';
import { ScreenSizesProvider } from './context/ScreenSizesProvider';
function App() {

  return(
    <ScreenSizesProvider>

      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound/>}/> 
      </Routes>
    </Router>
    </ScreenSizesProvider>//asd
  )
}

export default App;
