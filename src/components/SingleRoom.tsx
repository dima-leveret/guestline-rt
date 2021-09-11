import Placeholder from "../img/Placeholder.png";
import Carousel from "./ui-components/Carousel";
import Accordion from "./ui-components/Accordion";
import Paper from '@material-ui/core/Paper';
import  Typography  from "@material-ui/core/Typography";

import "../style/SingleRoom.css"


const SingleRoom = ({
    room : {id, name, images, longDescription, occupancy, facilities},
}: any) => {
  return (
    <Paper elevation={6} key={id} className="room-container">
      <Typography className="room-header" variant="h6">
        {name}
      </Typography>

      <div className="room-content">
        {images.length === 0 ? (
          <img
            className="img-placeholder"
            src={Placeholder}
            alt="img-placeholder"
          />
        ) : (
          <Carousel images={images} />
        )}

        <div className="room-info">
          <div className="room-description">
            <Typography paragraph variant="h6">
              ABOUT ROOM:
            </Typography>
            <Typography> {longDescription} </Typography>
          </div>
          <div className="room-occupancy">
            <Typography paragraph variant="button">
              OCCUPANCY:
            </Typography>
            <Typography>Max adults: {occupancy.maxAdults}</Typography>
            <Typography>Max children: {occupancy.maxChildren}</Typography>
          </div>
        </div>

        <Accordion facilities={facilities} />
      </div>
    </Paper>
  );
};

export default SingleRoom;
