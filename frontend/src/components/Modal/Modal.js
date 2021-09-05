import React from 'react';

import './Modal.css'

const Modal = ({ title, children, onCancel, onConfirm }) => (
    <div className="modaol">
        <header>{title}</header>
        <section className="modal__content">
            {children}
        </section>
        <section className="modal__content">
            {onCancel && <button className="modal__btn btn" onClick={onCancel}>Cancel</button>}
            {onConfirm && <button className="modal__btn btn" onClick={onConfirm}>Confirm</button>}
        </section>
    </div>
)

export default Modal