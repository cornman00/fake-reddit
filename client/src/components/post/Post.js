import React, { useState } from "react";
import CommunityBanner from "../home/CommunityBanner";
import axios from "axios";
import LoginModal from "../navbar/LoginModal";
import SignupModal from "../navbar/SignupModal";
import Comment from "./Comment";
import { Button } from "reactstrap";

const Post = ({
  postID,
  title,
  content,
  user_name,
  comments_num,
  createdAt,
  upVote,
}) => {
  const [newUpVote, setUpVote] = useState(3);
  const [upVoteClicked, setUpVoteClicked] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [logModal, setLogModal] = useState(false);
  const [signModal, setSignModal] = useState(false);

  const logModalToggle = () => setLogModal(!logModal);

  const signModalToggle = () => setSignModal(!signModal);

  const upVotePost = (isUpVote) => {
    axios
      .patch("/posts/upvote", { isUpVote: isUpVote, postID: postID })
      .then((res) => res.data)
      .then((data) => console.log(data.message));
  };

  const updateToken = () => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
      setUsername(localStorage.getItem("username"));
    }
  };

  return (
    <div className="post-main-container">
      <div className="post-left-container">
        <div className="content-box">
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
          <div className="post-contents">
            <p className="posted-by">Posted by u/username createdAt</p>
            <p className="post-title">First Post</p>
            <p className="post-content">
              sadlfjad Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Modi molestiae reiciendis a magni cum sequi rem vel illum rerum
              itaque, saepe ex odio dolorum error obcaecati corporis at incidunt
              dolorem. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Impedit recusandae amet cum aspernatur doloribus quo consequuntur,
              fugit cumque unde dolor iusto quidem? Reiciendis nihil eveniet,
              hic obcaecati omnis temporibus dolorem modi? Sequi repudiandae
              asperiores accusantium qui eaque nam consectetur quia enim
              commodi, natus dignissimos nesciunt dicta inventore ipsum voluptas
              corporis!
            </p>
            <div className="summary-functions">40 Comments</div>
            {localStorage.getItem("userToken") ? (
              <div className="comment-box-container">
                <form method="POST">
                  <textarea
                    className="comment-box"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="What are your thoughts?"
                  ></textarea>
                  <div id="cmt-btn-container">
                    <Button type="submit" color="primary" id="comment-btn">
                      COMMENT
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="comment-box-container2">
                <p>Log in or sign up to leave a comment</p>
                <div id="comment-btn2">
                  <Button
                    className="nav-button login-button"
                    color="link"
                    onClick={logModalToggle}
                  >
                    LOG IN
                  </Button>
                  <Button
                    className="nav-button signup-button"
                    color="primary"
                    onClick={signModalToggle}
                  >
                    SIGN UP
                  </Button>
                  <LoginModal
                    updateToken={updateToken}
                    logModalToggle={logModalToggle}
                    logModal={logModal}
                  />
                  <SignupModal
                    updateToken={updateToken}
                    signModalToggle={signModalToggle}
                    signModal={signModal}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="comment-container">
          <div id="hrLine"></div>
          <Comment />
        </div>
      </div>

      <div className="post-right-container">
        <CommunityBanner />
      </div>
    </div>
  );
};

export default Post;
