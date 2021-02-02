import React from 'react';
import Routes from './routes';
import Header from './components/layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import './global.css';

function App() {
  return (

    <div>
            
      <Header /> 

      <div className="container mt-3">
        <Routes /> 
      </div>

    </div>
    
  );
}

export default App;
