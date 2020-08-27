import React, { useState } from "react";
import axios from "axios";

const Comment = ({ commentID, username, createdAt, content, points }) => {
  const [newUpVote, setUpVote] = useState(points);
  const [upVoteClicked, setUpVoteClicked] = useState(false);

  const upVoteComment = (isUpVote) => {
    axios
      .patch("/posts/upvote/comment", {
        isUpVote: isUpVote,
        commentID: commentID,
      })
      .then((res) => res.data)
      .then((data) => console.log(data.message));
  };

  return (
    <div className="cmt-container">
      <div className="comment-vote-bar">
        <button
          onClick={() => {
            if (!upVoteClicked) {
              setUpVote(points + 1);
              setUpVoteClicked(true);
              upVoteComment(true);
            } else {
              setUpVote(points);
              setUpVoteClicked(false);
              upVoteComment(false);
            }
          }}
          className="comment-vote-button"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
        <button
          onClick={() => {
            if (!upVoteClicked) {
              if (points > 0) {
                setUpVote(points - 1);
                setUpVoteClicked(true);
                upVoteComment(false);
              }
            } else {
              setUpVote(points);
              setUpVoteClicked(false);
              upVoteComment(true);
            }
          }}
          className="comment-vote-button"
        >
          <i className="fas fa-arrow-down"></i>
        </button>
      </div>
      <div className="comment-contents">
        <p className="posted-by">
          {username} {newUpVote} points <i className="fas fa-circle"></i>
          {createdAt}
        </p>
        <p className="comment-text">{content}</p>
        <div className="comment-reply">
          <i className="fas fa-comment"></i>Reply
        </div>
      </div>
    </div>
  );
};

export default Comment;
