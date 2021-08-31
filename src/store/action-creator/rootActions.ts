import * as HotelsActionCreator from './hotels';
import * as SelectedHotelActionCreator from './selectedHotel';

export default {
    ...HotelsActionCreator,
    ...SelectedHotelActionCreator
}