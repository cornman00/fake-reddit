import React, { useState } from "react";
import axios from "axios";
import "../../App.scss";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useHistory } from "react-router-dom";

const SignupModal = () => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  // let history = useHistory();

  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    e.preventDefault();
    const new_user = { email: email, username: username, password: password };

    axios
      .post("/signup", {
        email: email,
        username: username,
        password: password,
      })
      .then((res) => {
        alert("Successfully signed up");
        console.log("New User: " + new_user.username);
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button
        className="nav-button singup-button"
        color="primary"
        onClick={toggle}
      >
        SIGN UP
      </Button>
      <Modal className="auth-modal" isOpen={modal} toggle={toggle}>
        <ModalHeader className="modal-header" toggle={toggle}>
          Sign up
        </ModalHeader>
        <ModalBody className="modal-body">
          <Button color="link" className="google-button">
            <i class="fab fa-google"></i>
            CONTINUE WITH GOOGLE
          </Button>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="input-buttons-wrapper">
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                name="username"
                placeholder="USERNAME"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="modal-signup-button"
              color="primary"
              onClick={toggle}
            >
              SIGN UP
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SignupModal;
