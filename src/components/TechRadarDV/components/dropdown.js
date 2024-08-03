// Dropdown.js
import React, { useState } from 'react';

const Dropdown = ({ options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        onSelect(value);
    };

    return (
        <div>
            <select value={selectedOption} onChange={handleChange}>
                <option value="" disabled>Select an option</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {selectedOption && <p>Selected: {selectedOption}</p>}
        </div>
    );
};

export default Dropdown;
