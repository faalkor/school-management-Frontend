import { ModalOverlay, ModalContent, ModalActions } from './styled';
import PropTypes from 'prop-types';

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
}) {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{title}</h2>
        <p>{message}</p>
        <ModalActions>
          <button className="cancel-btn" onClick={onClose}>
            {cancelText}
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            {confirmText}
          </button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
}

Modal.defaultProps = {
  isOpen: false,
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  confirmText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
};
