import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 5px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;

export const Tabs = styled.div`
  display: flex;
  border-bottom: 2px solid ${colors.lightColor};
  margin-bottom: 20px;
`;

export const Tab = styled.button`
  padding: 12px 24px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) =>
    props.$active ? colors.primaryColor : colors.lightColor};
  border-bottom-color: ${(props) =>
    props.$active ? colors.primaryColor : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    color: ${colors.primaryColor};
    background: #f9f9f9;
  }
`;

export const TabContent = styled.div``;
