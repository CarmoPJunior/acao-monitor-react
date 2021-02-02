import React from 'react';


const Header = () =>(

    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Ações
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link"  href="/acao/" > 
              Ações
            </a>
          </li>          
        </div>
      </nav>
);

export default Header;