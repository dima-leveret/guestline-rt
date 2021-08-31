import { Dispatch } from "redux";
import { HotelsAction, HotelsActionTypes } from "../../types/hotels";
import axios from "axios";

export const fetchHotels = () => {
  return async (dispatch: Dispatch<HotelsAction>) => {
    try {
      dispatch({ type: HotelsActionTypes.FETCH_HOTELS });
      const response = await axios.get(
        "https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG"
      );
      dispatch({
        type: HotelsActionTypes.FETCH_HOTELS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: HotelsActionTypes.FETCH_HOTELS_ERROR,
        payload: "Error during fetching hotels",
      });
    }
  };
};
