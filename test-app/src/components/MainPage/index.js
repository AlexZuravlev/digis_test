import React from 'react';
import MapContainer from "./GoogleMap";
import './GoogleMap/GoogleMap.sass'

const MainPage = () => (
    <section>
        <h1>Main page</h1>
        <div className="google-map">
            <MapContainer/>
        </div>
    </section>

);

export default MainPage;
