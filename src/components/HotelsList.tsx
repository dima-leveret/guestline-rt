import React, { useEffect, useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { NavLink } from "react-router-dom";

const HotelsList: React.FC = () => {
  const { hotels, isLoading, error } = useTypedSelector(
    (state) => state.hotels
  );

  const { fetchHotels } = useActions();

  const [starRating, setStarRating] = useState(1);
  const [stars, setStars] = useState(starRating);
  

  useEffect(() => {
    fetchHotels();
  }, [stars]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  const addStar = () => {
    if (starRating < 5) {
      setStarRating((prevStarRaitng) => prevStarRaitng + 1);
    }
  };

  const removeStar = () => {
    if (starRating > 1) {
      setStarRating((prevStarRating) => prevStarRating - 1);
    }
  };

  const searchHotel = () => {
    setStars((prevStar) => prevStar = starRating )
  }

  const reset = () => {
    setStarRating((prevStarRating) => prevStarRating = 1)
    setStars((prevStar) => prevStar = 1)
  }

  return (
    <div>
      <div>
        <span>STARS</span>
        <button onClick={addStar}>+</button>
        {starRating}
        <button onClick={removeStar}>-</button>
        <button onClick={searchHotel} >SAERCH HOTEL</button>
        <button onClick={reset} >RESET</button>
      </div>
      {hotels.map(
        (hotel) =>
          Number(hotel.starRating) >= stars && (
            <div key={hotel.id}>
              <NavLink to={`/selected-hotel/${hotel.id}`}>
                <p>{hotel.name}</p>
                <p>{hotel.address1}</p>
              </NavLink>
              <span>{hotel.starRating}</span>
              <div>
                {hotel.images.map((image: any) => (
                  <img
                    style={{ width: "100px" }}
                    key={image.url}
                    src={image.url}
                    alt="hotel-img"
                  />
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default HotelsList;
