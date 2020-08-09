import React from "react";
import { Link } from "react-router-dom";

const PostButton = () => {
  return (
    <div className="post-button-container">
      <i className="fa fa-reddit" aria-hidden="true"></i>
      <Link to="/submit">
        <button className="create-button">
          <input type="text" placeholder="Create Post" />
        </button>
      </Link>
    </div>
  );
};

export default PostButton;
