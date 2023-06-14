import React, { useState } from 'react';
import HouseDataService from '../services/HouseService';
import { Link } from 'react-router-dom';

const AddHouse = () => {
  const initialHouseState = {
    id: null,
    address: '',
    currentValue: 0.0
  };
  const [house, setHouse] = useState(initialHouseState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setHouse({ ...house, [name]: value });
  };

  const saveHouse = () => {
    var data = {
      address: house.address,
      currentValue: house.currentValue
    };

    HouseDataService.create(data)
      .then(response => {
        setHouse({
          id: response.data.data.id,
          address: response.data.data.address,
          currentValue: response.data.data.currentValue
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className='submit-form'>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <p>The house ID id: {house.id}</p>

          <Link
            to={"/house/" + house.id}
            className="badge badge-warning"
          >
            Show House
          </Link>
        </div>
      ) : (
        <div>
          <div className='form-group'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              className='form-control'
              id='address'
              required
              value={house.address}
              onChange={handleInputChange}
              name='address'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='currentValue'>Current Value</label>
            <input
              type='number'
              className='form-control'
              id='currentValue'
              required
              value={house.currentValue}
              onChange={handleInputChange}
              name='currentValue'
            />
          </div>

          <button onClick={saveHouse} className='btn btn-success'>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddHouse;
