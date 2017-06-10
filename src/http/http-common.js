import axios from 'axios';
import httpConfig from './http.conf.js';

export const HTTP = axios.create(httpConfig);