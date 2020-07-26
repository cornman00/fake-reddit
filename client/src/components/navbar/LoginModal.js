import React, { useState } from "react";
import axios from "axios";
import "../../App.scss";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username: username, password: password };

    axios
      .post("/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("usertoken", res.data);
        console.log("Returned User" + user.username);
        console.log(res.error_message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button className="nav-button login-button" color="link" onClick={toggle}>
        LOG IN
      </Button>

      <Modal className="auth-modal" isOpen={modal} toggle={toggle}>
        <ModalHeader className="modal-header" toggle={toggle}>
          Log in
        </ModalHeader>
        <ModalBody className="modal-body">
          <Button color="link" className="google-button">
            <i class="fab fa-google"></i>
            CONTINUE WITH GOOGLE
          </Button>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="input-buttons-wrapper">
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
              className="modal-login-button"
              color="primary"
              onClick={toggle}
            >
              LOG IN
            </Button>
          </form>
          <p className="go-to-signup">New to FakeReddit? SIGN UP </p>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
