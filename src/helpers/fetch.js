const axios = require('axios');

const BASE_URL = 'https://api.spacexdata.com/v2';

const fetchResponseByURL = (relativeURL) => {
  if (process.env.NODE_ENV === 'dev') {
    console.log('GET', `${BASE_URL}/${relativeURL}`);
  }

  return axios.get(`${BASE_URL}/${relativeURL}`).then(res => res.data);
};

const fetchRockets = (id = null) => {
  const url = ['rockets'];

  if (id) {
    url.push(id);
  }

  return fetchResponseByURL(url.join('/'));
};

const fetchCompany = () => fetchResponseByURL('info');

module.exports = {
  BASE_URL,
  fetchResponseByURL,
  fetchRockets,
  fetchCompany,
};
