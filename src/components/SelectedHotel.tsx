import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const SelectedHotel: React.FC = () => {
  const { hotelRoomsData, isLoading, error } = useTypedSelector( (state) => state.hotelRoomsData);
  const {fetchHotelData} = useActions();

  const {hotelId}: {hotelId: string} = useParams()
  console.log(hotelId);
  

  useEffect(() => {
    fetchHotelData(hotelId)
  }, [])

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

  return (
    <div>
      <button onClick={goBack}>Back to main</button>
      Selected Hotel
      {
        hotelRoomsData.map((room: any) => <div key={room.id} > {room.name} {
          room.images.map((image: any) => <p key={image.url} > {image.url} </p>)
        } </div>)
      }
    </div>
  );
};

export default SelectedHotel;
