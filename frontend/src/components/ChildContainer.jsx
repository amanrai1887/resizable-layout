import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import './Layout.css';

const API_URL = 'https://resizable-layout.onrender.com/api/component';

const ChildContainer = ({ id, name }) => {
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [existingData, setExistingData] = useState('');
  const [apiCount, setApiCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      const data = response.data.component?.component_has_data[0]?.data;
      setExistingData(data);
      updateDOM(data, response.data.component.count);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdd = () => {
    setInputValue('');
    setShowInput(true);
    updateDOM('', apiCount);
  };

  const handleUpdate = () => {
    setInputValue(existingData);
    setShowInput(true);
  };

  const handleSubmit = async () => {
    try {
      if (inputValue.trim() !== '') {
        const endpoint = showInput ? 'add' : 'update';
        await axios[showInput ? 'post' : 'put'](`${API_URL}/${endpoint}`, {
          data: inputValue,
          uuid: id,
        });
        fetchData();
        setInputValue('');
        setShowInput(false);
        setApiCount(apiCount + 1);
        setError('');
      } else {
        setError('Please enter some data');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  const updateDOM = (data, count) => {
    setExistingData(data);
    setApiCount(count);
  };

  return (
    <div className={`child ${name}`}>
      <div className='data-container'>
        <h3>{existingData}</h3>
      </div>
      <div className='input-container'>
        {showInput && (
          <>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className='input-textarea'
              placeholder='Enter your text here...'
            />
            {error && <p className="error-message">{error}</p>}
            <Button className='submit-btn' variant='contained' onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}
        {!showInput && (
          <div className='button-container'>
            <Button className='btn' variant='contained' onClick={handleAdd}>
              Add
            </Button>
            <Button className='btn' variant='contained' onClick={handleUpdate}>
              Update
            </Button>
          </div>
        )}
      </div>
      <div className='count-container'>
        <h4>API Calls: {apiCount}</h4>
      </div>
    </div>
  );
};

export default ChildContainer;
