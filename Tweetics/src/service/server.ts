import axios, {AxiosRequestConfig} from 'axios';
import store from '../redux/store';
import {PORT, URLS} from './urls';

const getUser = () => {
  console.log('Contacted redux');
  return store.getState().user;
};

export const BASE_URL = `http://${URLS.BASE}:${PORT}/`;

export let baseServer = axios.create({
  headers: {
    Authorization: `Bearer ${store.getState().user?.token.access}`,
    Accept: 'application/json',
  },
});
