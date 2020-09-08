import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import Reply from "./Reply";

const Comment = ({
  commentID,
  username,
  createdAt,
  content,
  points,
  postID,
}) => {
  const [newUpVote, setUpVote] = useState(points);
  const [upVoteClicked, setUpVoteClicked] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyList, setReplyList] = useState([]);

  useEffect(() => {
    const getReply = () => {
      axios
        .get("http://localhost:5000/get_reply", {
          params: { commentID: commentID },
        })
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          setReplyList(data.replies);
        })
        .catch((err) => console.log(err));
    };
    getReply();
  }, []);

  const upVoteComment = (isUpVote) => {
    axios
      .patch("/posts/upvote/comment", {
        isUpVote: isUpVote,
        commentID: commentID,
      })
      .then((res) => res.data)
      .then((data) => console.log(data.message));
  };

  const postReply = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/post_reply", {
        parentID: commentID,
        username: localStorage.getItem("username"),
        content: replyContent,
        postID: postID,
      })
      .then(window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div className="cmt-container">
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

          {/* Show reply button if user is logged in */}

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

      {/* Reply box appears when the Reply button is clicked */}

      {showReply ? (
        <div className="comment-box-container">
          <form method="POST" onSubmit={postReply}>
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

      {/* Display replies */}

      <div className="replies">
        {replyList &&
          replyList.map((reply) => {
            return (
              <Reply
                commentID={reply.commentID}
                username={reply.username}
                createdAt={reply.createdAt}
                content={reply.content}
                points={reply.points}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Comment;
