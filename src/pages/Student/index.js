import { Container } from '../../styles/GlobalStyles';
import { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { isEmail, isDate } from 'validator';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Form, ProfilePicture, Title } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';

export default function Student({ match }) {
  const id = get(match, 'params.id', null);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [bornDate, setBornDate] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);

        const response = await axios.get(`/alunos/${id}`);
        const photo = get(response.data, 'Photos[0].url', '');

        setName(response.data.nome);
        setLastName(response.data.sobrenome);
        setEmail(response.data.email);
        setBornDate(response.data.data_nascimento);
        setPhotoUrl(photo);
      } catch (err) {
        const errors = get(err, 'response.data.errors', null);
        if (errors) {
          errors.forEach((error) => toast.error(error));
        } else {
          toast.error('Error loading student data');
        }

        history.push('/');
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Name must be between 3 and 255 characters');
    }

    if (lastName.length < 3 || lastName.length > 255) {
      formErrors = true;
      toast.error('Last name must be between 3 and 255 characters');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid email');
    }

    if (!isDate(bornDate)) {
      formErrors = true;
      toast.error('Invalid born date');
    }

    if (formErrors) return;

    try {
      setIsLoading(true);

      if (id) {
        // Edit student
        await axios.put(`/alunos/${id}`, {
          nome: name,
          sobrenome: lastName,
          email,
          data_nascimento: bornDate,
        });
        toast.success('Student edited successfully');
      } else {
        // Create student
        const { data } = await axios.post('/alunos', {
          nome: name,
          sobrenome: lastName,
          email,
          data_nascimento: bornDate,
        });
        history.push(`/student/${data.id}/edit`);
        toast.success('Student created successfully');
      }
    } catch (err) {
      const errors = get(err, 'response.data.errors', null);
      if (errors) {
        errors.forEach((error) => toast.error(error));
      } else {
        toast.error('Error while updating/creating student');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>{id ? 'Edit student' : 'New student'}</Title>

      {id && (
        <ProfilePicture>
          {photoUrl ? (
            <img src={photoUrl} alt={name} />
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/photos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Student name"
          />
        </label>

        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Student last name"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Student email"
          />
        </label>

        <label htmlFor="bornDate">
          Born Date:
          <input
            type="date"
            value={bornDate}
            onChange={(e) => setBornDate(e.target.value)}
            placeholder="Student born date"
          />
        </label>

        <button type="submit">{id ? 'Save' : 'Register'}</button>
      </Form>
    </Container>
  );
}

Student.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
