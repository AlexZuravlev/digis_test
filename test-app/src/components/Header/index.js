import React from 'react';
import './Header.sass'
import MenuButton from "./MenuButton";

class Header extends React.Component {
    render() {
        return (
            <div>
                <div className='Header'>
                    <MenuButton text='Main page' link='/' id={0}/>
                    <MenuButton text='Authorization' link='/authorization' id={1}/>
                    <MenuButton text='About author' link='about' id={2}/>
                </div>
            </div>

        );
    }


}

export default Header;
