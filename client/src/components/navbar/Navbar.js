import React, { useState } from "react";
import "../../App.scss";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

  const updateToken = () => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
      setUsername(localStorage.getItem("username"));
    }
  };

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  let isLoggedIn = localStorage.getItem("userToken");
  let user_name = localStorage.getItem("username");

  return (
    <nav className="nav-container">
      <Link className="page-title" to="/">
        <i className="fa fa-reddit" aria-hidden="true"></i>
        <p className="nav-title">FakeReddit</p>
      </Link>

      <form className="search-bar-container">
        <i className="fas fa-search"></i>
        <input
          className="search-bar"
          name="search"
          type="search"
          placeholder="Search"
        />
      </form>

      <div className="button-container">
        {isLoggedIn === null ? (
          <>
            <LoginModal updateToken={updateToken} />
            <SignupModal updateToken={updateToken} />
          </>
        ) : (
          <div></div>
        )}

        <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle className="dropdown-toggle">
            {isLoggedIn === null ? (
              <i className="fas fa-user"></i>
            ) : (
              <>
                <span>
                  <i className="fas fa-user"></i>
                </span>
                <span>
                  <p>{user_name}</p>
                </span>
              </>
            )}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header>MORE STUFF</DropdownItem>
            <DropdownItem>
              <a
                id="help-tag"
                href="https://www.reddithelp.com/hc/en-us"
                target="_blank"
                rel="noopener noreferrer"
              >
                Help Center
              </a>
            </DropdownItem>
            <DropdownItem divider />
            {isLoggedIn === null ? (
              <DropdownItem>Log In / Sign Up</DropdownItem>
            ) : (
              <DropdownItem onClick={logOut}>
                <Link to="/" className="logout-button">
                  Log Out
                </Link>
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
