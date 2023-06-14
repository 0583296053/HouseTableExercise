import http from '../http-common';

const create = data => {
  return http.post('/houses', data);
};

const get = id => {
  return http.get(`/houses/${id}`);
};

const update = (id, data) => {
  return http.put(`/houses/${id}`, data);
};

const HousesService = {
  create,
  get,
  update
};

export default HousesService;
