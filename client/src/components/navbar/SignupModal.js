import React, { useState } from "react";
import axios from "axios";
import "../../App.scss";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import GoogleLogin from "react-google-login";
import { emailCheck } from "../../utilFunctions";

const SignupModal = ({ updateToken }) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({
    username_error: "",
    email_error: "",
    password1_error: "",
    password2_error: "",
  });

  const toggle = () => setModal(!modal);

  const handleSubmit = (e) => {
    const isValid = formValidate();
    e.preventDefault();

    if (isValid) {
      axios
        .post("/signup", {
          email: email,
          username: username,
          password: password1,
        })
        .then((res) => {
          toggle();
          alert("Successfully signed up\nPlease Log in");
          console.log("New User: " + username);
        })
        .catch((err) => {
          toggle();
          alert("Sign up failed. Please try again later");
          console.log(err);
        });
    }
  };

  const formValidate = () => {
    let isValid = true;
    setErrors({});

    if (!email) {
      setErrors((prev) => ({ ...prev, ["email_error"]: "Empty Email" }));
      isValid = false;
    } else if (!emailCheck(email)) {
      setErrors((prev) => ({ ...prev, ["email_error"]: "Email Not Valid" }));
      isValid = false;
    }

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

    if (!password1) {
      setErrors((prev) => ({
        ...prev,
        ["password1_error"]: "Empty Password",
      }));
      isValid = false;
    }

    if (!password2) {
      setErrors((prev) => ({
        ...prev,
        ["password2_error"]: "Empty Password",
      }));
      isValid = false;
    } else if (password1 !== password2) {
      setErrors((prev) => ({
        ...prev,
        ["password2_error"]: "Password Not Matched",
      }));
      isValid = false;
    }

    return isValid;
  };

  const googleOnSuccess = (res) => {
    console.log(res);
    const userEmail = res.profileObj.email;
    const parsed_username = userEmail.substring(0, userEmail.indexOf("@"));
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
      <Button
        className="nav-button signup-button"
        color="primary"
        onClick={() => {
          toggle();
          setErrors({});
        }}
      >
        SIGN UP
      </Button>
      <Modal className="auth-modal" isOpen={modal} toggle={toggle}>
        <ModalHeader className="modal-header" toggle={toggle}>
          Sign up
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
                type="email"
                name="email"
                placeholder="EMAIL"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="error-message">{errors["email_error"]}</div>
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
                name="password1"
                placeholder="PASSWORD"
                onChange={(e) => setPassword1(e.target.value)}
                required
              />
              <div className="error-message">{errors["password1_error"]}</div>
              <input
                type="password"
                name="password2"
                placeholder="Confirm Password"
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
              <div className="error-message">{errors["password2_error"]}</div>
            </div>
            <Button
              type="submit"
              className="modal-signup-button"
              color="primary"
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
