import {ECapitalInfo} from '../../@entity/capital/entity';
import AxiosInstance from '../CustomAxios';

class API_CAPITAL_SERVICE extends AxiosInstance {
  GET = async (): Promise<any> => {
    try {
      const url = 'capital';
      await this.getActHeader();

      const {data} = await this.API.get(url);
      return data.capital[0];
    } catch (error: any) {
      console.error('API_CAPITAL_SERVICE : ', error);
      throw new Error(error);
    }
  };
}

export default API_CAPITAL_SERVICE;
