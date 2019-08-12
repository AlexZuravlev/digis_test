import React from 'react';
import './MenuButton.sass'
import {Link} from 'react-router-dom';

class MenuButton extends React.Component {

    render() {
        return (
            <Link to={this.props.link} onClick={this.handleClick}>
                <div className='MenuButton'>
                    <span>{this.props.text}</span>
                </div>
            </Link>
        )
    }
}

export default MenuButton;
