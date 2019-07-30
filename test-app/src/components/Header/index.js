import  React from 'react';
import './Header.sass'
import MenuButton from "./MenuButton";

function Header(){
    return (
      <div className='Header'>
          <MenuButton text='Main page'/>
          <MenuButton text='Authorization'/>
          <MenuButton text='About author'/>
      </div>
    );
}

export default Header;
