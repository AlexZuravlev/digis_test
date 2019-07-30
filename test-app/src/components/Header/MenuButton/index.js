import React from 'react';
import './MenuButton.sass'


function MenuButton(props) {
    return(
      <div className="MenuButton">
          <span>{props.text}</span>

      </div>
    );
}

export default MenuButton;
