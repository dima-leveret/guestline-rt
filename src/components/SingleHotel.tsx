import { NavLink } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Carousel from "./ui-components/Carousel";

import "../style/SingleHotel.css"

import Placeholder from "../img/Placeholder.png";

const SingleHotel = ({
    hotel: { id, name, starRating, images, description, address1, town, country, postcode, telephone },
}: any) => {
  return (
    <Paper elevation={7} className="hotel-container" key={id}>
      <div className="hotel-header">
        <NavLink
          className="link"
          to={`/selected-hotel/${name}/${id}`}
        >
          <Typography display="block" variant="h5">
            {name}
          </Typography>
        </NavLink>
        <Rating readOnly value={+starRating} />
      </div>

      <div className="hotel-content">
        {images.length === 0 ? (
          <img
            className="img-placeholder"
            src={Placeholder}
            alt="img-placeholder"
          />
        ) : (
          <Carousel images={images} />
        )}

        <div className="hotel-info">
          <div className="hotel-description">
            <Typography paragraph variant="h6">
              ABOUT HOTEL:
            </Typography>
            <Typography variant="body1">{description}</Typography>
          </div>
          <div className="hotel-contacts">
            <Typography paragraph variant="button">
              Contacts:
            </Typography>
            <Typography variant="body2">{address1}</Typography>
            <Typography variant="body2">{town}</Typography>
            <Typography variant="body2">{country}</Typography>
            <Typography variant="body2">{postcode}</Typography>
            <Typography variant="body2">{telephone}</Typography>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default SingleHotel;
