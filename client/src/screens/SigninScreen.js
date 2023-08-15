import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import Axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Store } from "../Store";

export default function SigninScreen() {
  // useNavigate hook to navigate
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  // useState hook to store the email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // access the state and dispatch from the store
  const { state, dispatch: ctxDispatch } = useContext(Store);
  // deconstruct user info from state
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // post request for email and password to backend, get the response and extract data from the response
      const { data } = await Axios.post("/api/users/signin", {
        email,
        password,
      });
      // dispatch the data, set the type of action and payload
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      // store the data in local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      // call the navigate hook to navigate URL if it doesnt exist, go to homepage
      navigate(redirect || "/");
    } catch (err) {
      // if error, display error message
      alert("Invalid email or password");
    }
  };

  useEffect(() => {
    // if user is already logged in, redirect to homepage
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}
