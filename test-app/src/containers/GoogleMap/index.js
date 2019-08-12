import React from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import './GoogleMap.sass'
import MapBtn from "../../components/MainPage/MapBtn"
import {connect} from "react-redux";

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
            geo: {},
            keyIndex: 0,
            visibility: true,
            btnText: 'hide',
            placesType: '',
            nearestPlaces: [],
            map: {},
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.renderNearest !== nextProps.renderNearest) {
            this.placesBtnHandleClick(nextProps.renderNearest);
        }
    }

    placesBtnHandleClick = (currentType) => {
        let map = this.state.map;
        const google = this.props.google;
        const service = new google.maps.places.PlacesService(map);
        let geo = this.state.geo;
        const nearestPlaces = [];
        const request = {
            location: geo,
            radius: '500',
            type: [currentType],
            fields: ['name']
        };

        service.nearbySearch(request, (results) => {
            results.map((results, index) => {
                let lat = results.geometry.location.lat();
                let lng = results.geometry.location.lng();
                return nearestPlaces.push(<Marker key={index} position={{lat: lat, lng: lng}}/>);
            });
            this.setState({
                nearestPlaces
            })
        });
    };

    getMapProps = (mapProps, map) => {
        this.setState({
            map: map
        })
    };

    addMarker = (lat, lng, markersArr) => {
        markersArr.push(<Marker key={Math.random().toFixed(3)} visible={this.state.visibility}
                                position={{lat: lat, lng: lng}}/>);
    };

    mapClicked = (mapProps, map, clickEvent) => {
        let lat = clickEvent.latLng.lat();
        let lng = clickEvent.latLng.lng();
        let markersArr = [];
        if (this.state.visibility) {
            this.addMarker(lat, lng, markersArr);
        }
        this.setState(prevState => ({
            markers: [...prevState.markers, ...markersArr],
        }));
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
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
        localStorage.setItem('savedMarkers', markers)
    };

    displaySavedMarkers = () => {
        if (localStorage.getItem('savedMarkers')) {
            let savedMarkers = JSON.parse(localStorage.getItem('savedMarkers'));
            let savedMarkersArr = [];
            savedMarkers.map((marker, index) => {
                let lat = marker.props.position.lat;
                let lng = marker.props.position.lng;
                return savedMarkersArr.push(<Marker key={index} visible={this.state.visibility}
                                                    position={{lat: lat, lng: lng}}/>)
            });
            this.setState({
                markers: savedMarkersArr
            })
        }
    };

    hideShowMarkers = () => {
        this.setState(prevState => {
            return {
                visibility: !prevState.visibility,
                markers: prevState.markers.map((marker, index) => {
                    let lat = marker.props.position.lat;
                    let lng = marker.props.position.lng;
                    return <Marker key={index} visible={!this.state.visibility} position={{lat: lat, lng: lng}}/>
                }),
                btnText: prevState.visibility ? prevState.visibility = 'show' : prevState.visibility = 'hide'
            };

        });

    };

    componentDidMount() {
        this.getGeoLocation();
        this.displaySavedMarkers();
    };

    onMarkerClick = (props, marker) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
        console.log('map clicked')
    };

    render() {
        return (
            <div>
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
                    <Marker
                        position={this.state.geo}
                        className='marker__geoposition'
                        name={'Your Geolocation'}
                        onClick={this.onMarkerClick}
                    />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                    {this.state.markers}
                    {this.state.nearestPlaces}
                </Map>
                <div className="maps__btn-cont">
                    <MapBtn text={this.state.btnText} click={this.hideShowMarkers}/>
                    <MapBtn val='save' text='save' click={this.saveMarkers}/>
                </div>
            </div>

        );
    }
}

const apiWraper = GoogleApiWrapper({
    apiKey: _GAPI_KEY,
    libraries: ['places']
})(MapContainer);

export default connect((store) => ({
    renderNearest: store.fetchPlaces.currentType
}))(apiWraper)
