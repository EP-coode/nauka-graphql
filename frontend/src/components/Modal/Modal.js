import React from 'react';

import './Modal.css'

const Modal = ({ title, children, onCancel, onConfirm, cancelText = "Cancel", confirmText = "Confirm" }) => (
    <div className="modal">
        <header className="modal__header">{title}</header>
        <section className="modal__content">
            {children}
        </section>
        <section className="modal__actions">
            {onCancel && <button className="modal__btn btn" onClick={onCancel}>{cancelText}</button>}
            {onConfirm && <button className="modal__btn btn" onClick={onConfirm}>{confirmText}</button>}
        </section>
    </div>
)

export default Modal