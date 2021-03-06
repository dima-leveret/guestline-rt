import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HotelsList from "./components/HotelsList";
import SelectedHotelRooms from "./components/SelectedHotelRooms";

import "./style/App.css"

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HotelsList} />
        <Route path="/selected-hotel/:hotelName/:hotelId" component={SelectedHotelRooms} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
