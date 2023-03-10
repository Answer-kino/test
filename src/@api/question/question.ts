import AxiosInstance from '../CustomAxios';

class API_Question extends AxiosInstance {
  async QuestionInfo() {
    try {
      await this.getActHeader();
      const url = 'bbs/faqList';
      const {data} = await this.API.get(url);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default API_Question;
