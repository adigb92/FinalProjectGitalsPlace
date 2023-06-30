import React, { FunctionComponent, MouseEvent } from 'react';

interface ModalProps {
    onClose: () => void;
    children?: React.ReactNode;
}

const Modal: FunctionComponent<ModalProps> = ({ onClose, children }) => {
    const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        <div onClick={onClose} style={overlayStyle}>
            <div onClick={handleModalClick} style={modalStyle}>
                {children}
            </div>
        </div>
    );
};

const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '1rem',
    minWidth: '20rem',
};

export default Modal;
