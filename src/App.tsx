import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HotelsList from "./components/HotelsList";
import SelectedHotel from "./components/SelectedHotel";

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HotelsList} />
        <Route path="/selected-hotel/:hotelId" component={SelectedHotel} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
