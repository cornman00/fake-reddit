import React from "react";
import CommunityBanner from "../home/CommunityBanner";

const CreatePost = () => {
  return (
    <div className="create-post-container">
      <div className="create-post-left-container">
        <p>Create a post</p>
        <hr />
        <div className=""></div>
        <form method="POST">
          <input type="text" name="title" placeholder="Title" />
          <input type="text" name="content" placeholder="Text(optional)" />
        </form>
      </div>
      <div className="create-post-right-container">
        <CommunityBanner />
      </div>
    </div>
  );
};

export default CreatePost;
