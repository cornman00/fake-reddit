import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CommunityBanner from "../home/CommunityBanner";
import { Button } from "reactstrap";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username] = useState(localStorage.getItem("username"));
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/submit", {
        title: title,
        content: content,
        username: username,
      })
      .then((res) => res.json)
      .then((data) => {
        history.goBack();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed submitting your post");
      });
  };

  return (
    <div className="create-post-container">
      <div className="create-post-main">
        <div className="create-post-left-container">
          <p>Create a post</p>
          <hr />
          <div className="post-box">
            <form method="POST" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                id="content"
                name="content"
                placeholder="Text"
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <Button type="submit" className="post-button" color="primary">
                POST
              </Button>
            </form>
          </div>
        </div>

        <CommunityBanner />
      </div>
    </div>
  );
};

export default CreatePost;
