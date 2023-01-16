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
      throw new Error(error);

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

      const {data} = await this.API.patch(url, {
        curPwd: curPwd,
        prevPwd: newPwd,
      });

      return data;
    } catch (error: any) {
      if (error.response.data.code === 'WRONG_PASSWORD') {
        throw '잘못된 패스워드를 입력했습니다.';
      } else if (error.response.data.code === 'TO_EMAIL_IS_WRONG') {
        // TODO: 잘못된 이메일 기재되어 있을 경우 다음 에러 발생.
        // 현재 로직 구현 X
        // 추후 추가 작업 필요
        return true;
      } else {
        throw new Error(error);
      }
      // console.log(error.response.data.code);
    }
  }
  async changePhoneNumber(phone: string) {
    try {
      await this.getActHeader();
      const url = 'user/phone';

      const data = await this.API.patch(url, {phone});
      // console.log('핸드폰변경', data);
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
