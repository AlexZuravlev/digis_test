import { combineReducers } from 'redux';
import { fetchPlacesReducer } from './FetchPlaces/reducers'

export default combineReducers({
    fetchPlaces: fetchPlacesReducer
    });
