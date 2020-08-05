import React, { useState, useEffect } from "react";
import "../../App.scss";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

  console.log(token);

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
        {!token ? (
          <>
            <LoginModal updateToken={updateToken} />
            <SignupModal updateToken={updateToken} />
          </>
        ) : (
          <div></div>
        )}
        <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle className="dropdown-toggle">
            {!username ? (
              <i className="fas fa-user"></i>
            ) : (
              <>
                <span>
                  <i className="fas fa-user"></i>
                </span>
                <span>
                  <p>{username}</p>
                </span>
              </>
            )}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header>MORE STUFF</DropdownItem>
            <DropdownItem>Help Center</DropdownItem>
            <DropdownItem divider />
            {!token ? (
              <DropdownItem>Log In / Sign Up</DropdownItem>
            ) : (
              <DropdownItem onClick={logOut}>Log Out</DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
