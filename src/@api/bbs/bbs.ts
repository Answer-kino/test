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
      // if (limit && offset) url += `&limit=${limit}&offset=${offset}`;

      const {data} = await this.API.get(url);

      return data?.result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async BBS_Notice_Detail({category, limit, offset}: IBBS_Category_Notice) {
    try {
      let url = `bbs/bbsList?category=${category}&limit=${limit}&offset=${offset}`;
      // if (limit && offset) url += `&limit=${limit}&offset=${offset}`;

      const {data} = await this.API.get(url);

      return data?.result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async BBS_Community_LIst({category, limit, offset}: IBBS_Category_Notice) {
    try {
      let url = `bbs/bbsList?category=${category}&limit=${limit}&offset=${offset}`;
      // if (limit && offset) url += `&limit=${limit}&offset=${offset}`;

      const {data}: any = await this.API.get(url);
      const {result, totalCnt} = data;

      return {result, totalCnt};
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async BBS_Community_Detail(boardIdx: any) {
    try {
      let url = `bbs/content?boardIdx=${boardIdx}`;

      const {data} = await this.API.get(url);

      return data.result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async BBS_Comment(boardIdx: any) {
    try {
      let url = `bbs/comment?boardIdx=${boardIdx}`;
      // if (limit && offset) url += `&limit=${limit}&offset=${offset}`;
      await this.getActHeader();

      const {data} = await this.API.get(url);

      return data?.result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async BBS_Regist_Comment({comment, boardIdx}: any) {
    try {
      const url = 'bbs/registComment';
      await this.getActHeader();

      const {data} = await this.API.post(url, {comment, boardIdx});

      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async BBS_Board_Modify({boardIdx, newTitle, newContent}: any) {
    const title = newTitle;
    const content = newContent;

    try {
      await this.getActHeader();
      const url = `bbs/modifyContent`;
      const {data} = await this.API.patch(url, {boardIdx, title, content});
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async BBS_Board_Regist({title, content, category}: any) {
    try {
      const url = `bbs/regist?category=${category}`;
      await this.getActHeader();

      const {data} = await this.API.post(url, {title, content});

      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default API_BBS_SERVICE;
