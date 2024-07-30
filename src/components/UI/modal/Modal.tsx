import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  modalText: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  modalText,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={classes.modal_overlay}>
      <div className={classes.modal_content}>
        <p>{modalText}</p>
        <button onClick={onClose} className={classes.close_button}>
          Cancel
        </button>
        <button onClick={onConfirm} className={classes.close_button}>
          Confirm
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
