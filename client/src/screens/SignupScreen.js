import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';

export default function SignupScreen() {
    // useNavigate hook to navigate
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  // useState hook to store the users name, email, and password
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // access the state and dispatch from the store
  const { state, dispatch: ctxDispatch } = useContext(Store);
  // deconstruct user info from state
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
        // post request for email and password to backend, get the response and extract data from the response
      const { data } = await Axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      
      // dispatch the data, set the type of action and payload
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      // store the data in local storage
      localStorage.setItem('userInfo', JSON.stringify(data));
      // call the navigate hook to navigate URL if it doesnt exist, go to homepage
      navigate(redirect || '/');
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
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" onChange={(e) => setConfirmPassword(e.target.value)} required/>
          </Form.Group>
        </Form.Group>

        <div className="mb-3"><Button type="submit">Sign Up</Button></div>
        <div className="mb-3">
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
        </div>
      </Form>
    </Container>
  );
}