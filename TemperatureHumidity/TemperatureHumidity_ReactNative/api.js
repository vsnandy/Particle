import React from 'react';
import config from './config';

const API_URL = "https://api.particle.io/v1/devices";
const API_KEY = config.API_KEY;

export const fetchVariable = async (device, variable) => {
  const response = await fetch(`${API_URL}/${device}/${variable}?access_token=${API_KEY}`);

  if(response.ok === true) {
    const results = response.json();
    return results;
  }

  const errMessage = response.error;
  throw new Error(errMessage);
}