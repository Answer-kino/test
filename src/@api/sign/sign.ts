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
}

export default API_SIGN_SERVICE;