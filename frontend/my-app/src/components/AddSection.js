import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSection } from '../redux/actions/sectionActions';

const AddSectionForm = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addSection(title)); 
      setTitle('');
      setError('');
    } catch (err) {
      setError('Failed to add section. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Add new section" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <button type="submit">Add Section</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
    </form>
  );
};

export default AddSectionForm;
