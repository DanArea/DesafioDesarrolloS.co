import Header from './Components/Header';
//import Pizarra from './Components/Blackboard';
import BlocDeNotas from './Components/BlocDeNotas';
import AiButton from './Components/AiButton';
import './App.css';
import Pizarra from './Components/Blackboard';


const App = () => {
  return (
<div className="app-container">
      <div className="header-container">
      <Header />
      </div>
      <AiButton/>
    </div>
  );
};

export default App;
