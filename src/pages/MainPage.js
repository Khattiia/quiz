import { useState } from "react";
import { Form, Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Slider from "../components/Slider";
import { auth } from "../util/firebase";

import image1 from "../assets/img1.jpg";
import image2 from "../assets/img2.jpg";
import image3 from "../assets/img3.jpg";
import image4 from "../assets/img4.jpg";
import image5 from "../assets/img5.jpg";
import image6 from "../assets/img6.jpg";

import classes from "./MainPage.module.css";

const MainPage = () => {
  const [searchParams] = useSearchParams();
  const islogin = searchParams.get("mode") === "login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigate();

  const handleEmail = (email) => {
    setEmail(email.target.value);
    setSubmitted(false);
  };

  const handlePassword = (password) => {
    setPassword(password.target.value);
    setSubmitted(false);
  };

  const signInHandler = async (form) => {
    form.preventDefault();
    if (email === "" || password.length < 6) {
      setError(true);
      return;
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (!user) {
      return;
    }

    localStorage.setItem("uid", user.uid);
    navigation("/topics");
  };

  const signUpHandler = async (form) => {
    form.preventDefault();
    if (email === "" || password.length < 6) {
      setError(true);
      return;
    }
    const newUserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const newUser = newUserCredential.user;
    if (!newUser) {
      return;
    }
    localStorage.setItem("uid", newUser.uid);
    console.log(newUser);
    navigation("/topics");
  };

  return (
    <>
      <div>
        <Slider images={[image1, image2, image3, image4, image5, image6]} />
      </div>

      <div className={classes.childrenWrapper}>
        <Form
          method="post"
          onSubmit={islogin ? signInHandler : signUpHandler}
          className={classes.form}
        >
          <p className={classes.actions}>{islogin ? "Log in" : "Sign up"}</p>
          <div>
            <label> Email </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleEmail}
              required
              className={classes.block}
            ></input>
          </div>
          <div>
            <label> password </label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handlePassword}
              required
              className={classes.block}
            ></input>
          </div>
          <div className={classes.actions}>
            <Link to={`?mode=${islogin ? "signup" : "login"}`}>
              {islogin ? "Sign up" : "Login"}
            </Link>

            <button type="submit">submit</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default MainPage;
