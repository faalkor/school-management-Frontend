import styled from 'styled-components';
import { primaryColor, lightColor } from '../../config/colors';

export const Nav = styled.nav`
  background: ${primaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: ${lightColor};
    margin: 0 10px 0 0;
    font-weight: bold;
    align-items: center;
    display: flex;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const LogoutButton = styled.button.attrs({
  className: 'nav-button',
})`
  color: ${lightColor};
  margin: 0 10px 0 0;
  align-items: center;
  display: flex;

  &:hover {
    opacity: 0.7;
  }
`;
