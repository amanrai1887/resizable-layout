import React, { useEffect } from 'react';
import { Button } from '@mui/material'; //
import axios from 'axios';
import './Layout.css';

const ChildContainer = ({ id, name }) => {
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/component/${id}`
      );
      updateDOM(response.data.component?.component_has_data[0]?.data, response.data.component.count);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(`http://localhost:3000/api/component/add`, {
        data: document.getElementById('textarea-' + id).value,
        uuid: id,
      });
      fetchData();
      resetTextarea();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/component/update`, {
        data: document.getElementById('textarea-' + id).value,
        uuid: id,
      });
      fetchData();
      resetTextarea();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const updateDOM = (data, count) => {
    document.getElementById('data-' + id).innerText = data;
    document.getElementById('count-' + id).innerText = 'API Calls: ' + count;
  };

  const resetTextarea = () => {
    document.getElementById('textarea-' + id).value = '';
  };

  return (
    <div className={`child ${name}`}>
      <div className='data-container'>
        <h3 id={'data-' + id}></h3>
      </div>
      <div className='input-container'>
        <textarea
          id={'textarea-' + id}
          className='input-textarea'
          placeholder='Enter your text here...'
        />
        <div className='button-container'>
          <Button className='btn' variant='contained' onClick={handleAdd}>
            Add
          </Button>
          <Button className='btn' variant='contained' onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </div>
      <div className='count-container'>
        <h4 id={'count-' + id}></h4>
      </div>
    </div>
  );
};

export default ChildContainer;
