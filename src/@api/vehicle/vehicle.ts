import AxiosInstance from '../CustomAxios';

class API_VEHICLE_SERVICE extends AxiosInstance {
  GET = async (): Promise<any> => {
    try {
      const url = 'doc?category=Vehicle';
      await this.getActHeader();

      const {data} = await this.API.get(url);

      return data.documentary;
    } catch (error: any) {
      console.error('API_VEHICLE_SERVICE : ', error);
      throw new Error(error);
    }
  };
}

export default API_VEHICLE_SERVICE;
