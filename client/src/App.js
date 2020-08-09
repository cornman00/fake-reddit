import React from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import CreatePost from "./components/post/CreatePost";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/submit" component={CreatePost} />
      </Switch>
    </>
  );
}

export default App;
