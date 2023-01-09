import AxiosInstance from '../CustomAxios';
import {MypageType} from '../../@interface/MypageType';
import ChangePwd from '../../@interface/Passwd';
import ChangePhoneNumber from '../../@interface/PhoneNumber';
import ValidPhoneNumber from '../../@interface/ValidPhoneNumber';

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
      // console.log('tw', data);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async changePasswd({curPwd, newPwd}: ChangePwd) {
    try {
      await this.getActHeader();
      const url = 'user/pwd';
      const {data} = await this.API.patch(url, {
        curPwd: curPwd,
        prevPwd: newPwd,
      });
      console.log('tw123123', data);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async changePhoneNumber({phone, prevPhone}: ChangePhoneNumber) {
    try {
      await this.getActHeader();
      const url = 'user/phone';
      const {data} = await this.API.patch(url, {
        curPwd: phone,
        prevPwd: prevPhone,
      });
      console.log('핸드폰변경', data);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async validPhoneNumber({type, redisKey}: ValidPhoneNumber) {
    try {
      console.log('aaa');
      await this.getActHeader();
      const url = 'user/auth/phone';
      console.log(url, type, redisKey);
      const {data} = await this.API.post(url, {
        type: type,
        redisKey: redisKey,
      });
      console.log('핸드폰인증번호', data);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default API_Mypage;
