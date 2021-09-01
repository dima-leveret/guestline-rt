import React, { useEffect, useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { NavLink } from "react-router-dom";

const HotelsList: React.FC = () => {
  const [starRating, setStarRating] = useState(1)
  const { hotels, isLoading, error } = useTypedSelector(
    (state) => state.hotels
  );
  const { fetchHotels } = useActions();

  useEffect(() => {
    fetchHotels();
  }, [starRating]);


  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  const add = () => {
    if (starRating < 5) {
      setStarRating(starRating + 1)
    }
  }

  const decrement = () => {
    if (starRating > 1) {
      setStarRating(starRating - 1)
    }
  }

  return (
    <div>
      <div>
        <button onClick={add} >+</button>
        {starRating}
        <button onClick={decrement} >-</button>
      </div>
      {hotels.map((hotel) => (

        Number(hotel.starRating)  >= starRating
        ?
        <div key={hotel.id}> 
        <NavLink to={`/selected-hotel/${hotel.id}`} > 
        {hotel.name} </NavLink> 
        <span>{hotel.starRating}</span> 
        </div>
        :
        null
      ))}
    </div>
  );
};

export default HotelsList;
