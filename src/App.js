import React from "react";
import "./App.css";
import { Switch, Route } from 'react-router-dom';
import Login from "./components/login/Login";
import HomePage from "./components/homepage/HomePage";


function App() {
  return (
    <div className="App">
       <div className="app-routes">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={HomePage} />
      </Switch>
  </div>
     
    </div>
  );
}

export default App;
