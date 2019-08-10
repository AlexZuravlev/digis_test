import React from 'react';
import {Map, GoogleApiWrapper, Marker,} from 'google-maps-react';
import './GoogleMap.sass'
import MapBtn from "../MapBtn"

const mapStyles = {
    width: '100%',
    height: '100%'
};


const _GAPI_KEY = 'AIzaSyDIC1XsgjbA9_gqHWK_Slvj9Ytw7-ZucHI';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            geo: {lat: 0, lng: 0},
            keyIndex: 0,
            visibility: true,
            btnText: 'hide',
            placesType: '',
            nearestPlaces: [],
            map: {}
        };
        this.placesBtnHandleClick = this.placesBtnHandleClick.bind(this)
    };


    placesBtnHandleClick() {
        let markers = [];

        let map = this.state.map;
        const google = this.props.google;
        const service = new google.maps.places.PlacesService(map);
        let geo = this.state.geo;
        const request = {
            location: geo,
            radius: '1000',
            type: [this.props.currentType]
        };

        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                results.map((res, index) => {
                    let lat = res.geometry.location.lat();
                    let lng = res.geometry.location.lng();
                    markers.push(<Marker id={index} visible={this.state.visibility} position={{lat: lat, lng: lng}}/>);
                });
            }

        });
        console.log(markers);
        return markers
    };

    getMapProps = (mapProps, map) => {
        this.setState({
            map: map
        })

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
    };


    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getLocationSuccess, this.getLocationError);
        } else {
            alert('Geolocation is not supported by this browser.')
        }
    };
    getLocationSuccess = (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.setState({
            geo: {lat: lat, lng: lng}
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
            default:
                break;

        }
    };

    saveMarkers = () => {
        const markers = JSON.stringify(this.state.markers);
        console.log(markers);
        localStorage.setItem('savedMarkers', markers)

    };

    displaySavedMarkers = () => {
        if (localStorage.getItem('savedMarkers')) {
            let savedMarkers = JSON.parse(localStorage.getItem('savedMarkers'));
            return savedMarkers.map((marker) => {
                let lat = marker.props.position.lat;
                let lng = marker.props.position.lng;
                return this.state.markers.push(<Marker visible={this.state.visibility}
                                                       position={{lat: lat, lng: lng}}/>)
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

    renderMap = () => {
        return (
            <Map
                google={this.props.google}
                zoom={13}
                style={mapStyles}
                onClick={this.mapClicked}
                onReady={this.getMapProps}
                disableDefaultUI={true}
                zoomControl={true}
                scaleControl={true}
                id='google_map'
                centerAroundCurrentLocation={true}
            >
                <Marker position={this.state.geo}/>
                {this.state.markers}
                {this.placesBtnHandleClick()}
            </Map>
        )
    };

    render() {
        // this.placesBtnHandleClick(this.props.currentType);
        return (

            <div>
                {this.renderMap()}
                <div className="maps__btn-cont">
                    <MapBtn text={this.state.btnText} click={this.hideShowMarkers}/>
                    <MapBtn val='save' text='save' click={this.saveMarkers}/>
                    <div style={{background: 'red', width: '50px', height: '50px'}}/>

                </div>
            </div>

        );
    }


}


export default GoogleApiWrapper({
    apiKey: _GAPI_KEY,
    libraries: ['places']
})(MapContainer);

