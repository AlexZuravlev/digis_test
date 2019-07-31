import React from 'react';
import './MenuButton.sass'
import {Link} from 'react-router-dom';


function MenuButton(props) {
    return (
        <Link to={props.link}>
            <div className="MenuButton">
                <span>{props.text}</span>
            </div>
        </Link>


    );
}

export default MenuButton;
