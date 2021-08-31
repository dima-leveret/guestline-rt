import {HotelsState, HotelsAction, HotelsActionTypes} from "../../types/hotels"

const initialState: HotelsState = {
  hotels: [],
  isLoading: false,
  error: null,
};


export const hotelsReducer = (state = initialState, action: HotelsAction): HotelsState => {
  switch (action.type) {
    case HotelsActionTypes.FETCH_HOTELS:
      return { isLoading: true, error: null, hotels: [] };
    case HotelsActionTypes.FETCH_HOTELS_SUCCESS:
      return { isLoading: false, error: null, hotels: action.payload };
    case HotelsActionTypes.FETCH_HOTELS_ERROR:
      return { isLoading: true, error: action.payload, hotels: [] };
    default:
      return state;
  }
};
