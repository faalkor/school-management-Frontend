import styled from 'styled-components';

import * as colors from '../../config/colors';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${colors.overlayColor};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px ${colors.borderColor};
  max-width: 400px;
  width: 90%;

  h2 {
    margin-bottom: 1rem;
    color: ${colors.primaryColor};
  }

  p {
    margin-bottom: 2rem;
    color: ${colors.grayTextColor};
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: filter 0.2s;

    &.cancel-btn {
      background: ${colors.grayButtonColor};
      color: white;

      &:hover {
        filter: brightness(0.8);
      }
    }

    &.confirm-btn {
      background: ${colors.deleteButtonColor};
      color: white;

      &:hover {
        filter: brightness(0.8);
      }
    }
  }
`;
