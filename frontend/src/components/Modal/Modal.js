import React from 'react';

import './Modal.css'

const Modal = ({ title, children, onCancel, onConfirm }) => (
    <div className="modal">
        <header className="modal__header"r>{title}</header>
        <section className="modal__content">
            {children}
        </section>
        <section className="modal__actions">
            {onCancel && <button className="modal__btn btn" onClick={onCancel}>Cancel</button>}
            {onConfirm && <button className="modal__btn btn" onClick={onConfirm}>Confirm</button>}
        </section>
    </div>
)

export default Modal