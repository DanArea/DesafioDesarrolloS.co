import Header from './Components/Header';
import Pizarra from './Components/Blackboard';
import './App.css';

const App = () => {
  return (
<div className="app-container">
      <div className="header-container">
      <Header />
      </div>
      <Pizarra />
    </div>
  );
};

export default App;
