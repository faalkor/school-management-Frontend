import styled from 'styled-components';
import * as colors from '../../config/colors';
export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${colors.overlayColor};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;

  .loading-content {
    background: white;
    padding: 2rem 3rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .spinner-icon {
    font-size: 2rem;
    color: ${colors.primaryColor};
    animation: spin 1.5s linear infinite;
  }

  span {
    font-size: 1rem;
    color: ${colors.primaryDarkColor};
    font-weight: 500;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
