// ThreeDotsMenu.js
import React, { useState } from 'react';

const ThreeDotsMenu = ({ onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="three-dots-menu">
            <span onClick={() => setIsOpen(!isOpen)}>⋮</span>
            {isOpen && (
                <div className="menu-options">
                    <button onClick={() => { onEdit(); setIsOpen(false); }}>Edit</button>
                    <button onClick={() => { onDelete(); setIsOpen(false); }}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default ThreeDotsMenu;
