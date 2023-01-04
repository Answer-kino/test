import AxiosInstance from '../CustomAxios';

class API_INSURANCE_SERVICE extends AxiosInstance {
  GET = async (): Promise<any> => {
    try {
      const url = 'doc?category=Insurance';
      await this.getActHeader();

      const {data} = await this.API.get(url);

      return data.documentary;
    } catch (error: any) {
      console.error('API_INSURANCE_SERVICE : ', error);
      throw new Error(error);
    }
  };
}

export default API_INSURANCE_SERVICE;
