const axios = require('axios');
const querystring = require('querystring');

const BASE_URL = 'https://api.spacexdata.com/v2';

const fetchResponseByURL = (relativeURL, filters = null) => {
  let queryString = '';
  if (process.env.NODE_ENV === 'dev') {
    console.log('GET', `${BASE_URL}/${relativeURL}`);
  }

  if (filters) {
    queryString = `?${querystring.stringify(filters)}`;
  }

  return axios.get(`${BASE_URL}/${relativeURL}${queryString}`).then(res => res.data);
};

const fetchRockets = async (id = null) => {
  let relativeURL = 'rockets';

  if (id) {
    relativeURL = `${relativeURL}/${id}`;
  }

  const rockets = await fetchResponseByURL(relativeURL);

  // Forces the return to be an array when ID is set.
  return id ? [rockets] : rockets;
};

const fetchCompany = () => fetchResponseByURL('info');

const fetchLaunches = async (type = null, filters = null) => {
  let relativeURL = 'launches';
  const launchType = type || 'latest';

  if (launchType === 'latest') {
    const response = await fetchResponseByURL(`${relativeURL}/${launchType}`);
    return [response];
  }

  if (!filters) {
    relativeURL = `${relativeURL}/${launchType}`;
  }

  const launches = await fetchResponseByURL(relativeURL, filters);

  return launches;
};

module.exports = {
  BASE_URL,
  fetchResponseByURL,
  fetchRockets,
  fetchCompany,
  fetchLaunches,
};
