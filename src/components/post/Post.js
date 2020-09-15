import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommunityBanner from "../home/CommunityBanner";
import axios from "axios";
import LoginModal from "../navbar/LoginModal";
import SignupModal from "../navbar/SignupModal";
import Comment from "./Comment";
import { Button } from "reactstrap";

const Post = () => {
  const [newUpVote, setUpVote] = useState(0);
  const [upVoteClicked, setUpVoteClicked] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [numComments, setNumComments] = useState(0);
  const [logModal, setLogModal] = useState(false);
  const [signModal, setSignModal] = useState(false);
  const [comment_content, setCommentContent] = useState("");
  const [commentList, setCommentList] = useState([]);
  const postID = useParams().postID;
  const upVote = newUpVote;

  useEffect(() => {
    const getPost = () => {
      axios
        .get("/api/post", { params: { postID: postID } })
        .then((res) => res.data)
        .then((data) => {
          let post = data.post;
          setUsername(post.username);
          setUpVote(post.upVote);
          setTitle(post.title);
          setContent(post.content);
          setCreatedAt(post.createdAt);
        })
        .catch((err) => console.log("Post Load Error"));
    };
    getPost();

    const getComment = () => {
      axios
        .get("/api/get_comment", {
          params: { postID: postID },
        })
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          setCommentList(data.comments);
          setNumComments(data.numComments.num_of_comments);
        })
        .catch((err) => console.log(err));
    };
    getComment();
  }, []);

  const postComment = (e) => {
    e.preventDefault();
    console.log(`POST operation comment ${postID}`);
    axios
      .post("/api/post_comment", {
        username: localStorage.getItem("username"),
        content: comment_content,
        postID: postID,
      })
      .then(window.location.reload())
      .catch((err) => console.log(err));
  };

  const logModalToggle = () => setLogModal(!logModal);

  const signModalToggle = () => setSignModal(!signModal);

  const upVotePost = (isUpVote) => {
    axios
      .patch("/api/posts/upvote", { isUpVote: isUpVote, postID: postID })
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
          <div className="post-contents">
            <p className="posted-by">
              Posted by u/{username} {createdAt}
            </p>
            <p className="post-title">{title}</p>
            <p className="post-content">{content}</p>
            <div className="summary-functions">{numComments} Comments</div>
            {localStorage.getItem("userToken") ? (
              <div className="comment-box-container">
                <form method="POST" onSubmit={postComment}>
                  <textarea
                    className="comment-box"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="What are your thoughts?"
                    onChange={(e) => {
                      setCommentContent(e.target.value);
                    }}
                  ></textarea>
                  <div id="cmt-btn-container">
                    <Button
                      type="submit"
                      color="primary"
                      id="comment-btn"
                      disabled={!comment_content}
                    >
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
          {commentList &&
            commentList.map((comment) => {
              return (
                <Comment
                  key={comment.commentID}
                  commentID={comment.commentID}
                  username={comment.username}
                  createdAt={comment.createdAt}
                  content={comment.content}
                  points={comment.points}
                  postID={postID}
                />
              );
            })}
        </div>
      </div>

      <div className="post-right-container">
        <CommunityBanner />
      </div>
    </div>
  );
};

export default Post;
