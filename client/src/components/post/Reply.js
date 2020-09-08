import React, { useState } from "react";
import axios from "axios";
import { Button } from "reactstrap";

const Reply = ({ commentID, username, createdAt, content, points }) => {
  const [newUpVote, setUpVote] = useState(points);
  const [upVoteClicked, setUpVoteClicked] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");

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
    <div className="reply-container">
      <div className="vertical-line"></div>
      <div className="cmt">
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

          {localStorage.getItem("username") ? (
            <div className="comment-reply">
              <button
                id="reply-button"
                type="button"
                onClick={() => setShowReply(!showReply)}
              >
                <i className="fas fa-comment"></i>
                Reply
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {showReply ? (
        <div className="comment-box-container">
          <form method="POST">
            <div className="reply">
              <div className="vertical-line"></div>
              <textarea
                className="comment-box"
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="What are your thoughts?"
                onChange={(e) => {
                  setReplyContent(e.target.value);
                }}
              ></textarea>
            </div>
            <div id="cmt-btn-container">
              <Button
                type="submit"
                color="primary"
                id="comment-btn"
                disabled={!replyContent}
              >
                COMMENT
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Reply;
