import React from 'react';

import './Switch.css'


const Switch = ({ value, onToggle, text = "example" }) => {
    let classList = "switch";
    if (value) {
        classList += " --on"
    }
    return (
        <label className={classList} onClick={onToggle}>

        </label>
    )
}

export default Switch