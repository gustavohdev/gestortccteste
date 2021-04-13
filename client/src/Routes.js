import React, { useState } from "react";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router-dom"
import Home from "./containers/Home"
import NotFound from "./containers/NotFound";
import Login from "./containers/Login"
import Signup from "./containers/Signup"
import Menu from "./containers/Menu"
import Client from "./containers/Client"
import Config from "./containers/Config"
import Os from "./containers/Os"
import Company from "./containers/Company"
import Team from "./containers/Team"
import GridCar from "./containers/GridCar"
import Orcamento from "./containers/Orcamento"
import Graph from './containers/Graph'
import ClientGrid from './containers/ClientGrid'
import ProtectedRoute from './containers/ProtectedRoute';


export default function Routes(props) {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <ProtectedRoute exact={true} path="/menu" component={Menu} />
        <ProtectedRoute exact={true} path="/client" component={Client}/>
        <ProtectedRoute exact={true} path="/config" component={Config}/>
        <ProtectedRoute exact={true} path="/os" component={Os}/>
        <ProtectedRoute exact={true} path="/company" component={Company}/>
        <ProtectedRoute exact={true} path="/team" component={Team}/>
        <ProtectedRoute exact={true} path="/car" component={GridCar}/>
        <ProtectedRoute exact={true} path="/Orcamento" component={Orcamento}/>
        <ProtectedRoute exact={true} path="/Graph" component={Graph}/>
        <ProtectedRoute exact={true} path="/grid" component={ClientGrid}/>
        <Route exact path="*">
          <Home />
        </Route>
    </Switch>
  </BrowserRouter>

  );
};