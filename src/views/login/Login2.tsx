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
import {LoginStyles} from '../../assets/css/login/login';
import {MarginLeft, MarginTop} from '../../assets/css/global/margin';
import {Font} from '../../assets/css/global/newFont';

const Login2 = ({navigation}: any) => {
  const SIGN_SERVICE = new API_SIGN_SERVICE();
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
    <View style={LoginStyles.Full}>
      <View style={LoginStyles.TopTitleContainer}>
        <Text style={Font.SignInTitle}>로그인</Text>
      </View>
      <View style={LoginStyles.MiddleContainer}>
        <TextInput
          style={LoginStyles.Inputbox}
          placeholder="차량번호"
          onChangeText={text => setCarNumber(text)}
          placeholderTextColor="#898989"></TextInput>
        <TextInput
          style={LoginStyles.Inputbox}
          placeholder="사용자 비밀번호"
          secureTextEntry={true}
          placeholderTextColor="#898989"
          onChangeText={text => setPwd(text)}></TextInput>

        <TouchableOpacity
          style={LoginStyles.LoginBtn}
          onPress={() => LoginAxios()}>
          <Text style={Font.SignInSubmitBtnText}>로그인</Text>
        </TouchableOpacity>
        <Divider width={1} style={{marginTop: 30, opacity: 0.4}}></Divider>
      </View>
      <View>
        <View style={LoginStyles.BottomTopContainer}>
          <TouchableOpacity
            style={LoginStyles.BottomTopBtn}
            onPress={() => navigation.navigate('FindCarNum')}>
            <Text style={Font.SignInHalfBtnText}>차량번호 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={LoginStyles.BottomTopBtn}
            onPress={() => navigation.navigate('FindPwd')}>
            <Text style={Font.SignInHalfBtnText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
        <View style={LoginStyles.BottomBotContainer}>
          <TouchableOpacity
            style={LoginStyles.BottomBotBtn}
            onPress={() => navigation.navigate('Login')}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={Font.SignInFullBtnLeftText}>계정이 없으신가요?</Text>

              <Text style={Font.SignInFullBtnRightText}>회원가입</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login2;
