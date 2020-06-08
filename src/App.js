import React from 'react';
import './App.css';
import BurgerBuilder from "./containers/BurgerBuilder";
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Route exact path='/' render={ props => <BurgerBuilder {...props}/>} />
            </Router>
        </div>
    );
}

export default App;
