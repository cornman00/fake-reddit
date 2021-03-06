import React, { useState } from "react";
import axios from "axios";
import "../../App.scss";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import GoogleLogin from "react-google-login";

const LoginModal = ({ updateToken, logModalToggle, logModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username_error: "",
    password_error: "",
  });

  const handleSubmit = (e) => {
    const isValid = formValidate();
    e.preventDefault();
    if (isValid) {
      axios
        .post("/api/login", {
          username: username,
          password: password,
        })
        .then((res) => res.data)
        .then((data) => {
          if ("error_message" in data) {
            setErrors((prev) => ({
              ...prev,
              ["password_error"]: data.error_message,
            }));
          } else {
            logModalToggle();
            localStorage.setItem("userToken", data.access_token);
            localStorage.setItem("username", data.username);
            updateToken();
            window.location.reload();
          }
        })
        .catch((err) => {
          logModalToggle();
          alert("Sign up failed. Please try again");
          console.log(err);
        });
    }
  };

  const formValidate = () => {
    let isValid = true;
    setErrors({});

    if (!username) {
      setErrors((prev) => ({
        ...prev,
        ["username_error"]: "Empty Username",
      }));
      isValid = false;
    } else if (username.length <= 4 || username.length >= 21) {
      setErrors((prev) => ({
        ...prev,
        ["username_error"]:
          "The length of username should be between 5 and 20.",
      }));
      isValid = false;
    }

    if (!password) {
      setErrors((prev) => ({
        ...prev,
        ["password_error"]: "Empty Password",
      }));
      isValid = false;
    }

    return isValid;
  };

  const googleOnSuccess = (res) => {
    console.log(res);
    const userEmail = res.profileObj.email;
    const parsed_username = userEmail.substring(0, userEmail.indexOf("@"));
    setUsername(parsed_username);
    localStorage.setItem("userToken", res.tokenObj.access_token);
    localStorage.setItem("username", parsed_username);
    updateToken();
    alert("Logged In Successfully");
  };

  const googleOnFailure = (res) => {
    console.log(res);
  };

  return (
    <div>
      <Modal className="auth-modal" isOpen={logModal} toggle={logModalToggle}>
        <ModalHeader className="modal-header" toggle={logModalToggle}>
          Log in
        </ModalHeader>
        <ModalBody className="modal-body">
          <GoogleLogin
            clientId="1087910724182-02v9tf6jm6h867i3vd81rui2dm4b6jvb.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                color="link"
                className="google-button"
              >
                <i className="fab fa-google"></i>
                CONTINUE WITH GOOGLE
              </Button>
            )}
            onSuccess={googleOnSuccess}
            onFailure={googleOnFailure}
            cookiePolicy={"single_host_origin"}
          />
          <form method="POST" onSubmit={handleSubmit} noValidate>
            <div className="input-buttons-wrapper">
              <input
                type="text"
                name="username"
                placeholder="USERNAME"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className="error-message">{errors["username_error"]}</div>
              <input
                type="password"
                name="password"
                placeholder="PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="error-message">{errors["password_error"]}</div>
            </div>
            <Button
              type="submit"
              className="modal-login-button"
              color="primary"
            >
              LOG IN
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
