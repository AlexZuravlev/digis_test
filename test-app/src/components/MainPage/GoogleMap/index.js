import React from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import './GoogleMap.sass'
import MapBtn from "../MapBtn"

const mapStyles = {
    width: '100%',
    height: '100%'
};


class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            geo: {lat: 0, lng: 0},
            keyIndex: 0,
            visibility: true,
            btnText: 'hide',
        };


    };


    addMarker = (lat, lng, markersArr) => {
        markersArr.push(<Marker visible={this.state.visibility} position={{lat: lat, lng: lng}}/>);

    };



    mapClicked = (mapProps, map, clickEvent) => {
        let lat = clickEvent.latLng.lat();
        let lng = clickEvent.latLng.lng();
        let markersArr = this.state.markers;
        if (this.state.visibility) {
            this.addMarker(lat, lng, markersArr);
        }
        this.setState({
            markers: markersArr,
        });
        console.log(markersArr)
    };


    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getLocationSuccess, this.getLocationError);
        } else {
            alert('Geolocation is not supported by this browser.')
        }
    };
    getLocationSuccess = (position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.setState({
            geo: {lat: this.lat, lng: this.lng}
        })

    };


    getLocationError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;

        }
    };

    saveMarkers = () => {
        const markers = JSON.stringify(this.state.markers);
        console.log(markers);
        localStorage.setItem('savedMarkers', markers)

    };

    displaySavedMarkers = () => {
        if(localStorage.getItem('savedMarkers')){
            let savedMarkers = JSON.parse(localStorage.getItem('savedMarkers'));
            return savedMarkers.map((marker)=>{
                let lat = marker.props.position.lat;
                let lng = marker.props.position.lng;
                this.state.markers.push(<Marker visible={this.state.visibility} position={{lat: lat, lng: lng}}/>)
            })
        }
    };

    hideShowMarkers = () => {
        this.setState(prevState => {

            return {
                visibility: !prevState.visibility,
                markers: prevState.markers.map((marker) => {
                    let lat = marker.props.position.lat;
                    let lng = marker.props.position.lng;
                    return <Marker visible={!this.state.visibility} position={{lat: lat, lng: lng}}/>
                }),
                btnText: prevState.visibility ? prevState.visibility = 'show' : prevState.visibility = 'hide'
            };

        });

    };


    componentDidMount() {
        this.getGeoLocation();
        this.displaySavedMarkers();
    }


    render() {

        return (
            <div>
                <Map
                    google={this.props.google}
                    zoom={11}
                    style={mapStyles}
                    initialCenter={this.state.geo}
                    center={this.state.geo}
                    onClick={this.mapClicked}
                    disableDefaultUI={true}
                    zoomControl={true}
                    scaleControl={true}
                    id='google_map'
                >
                    <Marker
                        position={this.state.geo}
                    />
                    {this.state.markers}
                </Map>
                <div className="maps__btn-cont">
                    <MapBtn text={this.state.btnText} click={this.hideShowMarkers}/>
                    <MapBtn val='save' text='save' click={this.saveMarkers}/>
                </div>
            </div>

        );
    }


}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyDIC1XsgjbA9_gqHWK_Slvj9Ytw7-ZucHI'
})(MapContainer);

