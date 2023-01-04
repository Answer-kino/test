import AxiosInstance from '../CustomAxios';
import {MypageType} from '../../@interface/MypageType';

class API_Mypage extends AxiosInstance {
  async getMyData() {
    try {
      await this.getActHeader();
      const url = 'sign/myPage';
      const {data} = await this.API.get(url);

      return data.result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async patchMyData({ProfileImg, Email, Marketing, SNS}: MypageType) {
    try {
      await this.getActHeader();
      const url = 'sign/changeTerms';
      const {data} = await this.API.patch(url, {
        marketing: Marketing,
        emailConsent: Email,
        snsConsent: SNS,
        profileImg: ProfileImg,
      });
      console.log('tw', data);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default API_Mypage;
