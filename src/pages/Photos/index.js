import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';

import { useState, useEffect } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default function Photos({ match }) {
  const id = get(match, 'params.id', null);
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);

        const photos = get(data, 'Photos', []);
        if (photos.length > 0) {
          setPhoto(photos[0].url);
        }

        setIsLoading(false);
      } catch {
        toast.error('Error loading photo');
        setIsLoading(false);
        history.push('/');
      }
    };

    getData();
  }, [id]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setPhoto(fileURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('photo', file);

    try {
      setIsLoading(true);
      await axios.post('/photos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsLoading(false);
      toast.success('Photo uploaded successfully');
      history.push(`/student/${id}/edit`);
    } catch {
      setIsLoading(false);
      toast.error('Error uploading photo');
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Photos</Title>

      <Form>
        <label htmlFor="picture">
          {photo ? <img src={photo} alt="Photo" /> : 'Select'}
          <input type="file" id="picture" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Photos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
