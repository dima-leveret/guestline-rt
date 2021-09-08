import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

import Placeholder from "../img/Placeholder.png"
import Carousel from "./ui-components/Carousel";
import LinearProgress from '@material-ui/core/LinearProgress';

import "../style/SelectedHotel.css"

const SelectedHotel: React.FC = () => {
  const { hotelRoomsData, isLoading, error } = useTypedSelector(
    (state) => state.hotelRoomsData
  );
  const { fetchHotelData } = useActions();

  const { hotelId }: { hotelId: string } = useParams();

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [adultsValue, setAdultsValue] = useState(adults);
  const [childrenValue, setChildrenValue] = useState(children);
  
  
  useEffect(() => {
    fetchHotelData(hotelId);
  }, [adultsValue, childrenValue]);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  if (isLoading) {
    return <div >
      <LinearProgress />
      <LinearProgress color="secondary" />
    </div>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  
  const addAdult = () => {
    const maxValue = hotelRoomsData.map((room: any) => {
      return room.occupancy.maxAdults
    })
    .reduce((arg: number, val: number) => {
      if(val > arg) {
        return val;
      } return arg;
    }, 0)
  

    if (adults < maxValue) {
      setAdults((prevAdultnumber) => prevAdultnumber + 1);
    }
  };

  const removeAdult = () => {
    if (adults > 0) {
      setAdults((prevAdultnumber) => prevAdultnumber - 1);
    }
  };

  const addChildren = () => {
    const maxValue = hotelRoomsData.map((room: any) => {
      return room.occupancy.maxChildren
    })
    .reduce((arg: number, val: number) => {
      if(val > arg) {
        return val;
      } return arg;
    }, 0)
    
    if (children < maxValue) {
      setChildren((prevAdultnumber) => prevAdultnumber + 1);
    }
  };

  const removeChildren = () => {
    if (children > 0) {
      setChildren((prevAdultnumber) => prevAdultnumber - 1);
    }
  };

  const searchRoom = () => {
    setAdultsValue((prevAdultsValue) => (prevAdultsValue = adults));
    setChildrenValue((prevChildrenValue) => (prevChildrenValue = children));
  };

  const reset = () => {
    setAdults((prevAdults) => (prevAdults = 0));
    setChildren((prevChildren) => (prevChildren = 0));
    setAdultsValue((prevAdultsValue) => (prevAdultsValue = 0));
    setChildrenValue((prevChildrenValue) => (prevChildrenValue = 0));
  };

  return (
    <div>
      <button onClick={goBack}>Back to main</button>

      <div>
        <div>
          <span>Adults</span>
          <button onClick={addAdult}>+</button>
          {adults}
          <button onClick={removeAdult}>-</button>
        </div>

        <div>
          <span>Children</span>
          <button onClick={addChildren}>+</button>
          {children}
          <button onClick={removeChildren}>-</button>
        </div>

        <button onClick={searchRoom}>SAERCH ROOM</button>
        <button onClick={reset}>RESET</button>
      </div>

      {hotelRoomsData.map(
        (room: any ) =>
          room.occupancy.maxAdults >= adultsValue &&
          room.occupancy.maxChildren >= childrenValue && (
            <div key={room.id}>
              <p>{room.name}</p>
              <p> Max adults: {room.occupancy.maxAdults}</p>
              <p> Max children: {room.occupancy.maxChildren}</p>
              <p> Long description: {room.longDescription}</p>
              <div>
                {room.images.length === 0
                ?
                <img className="img-placeholder" src={Placeholder} alt="img-placeholder" />
                :
                <Carousel images={room.images} />
                }
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default SelectedHotel;
