import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddHouse from './components/AddHouse';
import EditHouse from './components/EditHouse';
import House from './components/House';
import Main from './components/Main';

function App() {
  return (
    <div className='all'>
      <div className='list row'>
        <div className='col-md-6'>
          <h2>HouseTable Exercise</h2>

          <Link to={'/add'} className='btn btn-info'>
            Add House
          </Link>

          <hr />

          <div className='container mt-3'>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/house/:id' element={<House />} />
              <Route path='/add' element={<AddHouse />} />
              <Route path='/edit/:id' element={<EditHouse />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
