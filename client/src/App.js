import React from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import CreatePost from "./components/post/CreatePost";
import Post from "./components/post/Post";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/submit" component={CreatePost} />
        <Route path="/post" component={Post} />
      </Switch>
    </>
  );
}

export default App;
