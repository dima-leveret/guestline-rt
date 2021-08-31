import { combineReducers } from "redux";
import { hotelsReducer } from "./hotelsReducer";
import { selectedHotelReeducer } from "./selectedHotelReducer";


export const rootReducer = combineReducers({
    hotels: hotelsReducer,
    hotelRoomsData: selectedHotelReeducer
});

export type RootState = ReturnType<typeof rootReducer>