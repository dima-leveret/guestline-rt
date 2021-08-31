export interface HotelsState {
  hotels: any[];
  isLoading: boolean;
  error: null | string;
}

export enum HotelsActionTypes {
  FETCH_HOTELS = "FETCH_HOTELS",
  FETCH_HOTELS_SUCCESS = "FETCH_HOTELS_SUCCESS",
  FETCH_HOTELS_ERROR = "FETCH_HOTELS_FETCH_HOTELS_ERROR",
}

interface FetchHotelsAction {
  type: HotelsActionTypes.FETCH_HOTELS;
}

interface FetchHotelsSuccessAction {
  type: HotelsActionTypes.FETCH_HOTELS_SUCCESS;
  payload: any[];
}
interface FetchHotelsErrorAction {
  type: HotelsActionTypes.FETCH_HOTELS_ERROR;
  payload: string;
}

export type HotelsAction =
  | FetchHotelsAction
  | FetchHotelsSuccessAction
  | FetchHotelsErrorAction;
