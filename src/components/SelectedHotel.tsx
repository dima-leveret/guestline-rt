import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const SelectedHotel: React.FC = () => {
  const { hotelRoomsData, isLoading, error } = useTypedSelector(
    (state) => state.hotelRoomsData
  );
  const { fetchHotelData } = useActions();

  const { hotelId }: { hotelId: string } = useParams();

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  
  

  useEffect(() => {
    fetchHotelData(hotelId);
    console.log(adults, children);
  }, [adults, children]);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  const addAdult = () => {
    setAdults(prevAdultnumber => prevAdultnumber + 1)
  }

  const removeAdult = () => {
    setAdults(prevAdultnumber => prevAdultnumber - 1)
  }

  const addChildren = () => {
    setChildren(prevAdultnumber => prevAdultnumber + 1)
  }

  const removeChildren = () => {
    setChildren(prevAdultnumber => prevAdultnumber - 1)
  }

  return (
    <div>
      <button onClick={goBack}>Back to main</button>

      <div>
        <span>Adults</span>
        <button onClick={addAdult} >+</button>
        {adults}
        <button onClick={removeAdult} >-</button>
      </div>

      <div>
        <span>Children</span>
        <button onClick={addChildren} >+</button>
        {children}
        <button onClick={removeChildren} >-</button>
      </div>

      {hotelRoomsData.map((room: any) => (
        (room.occupancy.maxAdults >= adults && room.occupancy.maxChildren >= children) 
        &&
        <div key={room.id}>
          <p>{room.name}</p>
          <p> Max adults: {room.occupancy.maxAdults}</p>
          <p> Max children: {room.occupancy.maxChildren}</p>
          <p> Long description: {room.longDescription}</p>
          <div>
            {
              room.images.map((image: any) => (
                image
                ?
                <img  style={{ width: '100px' }} key={image.url} src={image.url} alt="room-images" />
                :
                <h3> No Images </h3>
              ))
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedHotel;
