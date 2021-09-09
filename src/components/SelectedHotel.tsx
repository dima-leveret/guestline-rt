import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

import Placeholder from "../img/Placeholder.png"
import Carousel from "./ui-components/Carousel";
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

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
          <IconButton onClick={addAdult} >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>

        <div>
          <span>Children</span>
          <IconButton onClick={removeChildren}>
            <RemoveCircleOutlineIcon />
          </IconButton>
          {children}
          <IconButton onClick={addChildren}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>

        <button onClick={searchRoom}>SAERCH ROOM</button>
        <button onClick={reset}>RESET</button>
      </Paper>

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
