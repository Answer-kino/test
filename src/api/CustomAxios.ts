import axios from 'axios';

class AxiosInstance {
  private TIME_OUT = 60 * 1000;
  private BASE_URL = 'http://223.130.129.121:4500/api/';

  public API = axios.create({
    baseURL: this.BASE_URL,
    timeout: this.TIME_OUT,
    headers: {common: {['Content-Type']: 'application/json'}},
  });

  tokenIn = () => {
    console.log('hi');
  };
}

export default AxiosInstance;
