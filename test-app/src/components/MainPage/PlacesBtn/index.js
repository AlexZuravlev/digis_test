import React from 'react'

const PlacesBtn = (props) => {
    return(
        <div className='places__btn'  onClick={props.click}>
            <span>{props.text}</span>
        </div>
    )
};

export default PlacesBtn;
