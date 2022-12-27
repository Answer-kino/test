import AxiosInstance from '../CustomAxios';

interface ISIGNIN {
  carNumber: string;
  pwd: string;
}
interface ESIGNIN {
  act: string;
  rct: string;
  success: boolean;
}

class API_SIGN_SERVICE extends AxiosInstance {
  async SIGNIN({carNumber, pwd}: ISIGNIN): Promise<ESIGNIN> {
    try {
      const url = 'sign/in';
      const {data} = await this.API.post(url, {carNumber, pwd});

      return data;
    } catch (error) {
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  }
}

export default API_SIGN_SERVICE;
