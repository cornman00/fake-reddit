import React from "react";

const Header = () => {
  return (
    <div className="subreddit-header-container">
        <img
          className="header-image"
          src="images/header-school.png"
          alt="Header"
        />
      <div className="subreddit-bottom-container">
        <div className="icon-container">
          <i className="fas fa-university"></i>
        </div>
        <div className="title-container">
          <h3 className="subreddit-title">
            The University of Illinois at Urbana-Champaign
          </h3>
          <h6 className="subreddit-url">r/UIUC</h6>
        </div>
      </div>
    </div>
  );
};

export default Header;
