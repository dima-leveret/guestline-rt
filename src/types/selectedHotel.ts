export interface SelectedHotelState {
  hotelRoomsData: any;
  isLoading: boolean;
  error: null | string;
}

export enum SelectedHotelActionType {
  FETCH_HOTEL_DATA = "FETCH_HOTEL_DATA",
  FETCH_HOTEL_DATA_SUCCSES = "FETCH_HOTEL_DATA_SUCCSES",
  FETCH_HOTEL_DATA_ERROR = "FETCH_HOTEL_DATA_ERROR",
}

interface FetchHotelDataAction {
  type: SelectedHotelActionType.FETCH_HOTEL_DATA;
}

interface FetchHotelDataSuccessAction {
  type: SelectedHotelActionType.FETCH_HOTEL_DATA_SUCCSES;
  payload: any;
}

interface FetchHotelDataErrorAction {
  type: SelectedHotelActionType.FETCH_HOTEL_DATA_ERROR;
  payload: string;
}

export type SelectedHotelAction =
  | FetchHotelDataAction
  | FetchHotelDataSuccessAction
  | FetchHotelDataErrorAction;
