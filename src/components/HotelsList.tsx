import { useEffect, useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

import "../style/HotelsList.css"

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import LinearProgress from '@material-ui/core/LinearProgress';

import SingleHotel from "./SingleHotel";

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

  if (error) {
    return <h2>{error}</h2>;
  }

  const handleOnStarRaitingChange = (newValue: any) => {
    setStarRating((prevValue) => prevValue = newValue)
  }

  const searchHotel = () => {
    setStars((prevStar) => (prevStar = starRating));
  };

  const reset = () => {
    setStarRating((prevStarRating) => (prevStarRating = 1));
    setStars((prevStar) => (prevStar = 1));
  };

  return (
    <div className="hotels-container" >
      {isLoading &&  <LinearProgress /> }

      <div className="hotels-poster-container" > 
        <h1 className="hotels-poster" > GUESTLINE HOTELS </h1>
      </div>

      <Paper elevation={5} className="hotels-filter" >
        <Typography align="center" display="block" variant="h6" >Select the nubmer of hotel stars</Typography>

        <div className="hotels-stars-container" >
          <Rating 
            name="star-raiting"
            onChange={(event, newValue) => handleOnStarRaitingChange(newValue)}
            value={starRating} 
          />
        </div>
        
        <div className="hotels-btn-container">
          <Button 
            size="small"
            color="primary" 
            endIcon={<SearchIcon/>} 
            variant="contained" 
            onClick={searchHotel}
            >
              FILTER HOTELS
          </Button>
          <Button
            size="small"
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
        +hotel.starRating >= stars && <SingleHotel key={hotel.id} hotel={hotel} />
      )}
    </div>
  );
};

export default HotelsList;
