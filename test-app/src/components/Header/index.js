import  React from 'react';
import './Header.sass'
import MenuButton from "./MenuButton";

function Header(){
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

export default Header;
