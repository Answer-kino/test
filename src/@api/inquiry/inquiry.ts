import AxiosInstance from '../CustomAxios';

class API_Inquiry_Service extends AxiosInstance {
  async GET_INQUIRY() {
    try {
      await this.getActHeader();
      const url = 'enq/list';
      const {data} = await this.API.get(url);

      return data.enauiryList;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async POST_INQUIRY({title, content}: any) {
    const Content = content;
    const Title = title;
    try {
      await this.getActHeader();
      const url = 'enq/regist';
      const {data} = await this.API.post(url, {Content, Title});

      return data?.result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async MODIFY_INQUIRY({IDX_ENQ, Title, Content}: any) {
    try {
      console.log(IDX_ENQ, Title, Content);
      await this.getActHeader();

      const url = 'enq/modify';
      const {data} = await this.API.patch(url, {IDX_ENQ, Title, Content});

      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async DELETE_INQUIRY(IDX_ENQ: any) {
    try {
      await this.getActHeader();
      // console.log('tw', Content, Title);
      const url = 'enq/delete';
      const {data} = await this.API.post(url, IDX_ENQ);
      // console.log(data);
      return data?.result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default API_Inquiry_Service;
