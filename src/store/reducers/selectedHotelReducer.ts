import { SelectedHotelAction, SelectedHotelActionType, SelectedHotelState } from "../../types/selectedHotel";

const initialState: SelectedHotelState = {
    hotelRoomsData: [],
    isLoading: false,
    error: null,
}

export const selectedHotelReeducer = (state = initialState, action: SelectedHotelAction): SelectedHotelState => {
  switch (action.type) {
    case SelectedHotelActionType.FETCH_HOTEL_DATA:
        return {...state, isLoading: true}
    case SelectedHotelActionType.FETCH_HOTEL_DATA_SUCCSES:
        return {...state, isLoading: false, hotelRoomsData: action.payload}
    case SelectedHotelActionType.FETCH_HOTEL_DATA_ERROR:
        return {...state, isLoading: false, error: action.payload}
    default:
      return state;
  }
};
