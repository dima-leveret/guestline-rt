import React, { useEffect, useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { NavLink } from "react-router-dom";

import "../style/HotelsList.css"

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Carousel from "./ui-components/Carousel";

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
    setStars((prevStar) => (prevStar = starRating));
  };

  const reset = () => {
    setStarRating((prevStarRating) => (prevStarRating = 1));
    setStars((prevStar) => (prevStar = 1));
  };

  return (
    <div className="container" >
      <Paper elevation={4} className="paper" >
        <Typography align="center" display="block" variant="h6" >Select the nubmer of hotel stars</Typography>

        <div className="stars-container" >
          <IconButton color="secondary" size='medium' onClick={removeStar}>
            <RemoveIcon fontSize="medium" />
          </IconButton>

          <Rating readOnly value={starRating} />

          <IconButton color="primary" size='medium' onClick={addStar}>
            <AddIcon fontSize="medium" />
          </IconButton>
        </div>
        
        <div className="btn-container">
          <Button 
            color="primary" 
            endIcon={<SearchIcon/>} 
            variant="contained" 
            onClick={searchHotel}
            >
              SAERCH HOTEL
          </Button>
          <Button
            color="inherit"
            endIcon={<RotateLeftIcon/>} 
            variant="outlined" 
            onClick={reset}
            >
              RESET
          </Button>
        </div>
      </Paper>

      {hotels.map((hotel) =>
          Number(hotel.starRating) >= stars && (
            <div key={hotel.id}>
              <NavLink to={`/selected-hotel/${hotel.id}`}>
                <p>{hotel.name}</p>
                <p>{hotel.address1}</p>
              </NavLink>
              <Rating readOnly value={Number(hotel.starRating)} />
              <div>
                {hotel.images.length === 0
                  ?
                  <h3>no images</h3>
                  :
                  <Carousel images = {hotel.images} />
                }
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default HotelsList;
