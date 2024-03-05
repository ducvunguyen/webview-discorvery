import { useEffect, useRef } from 'react';
import classNames from 'classnames';

const Modal = ({ onClose, open, children }) => {
  const _formRef = useRef();

  useEffect(() => {
    document.body.style.overflowY = open ? 'hidden' : 'auto';
  }, [open]);

  return (
    <>
      <div
        className={classNames('fixed z-40 right-0 left-0 w-screen bottom-0 bg-A1-80', {
          'h-screen': open,
          'h-0': !open,
        })}
        onClick={onClose}
      />
      <div
        className="modal-open fixed z-50 right-0 left-0 bottom-0 bg-background rounded-t-lg overflow-hidden"
        style={{
          maxHeight: '100vh',
          height: open ? _formRef.current?.clientHeight : '0',
        }}
      >
        <div ref={_formRef} className="relative">
          {children}
        </div>
      </div>
    </>
  );
};

Modal.defaultProps = {
  onClose: () => {},
  open: false,
};

export default Modal;
