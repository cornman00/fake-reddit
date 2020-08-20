import React, { useState } from "react";
import axios from "axios";

const Comment = () => {
  const [newUpVote, setUpVote] = useState(3);
  //   const [upVoteClicked, setUpVoteClicked] = useState(false);

  //   const upVoteComment = (isUpVote) => {
  //     axios
  //       .patch("/posts/upvote", { isUpVote: isUpVote, postID: postID })
  //       .then((res) => res.data)
  //       .then((data) => console.log(data.message));
  //   };

  return (
    <div className="cmt-container">
      <div className="comment-vote-bar">
        <button
          //   onClick={() => {
          //     if (!upVoteClicked) {
          //       setUpVote(upVote + 1);
          //       setUpVoteClicked(true);
          //       upVoteComment(true);
          //     } else {
          //       setUpVote(upVote);
          //       setUpVoteClicked(false);
          //       upVoteComment(false);
          //     }
          //   }}
          className="comment-vote-button"
        >
          <i class="fas fa-arrow-up"></i>
        </button>

        <button
          //   onClick={() => {
          //     if (!upVoteClicked) {
          //       if (upVote > 0) {
          //         setUpVote(upVote - 1);
          //         setUpVoteClicked(true);
          //         upVotePost(false);
          //       }
          //     } else {
          //       setUpVote(upVote);
          //       setUpVoteClicked(false);
          //       upVotePost(true);
          //     }
          //   }}
          className="comment-vote-button"
        >
          <i class="fas fa-arrow-down"></i>
        </button>
      </div>
      <div className="comment-contents">
        <p className="posted-by">
          {/* {username} {createdAt} */}
          willrhee00 37points / 17 hours ago
        </p>
        <p className="comment-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ipsa
        </p>
        <div className="comment-reply">
          <i class="fas fa-comment"></i>Reply
        </div>
      </div>
    </div>
  );
};

export default Comment;
