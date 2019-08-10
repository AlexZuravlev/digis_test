import React from 'react';
import MapContainer from "./GoogleMap";
import PlacesBtn from './PlacesBtn';
import './GoogleMap/GoogleMap.sass';
import './PlacesBtn/PlacesBtn.sass'

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentType: ''
        }
    }

    updateData = (value) => {
        this.setState({
            currentType: value
        });
    };



    render() {
        return (
            <section>
                <div className="places__button-cont">
                    <PlacesBtn text='gas_station' updateData={this.updateData}/>
                    <PlacesBtn text='bank' updateData={this.updateData}/>
                    <PlacesBtn text='Gas Station' updateData={this.updateData}/>
                    <PlacesBtn text='Airports' updateData={this.updateData}/>
                    <PlacesBtn text='Banks' updateData={this.updateData}/>
                </div>
                <div className="google-map">
                    <MapContainer currentType={this.state.currentType}/>
                </div>
            </section>
        )
    }

}

export default MainPage
