import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import Acao from './pages/Acao';


export default function Routes(){
    return (

        <BrowserRouter>
            <Switch>

                <Route exact path="/" exact component={Home} />
                <Route exact path="/acao" exact component={Acao} />
                
            </Switch>
        </BrowserRouter>
    );

}