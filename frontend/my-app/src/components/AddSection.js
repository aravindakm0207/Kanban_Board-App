import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSection } from '../redux/actions/sectionActions';

const AddSection = () => {
    const [title, setTitle] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            dispatch(createSection(title));
            setTitle('');
            setIsFormVisible(false);
        }
    };

    const handleToggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div className="add-section-container">
            {!isFormVisible ? (
                <button onClick={handleToggleForm}>+ Add Section</button>
            ) : (
                <form onSubmit={handleSubmit} className="add-section">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="New Section Title"
                        autoFocus
                    />
                    <button type="submit">Create Section</button>
                    <button type="button" onClick={handleToggleForm}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default AddSection;