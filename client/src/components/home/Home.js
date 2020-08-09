import React from "react";
import Header from "./Header";
import CommunityBanner from "./CommunityBanner";
import PostSummary from "./PostSummary";
import PostButton from "./PostButton";

const Home = () => {
  return (
    <div className="main-container">
      <Header />
      <div className="contents">
        <div className="left-contents">
          <PostButton />
          <PostSummary
            title={"this is a title"}
            content={
              "this is a content.adsilfj;aldsjflkajsdlfkjalsdkjflkajsdlfjaskdjfhkl"
            }
            username={"admin"}
            comments_num={40}
          />
        </div>
        <CommunityBanner />
      </div>
    </div>
  );
};

export default Home;
