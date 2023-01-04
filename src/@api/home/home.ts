import AxiosInstance from '../CustomAxios';

class API_HOME_SERVICE extends AxiosInstance {
  INFO = async (): Promise<any> => {
    try {
      const url = 'sign/myPage';
      await this.getActHeader();

      const {data} = await this.API.get(url);
      // console.log('tw1', data.result.CarNumber);

      // return data.result[0];
      return data.result.CarNumber;
    } catch (error: any) {
      console.error('API_HOME_SERVICE : ', error);
      throw new Error(error);
    }
  };
}

export default API_HOME_SERVICE;
