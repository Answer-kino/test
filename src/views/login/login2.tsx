import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login2 = ({navigation}: any) => {
  const [carNumber, setCarNumber] = useState('');
  const [pwd, setPwd] = useState('');
  const [token, setToken] = useState({act: undefined, rct: undefined});

  const LoginAxios = async () => {
    const signInInfo = {
      carNumber: carNumber,
      pwd: pwd,
    };
    try {
      const {data}: any = await axios.post(
        'http://223.130.129.121:4500/api/sign/in',
        signInInfo,
      );
      const {act, rct} = data;
      setToken({act, rct});
      // console.log(act);
      // console.log(AsyncStorage.getItem('act2'));
      // navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      Alert.alert('아이디와 패스워드를 확인해주세요.');
    }
  };
  useEffect(() => {
    console.log(token);
  }, [LoginAxios]);

  const tokens = async () => {
    try {
      await AsyncStorage.setItem('tokens', JSON.stringify(token)); // 객체 형태 저장
    } catch (e) {
      // 오류 예외 처리
    }
  };

  // useEffect(() => {
  //   for (let [key, value] of Object.entries(token)) {
  //     if (value === undefined) throw new Error('토큰 못받아옴');
  //     else {
  //       await AsyncStorage.setItem(key, value);
  //     }
  //   }
  //   navigation.navigate('Home');
  // }, [token]);

  useEffect(() => {
    const backAction = () => {
      navigation.pop();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.full}>
      <View>
        <Text style={styles.TopText}>로그인</Text>
      </View>
      <View style={{marginTop: 20}}>
        <TextInput
          style={styles.inputbox1}
          placeholder="차량번호"
          onChangeText={text => setCarNumber(text)}></TextInput>
        <TextInput
          style={styles.inputbox1}
          placeholder="사용자 비밀번호"
          secureTextEntry={true}
          onChangeText={text => setPwd(text)}></TextInput>
        <TouchableOpacity style={styles.lastBtn} onPress={() => LoginAxios()}>
          <Text style={{color: 'white'}}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 30}}>
        <TouchableOpacity style={styles.login2Btn}>
          <Text style={styles.lastBtnText}>
            E-mail 또는 비밀번호를 잊으셨나요?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 15}}>
        <TouchableOpacity
          style={styles.login2Btn}
          onPress={() => navigation.navigate('Login')}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={styles.lastBtnText}>계정이 없으신가요?</Text>
            <Text
              style={{
                fontFamily: 'Noto Sans',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 19,
                lineHeight: 20,
                color: '#2D9DB6',
                // marginLeft: 5,
              }}>
              회원가입
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  full: {
    height: '100%',
    width: '100%',

    backgroundColor: '#DEDEDE',
  },
  TopText: {
    color: '#292929',
    marginLeft: '7%',
    marginTop: 50,
    width: 81,
    height: 30,
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Noto Sans',
  },
  inputbox1: {
    backgroundColor: 'white',
    width: '80%',
    height: 48,
    marginTop: 15,
    marginLeft: '9%',
    borderRadius: 10,
    paddingLeft: 15,
    color: 'black',
  },
  lastBtnText: {
    fontWeight: '500',
    fontFamily: 'Noto Sans',
    fontSize: 13,
    lineHeight: 18,
  },
  lastBtn: {
    marginLeft: '9%',
    width: '80%',
    height: 51,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#6DADDB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login2Btn: {
    marginLeft: '9%',
    width: '80%',
    height: 53,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //   backgroundColor: 'white',
  },
});

export default Login2;
