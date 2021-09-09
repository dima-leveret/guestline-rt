import { useEffect, useState } from "react";
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
import LinearProgress from '@material-ui/core/LinearProgress';

import Placeholder from "../img/Placeholder.png"

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
      {isLoading &&  <LinearProgress /> }
      
      <Paper elevation={5} className="filter" >
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
          +hotel.starRating >= stars && (
            <Paper elevation={4} className="hotel-container" key={hotel.id}>
              <div className="hotel-header" >
                <NavLink className="link" to={`/selected-hotel/${hotel.id}`}>
                  <Typography display="block" variant="h4" >{hotel.name}</Typography>
                </NavLink>
                <Rating readOnly value={Number(hotel.starRating)} />
              </div>
              
              <div className="hotel-content" >
                {hotel.images.length === 0
                  ?
                  <img className="img-placeholder" src={Placeholder} alt="img-placeholder" />
                  :
                  <Carousel images = {hotel.images} />
                }
                <div className="hotel-info" >
                  <div className="hotel-description" >
                    <Typography paragraph variant="h5" >ABOUT HOTEL:</Typography>
                    <Typography variant="body1" >{hotel.description}</Typography>
                  </div>
                  <div className="hotel-contacts" >
                    <Typography paragraph variant="button" >Contacts:</Typography>
                    <Typography variant="body2" >{hotel.address1}</Typography>
                    <Typography variant="body2" >{hotel.town}</Typography>
                    <Typography variant="body2" >{hotel.country}</Typography>
                    <Typography variant="body2" >{hotel.postcode}</Typography>
                    <Typography variant="body2" >{hotel.telephone}</Typography>
                  </div>
                </div>
              </div>
            </Paper>
          )
      )}
    </div>
  );
};

export default HotelsList;
