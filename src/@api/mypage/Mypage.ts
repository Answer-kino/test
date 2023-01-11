import AxiosInstance from '../CustomAxios';
import {MypageType} from '../../@interface/MypageType';
import ChangePwd from '../../@interface/Passwd';

import ValidPhoneNumber from '../../@interface/ValidPhoneNumber';

class API_Mypage extends AxiosInstance {
  async getMyData() {
    try {
      await this.getActHeader();
      const url = 'sign/myPage';
      const {data} = await this.API.get(url);

      return data.result;
    } catch (error: any) {
      console.log(error.response.data.message);
      if (error.response.data.message === 'jwt must be provided') {
        alert('로그인 해주세요.');
      }
      // alert('a');
    }
  }

  async home_getMyData() {
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
      console.log(curPwd, newPwd, url);
      const {data} = await this.API.patch(url, {
        curPwd: curPwd,
        prevPwd: newPwd,
      });
      console.log('tw123123', data);
      return data;
    } catch (error: any) {
      if (error.response.data.code === 'WRONG_PASSWORD') {
        alert('기존 패스워드를 확인해주세요.');
      }
      throw new Error(error);
      // console.log(error.response.data.code);
    }
  }
  async changePhoneNumber(phone: string) {
    try {
      await this.getActHeader();
      const url = 'user/phone';
      const {data} = await this.API.patch(url, phone);
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
  async changeEmail(email: string) {
    // console.log('abcdefg');
    try {
      await this.getActHeader();
      const url = 'user/email';
      console.log(typeof email);
      console.log(email);

      const data = await this.API.patch(url, {email});
      console.log('이메일변경', data);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default API_Mypage;
