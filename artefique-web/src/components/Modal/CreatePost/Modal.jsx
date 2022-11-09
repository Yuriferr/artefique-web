import React from "react";
import './modal.css'

import imgClose from '../../assets/close.png';

export default function Modal({ id = 'modal', onClose = () => { }, children }) {

    function handleOutsideClick(e) {
        if (e.target.id === id) {
            onClose();
        }
    }

    return (
        <div id={id} onClick={handleOutsideClick} className="modal">
            <div className="container">
                <button onClick={onClose} className="modal-close"><img className="img-close" src={imgClose} /></button>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
}