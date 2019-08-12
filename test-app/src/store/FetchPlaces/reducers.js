import {GET_CURRENT_PLACE_TYPE} from './actions';

const defaultState = {
    currentType: ''
};

export const fetchPlacesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_CURRENT_PLACE_TYPE:
            return {
                ...state,
                currentType: action.payload
            };
        default:
            break
    }

    return state;
};
