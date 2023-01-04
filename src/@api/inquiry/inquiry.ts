import AxiosInstance from '../CustomAxios';

class API_Inquiry_Service extends AxiosInstance {
  async GET_INQUIRY() {
    try {
      await this.getActHeader();
      const url = 'enq/list';
      const {data} = await this.API.get(url);
      // console.log(data);
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
      // console.log('tw', Content, Title);
      const url = 'enq';
      const {data} = await this.API.post(url, {Content, Title});
      // console.log(data);
      return data?.result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default API_Inquiry_Service;
