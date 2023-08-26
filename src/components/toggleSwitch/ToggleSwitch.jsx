import React, { useState } from 'react';
import classes from "./ToggleSwitch.module.css";

const ToggleSwitch = () => {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <div className={classes.toggleSwitch}>
            <input
                type="checkbox"
                className={classes.toggleCheckbox}
                checked={isOn}
                onChange={handleToggle}
            />
            <label className={classes.toggleLabel}>
                <span className={`{classes.toggleInner ${isOn ? 'on' : 'off'}}`}>{isOn ? 'ON' : 'OFF'}</span>
                <span className={`{classes.toggleSwitch ${isOn ? 'on' : 'off'}}`} />
            </label>
        </div >
    );
};

export default ToggleSwitch;
