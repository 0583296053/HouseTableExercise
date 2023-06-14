import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HouseDataService from '../services/HouseService';
import { Link } from 'react-router-dom';

const House = () => {
  const { id } = useParams();

  const initialHouseState = {
    id: null,
    address: '',
    currentValue: 0.0,
    loanAmount: 0.0,
    risk: 0.0
  };
  const [currentHouse, setCurrentHouse] = useState(initialHouseState);

  const getHouse = id => {
    HouseDataService.get(id)
      .then(response => {
        setCurrentHouse(response.data.data);
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

  return (
    <div className='list row'>
      <div className='col-md-6'>
        <div>
          <h4>House</h4>
          <div>
            <label>
              <strong>Address:</strong>
            </label>{' '}
            {currentHouse.address}
          </div>
          <div>
            <label>
              <strong>Current Value:</strong>
            </label>{' '}
            {currentHouse.currentValue}
          </div>
          <div>
            <label>
              <strong>Loan Amount:</strong>
            </label>{' '}
            {currentHouse.loanAmount}
          </div>
          <div>
            <label>
              <strong>Risk:</strong>
            </label>{' '}
            {currentHouse.risk}
          </div>

          <Link
            to={'/edit/' + currentHouse.id}
            className='badge badge-warning'
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default House;
