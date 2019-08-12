import React from 'react';
import MapContainer from "../../containers/GoogleMap";
import PlacesBtn from './PlacesBtn';
import '../../containers/GoogleMap/GoogleMap.sass';
import './PlacesBtn/PlacesBtn.sass'
import { connect } from 'react-redux';
import { setCurrentPlaceType } from '../../store/FetchPlaces/actions';

class MainPage extends React.Component {

    render() {
        return (
            <section>
                <div className="places__button-cont">
                    <PlacesBtn text='Gas Stations' place='gas_station' click={()=> this.props.setCurrentPlaceType('gas_station')}/>
                    <PlacesBtn text='Banks' place='bank' click={()=> this.props.setCurrentPlaceType('bank')}/>
                    <PlacesBtn text='Airports' place='airport' click={()=> this.props.setCurrentPlaceType('airport')}/>
                    <PlacesBtn text='Bars' place='bar' click={()=> this.props.setCurrentPlaceType('bar')}/>
                    <PlacesBtn text='Cafes' place='cafe' click={()=> this.props.setCurrentPlaceType('cafe')}/>
                </div>
                <div className="google-map">
                    <MapContainer/>
                </div>
            </section>
        )
    }
}

export default connect(null, {
    setCurrentPlaceType
})(MainPage)
