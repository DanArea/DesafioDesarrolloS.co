import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import Header from './Components/Header';
import './App.css';
import AiButton from './Components/AiButton';
import LandingPage from './Components/LandingPage';


const App = () => {
  return (
<div className="app-container">
      <div className="header-container">
      <Header />
      </div>
      <Router>
   <Routes>
      <Route path ='*' element={<LandingPage/>} />
      <Route path ='/fit' element={<AiButton/>} />
      </Routes>
 </Router>

    </div>
  );
};

export default App;
