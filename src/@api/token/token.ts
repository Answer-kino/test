import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../CustomAxios';

class API_TOKEN_SERVICE extends AxiosInstance {
  REFRESH__TOKEN = async (): Promise<any> => {
    try {
      const url = 'token/refresh';
      await this.getActHeader();
      const rct = await this.getRct();

      const {data} = await this.API.post(url, {rct});
      const {act} = data;

      await AsyncStorage.setItem('act', act);

      return true;
    } catch (error: any) {
      console.error('API_TOKEN_SERVICE : ', error);
      return false;
    }
  };

  REISSUE_ACT = async (): Promise<any> => {
    try {
      const url = 'token/refresh';
      await this.getActHeader();
      const rct = await this.getRct();

      const {data} = await this.API.post(url, {rct});
      const {act} = data;
      await AsyncStorage.setItem('act', act);
    } catch (error: any) {
      await AsyncStorage.removeItem('act');
      await AsyncStorage.removeItem('rct');

      throw new Error(error);
    }
  };
}

export default API_TOKEN_SERVICE;
