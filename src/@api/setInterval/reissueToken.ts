import AsyncStorage from '@react-native-async-storage/async-storage';
import API_TOKEN_SERVICE from '../token/token';

const accesstokenReissue = async () => {
  const API = new API_TOKEN_SERVICE();
  setInterval(async () => {
    const rct = await AsyncStorage.getItem('rct');
    if (rct) {
      try {
        // console.log('act reissue');
        await API.REISSUE_ACT();
      } catch (error) {
        console.log('delete act');
        alert('토큰이 만료되었습니다.');
      }
    }
  }, 3300000);
};

export {accesstokenReissue};
