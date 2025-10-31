import { useState } from 'react';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import history from '../../services/history';
import { Form, RegisterLink } from './styled';
import { loginRequest } from '../../store/modules/auth/slice';
import Loading from '../../components/Loading';

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    loginValidation();
  };

  async function loginValidation() {
    const errors = [];

    if (!isEmail(email)) {
      errors.push('Invalid email');
    }

    if (password.length < 6 || password.length > 50) {
      errors.push('Invalid password');
    }

    // Show errors
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    dispatch(loginRequest({ email, password }));
  }

  return (
    <Container>
      <Loading isLoading={loading} />

      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button disabled={loading}>Enter</button>

        <RegisterLink>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </RegisterLink>
      </Form>
    </Container>
  );
}
