import PropTypes from 'prop-types';
import { LoadingContainer } from './styled';
import { FaSpinner } from 'react-icons/fa';

export default function Loading({ isLoading }) {
  if (!isLoading) {
    return <></>;
  }
  return (
    <LoadingContainer>
      <div className="loading-content">
        <FaSpinner className="spinner-icon" />
        <span>Loading</span>
      </div>
    </LoadingContainer>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
