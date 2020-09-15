import React from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import CreatePost from "./components/post/CreatePost";
import Post from "./components/post/Post";
import NotFound from "./components/error/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/submit" component={CreatePost} />
        <Route exact path="/comments/:postID/:postTitle" component={Post} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
