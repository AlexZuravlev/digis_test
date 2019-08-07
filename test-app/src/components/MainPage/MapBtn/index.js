import React from 'react';


class HideBtn extends React.Component {

    render() {
        return(
            <div className='maps__btn' onClick={this.props.click}>
                <span>{this.props.text}</span>
            </div>
        )

        }


}


export default HideBtn;
