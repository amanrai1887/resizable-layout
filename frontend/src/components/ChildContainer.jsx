import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import './Layout.css';

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
      const response = await axios.get(
        `http://localhost:3000/api/component/${id}`
      );
      const data = response.data.component?.component_has_data[0]?.data;
      updateDOM(data, response.data.component.count);
      setExistingData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdd = async () => {
    setInputValue('');
    setShowInput(true);
    updateDOM('', apiCount);
  };

  const handleUpdate = async () => {
    setInputValue(existingData);
    setShowInput(true);
  };

  const handleSubmit = async () => {
    try {
      if (inputValue.trim() !== '') {
        if (showInput) {
          await axios.post(`http://localhost:3000/api/component/add`, {
            data: inputValue,
            uuid: id,
          });
        } else {
          await axios.put(`http://localhost:3000/api/component/update`, {
            data: inputValue,
            uuid: id,
          });
        }
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
    }
  };

  const updateDOM = (data, count) => {
    document.getElementById('data-' + id).innerText = data;
    document.getElementById('count-' + id).innerText = 'API Calls: ' + count;
  };

  return (
    <div className={`child ${name}`}>
      <div className='data-container'>
        <h3 id={'data-' + id}></h3>
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
        <h4 id={'count-' + id}>API Calls: {apiCount}</h4>
      </div>
    </div>
  );
};

export default ChildContainer;
