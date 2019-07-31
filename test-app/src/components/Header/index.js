import  React from 'react';
import './Header.sass'
import MenuButton from "./MenuButton";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import MainPage from "../MainPage";
import AboutPage from "../AboutPage";

function Header(){
    return (
        <Router>
            <div className='Header'>
                <MenuButton text='Main page' link='/'/>
                <MenuButton text='Authorization'/>
                <MenuButton text='About author' link='about'/>
            </div>

            <Route path="/" exact component={MainPage} />
            <Route path="/about/" component={AboutPage} />
        </Router>

    );
}

export default Header;
