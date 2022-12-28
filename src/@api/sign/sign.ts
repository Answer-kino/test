import {ESignIn} from '../../@entity/sign/sign';
import {ISignIn} from '../../@interface/ISign';
import AxiosInstance from '../CustomAxios';

class API_SIGN_SERVICE extends AxiosInstance {
  async SIGNIN({carNumber, pwd}: ISignIn): Promise<ESignIn> {
    try {
      const url = 'sign/in';
      const {data} = await this.API.post(url, {carNumber, pwd});

      return data;
    } catch (error) {
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  }

  async OverLapCar(carNumber: string): Promise<any> {
    try {
      const url = 'sign/auth/overlapCar';
      const {data} = await this.API.post(url, {carNumber});
      console.log(data);
      return !data.duplicate;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async sendEmailDigitCode(email: string): Promise<any> {
    try {
      const url = 'sign/auth/email';
      const {data} = await this.API.post(url, {type: 'email', redisKey: email});
      console.log(data);
    } catch (error: any) {
      throw new Error('메일 전송에 실패 했습니다.');
    }
  }

  async checkEmailDigitCode({email, digitCode}: any): Promise<any> {
    try {
      const url = 'sign/auth';
      const {data} = await this.API.post(url, {
        type: 'email',
        redisKey: email,
        digitCode,
      });

      return data.digitCode;
    } catch (error: any) {
      throw new Error('메일 인증에 실패 했습니다.');
    }
  }

  async signUp(signInfo: any): Promise<any> {
    try {
      const url = 'sign/up';
      await this.API.post(url, signInfo);
    } catch (error: any) {
      console.error(error);
      throw new Error('회원가입 실패');
    }
  }
}

export default API_SIGN_SERVICE;
