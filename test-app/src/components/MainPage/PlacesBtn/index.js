import React from 'react'

class PlacesBtn extends React.Component{

    render() {
        return(
            <div className='places__btn'  onClick={()=>{this.props.updateData(this.props.text)}}>
                <span>{this.props.text}</span>
            </div>
        )
    }

}

export default PlacesBtn;
