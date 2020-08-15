import React, { useState } from "react";
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

  const upVotePost = (isUpVote) => {
    axios
      .patch("/posts/upvote", { isUpVote: isUpVote, postID: postID })
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
          <i class="fas fa-arrow-up"></i>
        </button>
        {newUpVote === 0 ? <i class="fas fa-circle "></i> : newUpVote}
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
          <i class="fas fa-arrow-down"></i>
        </button>
      </div>
      <div className="summary-contents">
        <p className="posted-by">
          Posted by u/{username} {createdAt}
        </p>
        <p className="post-summary-title">{title}</p>
        <p className="post-summary">{content}</p>
        <div className="summary-functions">{comments_num} Comments</div>
      </div>
    </div>
  );
};

export default PostSummary;
