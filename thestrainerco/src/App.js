import Header from './Components/Header';
import Pizarra from './Components/Blackboard';
import BlocDeNotas from './Components/BlocDeNotas';
import AiButton from './Components/AiButton';
import './App.css';
import ChatButton from './Components/AiButton';


const App = () => {
  return (
<div className="app-container">
      <div className="header-container">
      <Header />
      <AiButton />
      </div>
      <BlocDeNotas />
    </div>
  );
};

export default App;
