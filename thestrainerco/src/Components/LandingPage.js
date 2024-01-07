import React from 'react';
import './LandingPage.css';
import logo from '../Logo.png';

const LandingPage = () => {
    return (
      <div className="landing-page">
        <div className="box fit-cultural">
          <a href="./Fit" className="link">
            <h2 className='h2-enabled'>Calcemos nuestro fit cultural</h2>
          </a>
        </div>
        <div className="box disabled">
          <h2 className='h2-disabled'>Pruebate a ti mismo</h2>
        </div>
        <div className="box disabled">
          <h2 className='h2-disabled'>Cuentanos sobre ti</h2>
        </div>
      </div>
    );
  }
  
  export default LandingPage;