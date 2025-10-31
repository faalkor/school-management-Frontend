import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 10px;
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #ddd;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;

export const RegisterLink = styled.div`
  text-align: center;
  margin-top: 10px;
  padding: 15px;
  border-top: 1px solid #eee;

  a {
    color: ${colors.primaryColor};
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;
