import React from "react";

const PostSummary = ({ title, content, username, comments_num }) => {
  return (
    <div className="post-summary-container">
      <div className="vote-bar">
        <button className="vote-button">
          <i class="fas fa-arrow-up"></i>
        </button>
        <i class="fas fa-circle "></i>
        <button className="vote-button">
          <i class="fas fa-arrow-down"></i>
        </button>
      </div>
      <div className="summary-contents">
        <p className="posted-by">Posted by {username}</p>
        <p className="post-summary-title">{title}</p>
        <p className="post-summary">{content}</p>
        <div className="summary-functions">{comments_num} Comments</div>
      </div>
    </div>
  );
};

export default PostSummary;
