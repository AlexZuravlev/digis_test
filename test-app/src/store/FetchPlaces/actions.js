export const GET_CURRENT_PLACE_TYPE = 'GET_CURRENT_PLACE_TYPE';

export const setCurrentPlaceType = currentType => {

    return ({
    type: GET_CURRENT_PLACE_TYPE,
    payload: currentType
})};
