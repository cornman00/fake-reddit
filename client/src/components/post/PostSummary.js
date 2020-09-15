import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const PostSummary = ({
  postID,
  title,
  content,
  username,
  comments_num,
  createdAt,
  upVote,
}) => {
  const [newUpVote, setUpVote] = useState(upVote);
  const [upVoteClicked, setUpVoteClicked] = useState(false);
  const url_title = title.replace(/ /g, "_");

  const upVotePost = (isUpVote) => {
    axios
      .patch("/api/posts/upvote", { isUpVote: isUpVote, postID: postID })
      .then((res) => res.data)
      .then((data) => console.log(data.message));
  };

  return (
    <div className="post-summary-container">
      <div className="vote-bar">
        <button
          onClick={() => {
            if (!upVoteClicked) {
              setUpVote(upVote + 1);
              setUpVoteClicked(true);
              upVotePost(true);
            } else {
              setUpVote(upVote);
              setUpVoteClicked(false);
              upVotePost(false);
            }
          }}
          className="vote-button"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
        {newUpVote === 0 ? <i className="fas fa-circle "></i> : newUpVote}
        <button
          onClick={() => {
            if (!upVoteClicked) {
              if (upVote > 0) {
                setUpVote(upVote - 1);
                setUpVoteClicked(true);
                upVotePost(false);
              }
            } else {
              setUpVote(upVote);
              setUpVoteClicked(false);
              upVotePost(true);
            }
          }}
          className="vote-button"
        >
          <i className="fas fa-arrow-down"></i>
        </button>
      </div>
      <Link
        to={`/comments/${postID}/${url_title}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="summary-contents">
          <p className="posted-by">
            Posted by u/{username} {createdAt}
          </p>
          <p className="post-summary-title">{title}</p>
          <p className="post-summary">{content}</p>
          <div className="summary-functions">{comments_num} Comments</div>
        </div>
      </Link>
    </div>
  );
};

export default PostSummary;
