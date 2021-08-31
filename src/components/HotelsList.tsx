import React, { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { NavLink } from "react-router-dom";

const HotelsList: React.FC = () => {
  const { hotels, isLoading, error } = useTypedSelector(
    (state) => state.hotels
  );
  const { fetchHotels } = useActions();

  useEffect(() => {
    fetchHotels();
  }, []);


  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      {hotels.map((hotel) => (
        <div 
        key={hotel.id}> <NavLink to={`/selected-hotel/${hotel.id}`} > 
        {hotel.name} </NavLink> 
        {
          hotel.images.map((image: any) =>  <p key={image.url} >{image.url}</p> )
        }
        </div>
      ))}
    </div>
  );
};

export default HotelsList;
