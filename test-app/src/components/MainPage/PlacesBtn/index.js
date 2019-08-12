import React from 'react'

class PlacesBtn extends React.Component{

    render() {
        return(
            <div className='places__btn' onClick={this.props.click}>
                <span>{this.props.text}</span>
            </div>
        )
    }

}

export default PlacesBtn;
