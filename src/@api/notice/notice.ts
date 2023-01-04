import AxiosInstance from '../CustomAxios';

interface Category_Notice {
  category: string;
  limit: number;
  offset: number;
}

class API_Notice_SERVICE extends AxiosInstance {
  async Notice_Main_Notice() {
    try {
      const url = 'bbs/mainNotice';
      const {data} = await this.API.get(url);

      return data?.result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async BBS_Category_Notice({category, limit, offset}: Category_Notice) {
    try {
      // localhost:4500/api/bbs/bbsList?category=BBS_BC_200001&limit=10&offset=0
      let url = `bbs/bbsList?category=${category}`;
      console.log(url);
      // if (limit && offset) url += `&limit=${limit}&offset=${offset}`;

      const {data} = await this.API.get(url);

      console.log(data);
      // return data?.result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default API_Notice_SERVICE;
