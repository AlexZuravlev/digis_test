import React from 'react';
import Header from "./components/Header";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MainPage from "./components/MainPage";
import AboutPage from "./components/AboutPage";
import AuthorizationPage from "./components/AuthorizationPage";


function App() {
    return (
        <Router>
            <div>
                <Header/>
            </div>
            <Route path="/" exact component={MainPage}/>
            <Route path="/Authorization/" component={AuthorizationPage}/>
            <Route path="/about/" component={AboutPage}/>
        </Router>
    );
}

export default App;
