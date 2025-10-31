import { useEffect, useState } from 'react';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import history from '../../services/history';
import { Form, Tabs, Tab, TabContent } from './styled';
import Loading from '../../components/Loading';
import {
  editPasswordRequest,
  editUserRequest,
} from '../../store/modules/user/slice';

export default function EditUser() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);

  const id = useSelector((state) => state.auth.user.id);
  const nameStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (!id) {
      toast.error('You need to be logged in to access this page.');
      history.push('/login');
      return;
    }

    setName(nameStored);
    setEmail(emailStored);
  }, [id, nameStored, emailStored]);

  async function handleProfileSubmit(e) {
    e.preventDefault();

    const errors = [];

    if (name.length < 3 || name.length > 255) {
      errors.push('Name must be between 3 and 255 characters');
    }

    if (!isEmail(email)) {
      errors.push('Invalid email');
    }

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    dispatch(editUserRequest({ name, email }));

    // try {
    //   setLoading(true);
    //   await axios.put('/users/', {
    //     nome: name,
    //     email,
    //   });

    //   setLoading(false);
    //   toast.success('Profile updated successfully!');
    // } catch (e) {
    //   setLoading(false);
    //   const errors = get(e, 'response.data.errors', []);
    //   errors.forEach((error) => toast.error(error));
    // }
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();

    const errors = [];

    if (!currentPassword) {
      errors.push('Current password is required');
    }

    if (newPassword.length < 6 || newPassword.length > 50) {
      errors.push('New password must be between 6 and 50 characters');
    }

    if (newPassword !== confirmPassword) {
      errors.push('New passwords do not match');
    }

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    dispatch(editPasswordRequest({ currentPassword, newPassword }));

    // try {
    //   setLoading(true);
    //   await axios.put('/users/password', {
    //     current_password: currentPassword,
    //     new_password: newPassword,
    //   });

    //   setLoading(false);
    //   toast.success('Password updated successfully!');
    //   setCurrentPassword('');
    //   setNewPassword('');
    //   setConfirmPassword('');
    // } catch (e) {
    //   setLoading(false);
    //   const errors = get(e, 'response.data.errors', []);
    //   errors.forEach((error) => toast.error(error));
    // }
  }

  return (
    <Container>
      <Loading isLoading={loading} />

      <h1>Edit account</h1>

      <Tabs>
        <Tab
          $active={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </Tab>

        <Tab
          $active={activeTab === 'password'}
          onClick={() => setActiveTab('password')}
        >
          Change Password
        </Tab>
      </Tabs>

      <TabContent>
        {activeTab === 'profile' && (
          <Form onSubmit={handleProfileSubmit}>
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

            <button type="submit">Update Profile</button>
          </Form>
        )}

        {activeTab === 'password' && (
          <Form onSubmit={handlePasswordSubmit}>
            <label htmlFor="currentPassword">
              Current Password:
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
              />
            </label>

            <label htmlFor="newPassword">
              New Password:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </label>

            <label htmlFor="confirmPassword">
              Confirm New Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </label>

            <button type="submit">Change Password</button>
          </Form>
        )}
      </TabContent>
    </Container>
  );
}
