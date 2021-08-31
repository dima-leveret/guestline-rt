import { Dispatch } from "redux";
import { SelectedHotelAction, SelectedHotelActionType } from "../../types/selectedHotel";
import axios from "axios";

export const fetchHotelData = (hotelId:any) => {
  return async (dispatch: Dispatch<SelectedHotelAction>) => {
    try {
      dispatch({ type: SelectedHotelActionType.FETCH_HOTEL_DATA });
      const response = await axios.get(
        `https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${hotelId}`);
      dispatch({
        type: SelectedHotelActionType.FETCH_HOTEL_DATA_SUCCSES,
        payload: response.data.rooms,
      });
    } catch (e) {
      dispatch({
        type: SelectedHotelActionType.FETCH_HOTEL_DATA_ERROR,
        payload: "Error during fetching hotel data",
      });
    }
  };
};