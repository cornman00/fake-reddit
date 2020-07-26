import React, { useState } from "react";
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

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <LoginModal />
        <SignupModal />

        <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
            <i className="fas fa-user"></i>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header>MORE STUFF</DropdownItem>
            <DropdownItem>Help Center</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Log In / Sign Up</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
