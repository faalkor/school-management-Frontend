import { useState } from 'react';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import history from '../../services/history';
import { Form } from './styled';
import Loading from '../../components/Loading';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    formValidation();
  }

  async function formValidation() {
    const errors = [];

    if (name.length < 3 || name.length > 255) {
      errors.push('Name must be between 3 and 255 characters');
    }

    if (!isEmail(email)) {
      errors.push('Invalid email');
    }

    if (password.length < 6 || password.length > 50) {
      errors.push('Password must be between 6 and 50 characters');
    }

    // Show errors
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    try {
      setLoading(true);
      await axios.post('/users/', {
        nome: name,
        email,
        tipo: 'coordenador',
        password,
      });

      setLoading(false);
      toast.success('Account created successfully! You can now log in.');
      history.push('/login');
    } catch (e) {
      setLoading(false);
      const errors = get(e, 'response.data.errors', []);

      errors.forEach((error) => toast.error(error));
    }
  }

  return (
    <Container>
      <Loading isLoading={loading} />

      <h1>Registration</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </label>

        <button type="submit">Create account</button>
      </Form>
    </Container>
  );
}
