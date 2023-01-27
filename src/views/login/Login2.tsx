import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_SIGN_SERVICE from '../../@api/sign/sign';
import {Divider} from '@rneui/base';

const Login2 = ({navigation}: any) => {
  const SIGN_SERVICE = new API_SIGN_SERVICE();
  const [count, setCount] = useState<any>();
  const [carNumber, setCarNumber] = useState('');
  const [pwd, setPwd] = useState('');

  const LoginAxios = async () => {
    const signInInfo = {
      carNumber: carNumber,
      pwd: pwd,
    };
    try {
      console.log('hi');
      const {act, rct} = await SIGN_SERVICE.SIGNIN(signInInfo);

      await AsyncStorage.setItem('act', act);
      await AsyncStorage.setItem('rct', rct);

      navigation.push('Home');
    } catch (error) {
      console.error(error);
      Alert.alert('아이디와 패스워드를 확인해주세요.');
    }
  };

  const clearData = () => {
    // console.log('num', carNumber, 'pwd', pwd);
    setCarNumber(' ');
    setPwd(' ');
  };

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('뒤로가기', '뒤로가기 누를 시 입력된 데이터가 사라집니다.', [
  //       {
  //         text: '취소',

  //         onPress: () => null,
  //       },
  //       {text: '확인', onPress: () => clearData()},
  //     ]);

  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction
  //   );
  // }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('종료', '앱을 종료하시겠습니까?', [
        {
          text: '아니요',
          onPress: () => null,
          style: 'cancel',
        },
        {text: '네', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
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
          <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
            로그인
          </Text>
        </TouchableOpacity>
        <Divider width={1} style={{marginTop: 30, opacity: 0.4}}></Divider>
      </View>
      <View
        style={{
          marginTop: 30,
          display: 'flex',
          flexDirection: 'row',
          width: '80%',
          marginLeft: '9%',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={styles.login3Btn}
          onPress={() => navigation.navigate('FindCarNum')}>
          <Text style={styles.lastBtnText}>차량번호 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.login3Btn}
          onPress={() => navigation.navigate('FindPwd')}>
          <Text style={styles.lastBtnText}>비밀번호 찾기</Text>
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
  login3Btn: {
    width: '48%',
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
