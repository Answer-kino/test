import AxiosInstance from '../CustomAxios';

class API_BBS_SERVICE extends AxiosInstance {
  async BBS_Main_Notice() {
    try {
      const url = 'bbs/mainNotice';
      const {data} = await this.API.get(url);

      return data?.result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default API_BBS_SERVICE;
