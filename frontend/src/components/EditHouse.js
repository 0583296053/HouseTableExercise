import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import HouseDataService from '../services/HouseService';

const EditHouse = () => {
  const { id } = useParams();

  const initialHouseState = {
    id: null,
    address: '',
    currentValue: 0.0,
    loanAmount: 0.0
  };
  const [house, setHouse] = useState(initialHouseState);
  const [message, setMessage] = useState('');

  const getHouse = id => {
    HouseDataService.get(id)
      .then(response => {
        setHouse(response.data.data);
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getHouse(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setHouse({ ...house, [name]: value });
  };

  const updateHouse = () => {
    HouseDataService.update(house.id, house)
      .then(response => {
        console.log(response.data.data);
        setMessage('The house was updated successfully!');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className='submit-form'>
        <h4>Edit House</h4>
        <form>
          <div className='form-group'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              className='form-control'
              id='address'
              name='address'
              value={house.address}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='currentValue'>Current Value</label>
            <input
              type='number'
              className='form-control'
              id='currentValue'
              name='currentValue'
              value={house.currentValue}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='loanAmount'>Loan Amount</label>
            <input
              type='number'
              className='form-control'
              id='loanAmount'
              name='loanAmount'
              value={house.loanAmount}
              onChange={handleInputChange}
            />
          </div>
        </form>

        <button
          type='submit'
          className='btn btn-success'
          onClick={updateHouse}
        >
          Update
        </button>
        <p>{message}</p>

        <Link
          to={'/house/' + house.id}
          className='btn btn-info'
        >
          Show House
        </Link>
      </div>
    </div>
  );
};

export default EditHouse;
