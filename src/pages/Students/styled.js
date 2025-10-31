import styled from 'styled-components';

import * as colors from '../../config/colors';

export const StudentContainer = styled.div`
  margin-top: 20px;

  div {
    display: grid;
    grid-template-columns: 50px 2fr 2.5fr 40px 40px;
    align-items: center;
    gap: 20px;
    padding: 5px 0;
  }

  div + div {
    border-top: 1px solid #eee;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  .add-student-link {
    background: ${colors.primaryColor};
    color: white;
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${colors.primaryDarkColor};
    }
  }
`;
