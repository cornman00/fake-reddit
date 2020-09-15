import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import CommunityBanner from "./CommunityBanner";
import PostSummary from "../post/PostSummary";
import PostButton from "./PostButton";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => res.data)
      .then((data) => {
        setPosts(data.post_arr);
      });
  }, []);

  return (
    <div className="main-container">
      <Header />
      <div className="contents">
        <div className="left-contents">
          {localStorage.getItem("userToken") ? <PostButton /> : <div></div>}
          {posts &&
            posts.map((post) => {
              return (
                <PostSummary
                  key={post.postID}
                  postID={post.postID}
                  title={post.title}
                  content={post.content}
                  username={post.username}
                  comments_num={post.num_of_comments}
                  createdAt={post.createdAt}
                  upVote={post.upVote}
                />
              );
            })}
        </div>
        <CommunityBanner />
      </div>
    </div>
  );
};

export default Home;
