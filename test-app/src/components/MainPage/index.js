import React from 'react';
import MapContainer from "./GoogleMap";
import PlacesBtn from './PlacesBtn';
import './GoogleMap/GoogleMap.sass';

const MainPage = () => (
    <section>
        <div className="places__button-cont">
            <PlacesBtn text='test'/>
            <PlacesBtn text='rest'/>
            <PlacesBtn text='Gas Station'/>
            <PlacesBtn text='test'/>
            <PlacesBtn text='test'/>
        </div>
        <div className="google-map">
            <MapContainer/>
        </div>
    </section>

);

export default MainPage;
