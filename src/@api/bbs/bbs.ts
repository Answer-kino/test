import AxiosInstance from '../CustomAxios';

interface IBBS_Category_Notice {
  category: string;
  limit: number;
  offset: number;
}

class API_BBS_SERVICE extends AxiosInstance {
  async BBS_Main_Notice() {
    try {
      const url = 'bbs/mainNotice';
      const {data} = await this.API.get(url);
      return data?.result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async BBS_Category_Notice({category, limit, offset}: IBBS_Category_Notice) {
    try {
      let url = `bbs/bbsList?category=${category}&limit=${limit}&offset=${offset}`;
      // console.log('taewon', url);
      // if (limit && offset) url += `&limit=${limit}&offset=${offset}`;

      const {data} = await this.API.get(url);
      return data?.result;

      // console.log('taewon', data);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async BBS_Community_LIst({category, limit, offset}: IBBS_Category_Notice) {
    try {
      let url = `bbs/bbsList?category=${category}&limit=${limit}&offset=${offset}`;
      // console.log('taewon', url);
      // if (limit && offset) url += `&limit=${limit}&offset=${offset}`;

      const {data} = await this.API.get(url);
      // console.log('tw1', data);
      return data;

      // console.log('taewon', data);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async BBS_Community_Detail(boardIdx: any) {
    try {
      let url = `bbs/content?boardIdx=${boardIdx}`;
      // console.log('taewon', url);
      // if (limit && offset) url += `&limit=${limit}&offset=${offset}`;

      const {data} = await this.API.get(url);
      // console.log('tw1', data);
      return data.result;

      // console.log('taewon', data);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async BBS_Comment(boardIdx: any) {
    try {
      let url = `bbs/comment?boardIdx=${boardIdx}`;
      // console.log('taewon', url);
      // if (limit && offset) url += `&limit=${limit}&offset=${offset}`;

      const {data} = await this.API.get(url);
      // console.log('tw1', data);
      return data?.result;

      // console.log('taewon', data);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async BBS_Regist_Comment({comment, boardIdx}: any) {
    try {
      console.log('comment : ', comment);
      console.log('boardIdx : ', boardIdx);
      const url = 'bbs/registComment';
      await this.getActHeader();
      const {data} = await this.API.post(url, {comment, boardIdx});
      // console.log('tw1', data);
      return data;

      // console.log('taewon', data);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async BBS_Board_Regist({title, content, category}: any) {
    try {
      await this.getActHeader();
      const url = `bbs/regist?category=${category}`;
      const {data} = await this.API.post(url, {title, content});
      // console.log('tw1', data);
      return data;

      // console.log('taewon', data);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default API_BBS_SERVICE;
