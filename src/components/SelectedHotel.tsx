import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

import Placeholder from "../img/Placeholder.png"
import Carousel from "./ui-components/Carousel";
import Accordion from "../components/ui-components/Accordion"
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

import "../style/SelectedHotel.css"
import { Typography } from "@material-ui/core";

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
    <div className="container" >
      <Button 
        variant="contained" 
        color="default" 
        className="btn-back" 
        startIcon={<HomeIcon/>} 
        onClick={goBack}>Back to main</Button>

      <Paper elevation={5} className="filter" >
        <div>
          <span>Adults</span>
          <IconButton onClick={removeAdult}>
            <RemoveCircleOutlineIcon />
          </IconButton>
          {adults}
          <IconButton color="primary" onClick={addAdult} >
            <AddCircleOutlineIcon color="primary" />
          </IconButton>
        </div>

        <div>
          <span>Children</span>
          <IconButton  onClick={removeChildren}>
            <RemoveCircleOutlineIcon />
          </IconButton>
          {children}
          <IconButton color="primary" onClick={addChildren}>
            <AddCircleOutlineIcon color="primary" />
          </IconButton>
        </div>

        <div className="rooms-btn-container" > 
          <Button
            endIcon={<SearchIcon/>}  
            size="small"
            color="primary"
            onClick={searchRoom}
          >
            FILTER ROOMS
          </Button>
          <Button 
            endIcon={<RotateLeftIcon/>}
            size="small"
            onClick={reset}
          >
            RESET
          </Button>
        </div>
        
      </Paper>

      {hotelRoomsData.map(
        (room: any ) =>
          room.occupancy.maxAdults >= adultsValue &&
          room.occupancy.maxChildren >= childrenValue && (
            <Paper elevation={6} key={room.id} className="room-container" >
              
              <Typography className="room-header" variant="h6" >{room.name}</Typography>

              <div className="room-content" >
                {room.images.length === 0
                ?
                <img className="img-placeholder" src={Placeholder} alt="img-placeholder" />
                :
                <Carousel images={room.images} />
                }

                <div className="room-info" >
                  <div className="room-description" >
                    <Typography paragraph variant="h6" > ABOUT ROOM: </Typography>
                    <Typography> {room.longDescription} </Typography>
                  </div>
                  <div className="room-occupancy" >
                    <Typography>Max adults: {room.occupancy.maxAdults}</Typography>
                    <Typography>Max children: {room.occupancy.maxChildren}</Typography>
                  </div>
                </div>

                <Accordion facilities={room.facilities} />
              </div>
            </Paper>
          )
      )}
    </div>
  );
};

export default SelectedHotel;
