import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import _ from 'lodash';
import {globalConfig} from '../@config/config';

class AxiosInstance {
  private TIME_OUT = 60 * 1000;
  private BASE_URL = globalConfig.URL.API;
  // private BASE_URL = 'http://192.168.10.14:4500/api/';

  public API = axios.create({
    baseURL: this.BASE_URL,
    timeout: this.TIME_OUT,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      withCredentials: true,
    },
  });

  getActHeader = async () => {
    const act = await AsyncStorage.getItem('act');
    this.API.defaults.headers.common['Authorization'] = `Bearer ${act || ''}`;
  };

  getRct = async () => {
    return await AsyncStorage.getItem('rct');
  };
}

export default AxiosInstance;
