import React from 'react';
import './Header.sass'
import MenuButton from "./MenuButton";

class Header extends React.Component {

    render() {
        return (
            <div>
                <div className='Header'>
                    <MenuButton text='Main page' link='/'/>
                    <MenuButton text='Authorization' link='/authorization'/>
                    <MenuButton text='About author' link='about'/>
                </div>
            </div>
        );
    }
}

export default Header;
