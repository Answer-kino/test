import {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  BackHandler,
  Alert,
  Dimensions,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import _ from 'lodash';
import API_SIGN_SERVICE from '../../@api/sign/sign';

enum ESignInfoKey {
  carNumber = 'carNumber',
  email = 'email',
  pwd = 'pwd',
  phone = 'phone',
}
type TSignInfo = {
  [key in ESignInfoKey]: string;
};

enum EActiveInfoKey {
  privacy = 'privacy',
  location = 'location',
  promotion = 'promotion',
  marketing = 'marketing',
}
type TActiveInfoValue = 'Y' | 'N';
type TActiveInfo = {
  [key in EActiveInfoKey]: TActiveInfoValue;
};

enum ESignCheckBoxKey {
  termOfService = 'termOfService',
  privacy = 'privacy',
  location = 'location',
  promotion = 'promotion',
  marketing = 'marketing',
}

type TSignCheckBox = {
  [key in ESignCheckBoxKey]: boolean;
};

enum EValidKey {
  carNumber = 'carNumber',
  phone = 'phone',
  email = 'email',
}

type TValid = {
  [key in EValidKey]: undefined | boolean;
};

enum EDigitCodeKey {
  phone = 'phone',
  email = 'email',
}
type TSendDigitCode = {
  [key in EDigitCodeKey]: undefined | boolean;
};
const Login = ({navigation}: any) => {
  const SIGN_SERVICE = new API_SIGN_SERVICE();
  const [signInfo, setSignInfo] = useState<TSignInfo>({
    carNumber: '',
    email: '',
    pwd: '',
    phone: '',
  });
  const [curPwd, setCurPwd] = useState<string>('');
  const [digitCode, setDigitCode] = useState({email: '', phone: ''});
  const [activeInfo, setActiveInfo] = useState<TActiveInfo>({
    privacy: 'N',
    location: 'N',
    promotion: 'N',
    marketing: 'N',
  });
  const [checkBox, setCheckBox] = useState<TSignCheckBox>({
    termOfService: false,
    privacy: false,
    location: false,
    promotion: false,
    marketing: false,
  });
  const [valid, setValid] = useState<TValid>({
    carNumber: undefined,
    phone: false,
    email: false,
  });
  const [authRequest, setAuthRequest] = useState<TSendDigitCode>({
    phone: false,
    email: false,
  });

  const setSignInfoHandler = (key: ESignInfoKey) => (text: string) => {
    setSignInfo(cur => ({...cur, [key]: text}));
  };

  const setCheckBoxHandler = (key: ESignCheckBoxKey) => (e: any) => {
    const checkBoxBoolean = !checkBox[key];
    const activeInfoValue = checkBoxBoolean ? 'Y' : 'N';

    setCheckBox(cur => ({...cur, [key]: checkBoxBoolean}));
    if (key !== ESignCheckBoxKey.termOfService)
      setActiveInfo(cur => ({...cur, [key]: activeInfoValue}));
  };

  const sendDigitCodeApiMap = {
    phone: async () => {
      // :TODO: 모바일 인증 신청 이후 가능
      return true;
    },
    email: async () => {
      return await SIGN_SERVICE.sendEmailDigitCode(signInfo.email);
    },
  };
  const sendDigitCodeHandler = async (key: EDigitCodeKey) => {
    try {
      await sendDigitCodeApiMap[key]();
      setAuthRequest(cur => ({...cur, [key]: true}));
    } catch (error) {
      setAuthRequest(cur => ({...cur, [key]: false}));
      alert(error);
    }
  };
  const setDigitCodeHandler = (key: EDigitCodeKey) => (text: string) => {
    setDigitCode(cur => ({...cur, [key]: text}));
  };
  const setValidApiMap = {
    carNumber: async () => {
      return await SIGN_SERVICE.OverLapCar(signInfo.carNumber);
    },
    phone: async () => {
      // :TODO: 모바일 인증 신청 이후 가능
      return true;
    },
    email: async () => {
      const checkEMailDigitcodeInfo = {
        email: signInfo.email,
        digitCode: digitCode.email,
      };
      const t = await SIGN_SERVICE.checkEmailDigitCode(checkEMailDigitcodeInfo);
      return true;
    },
  };
  const setValidHandler = async (key: EValidKey) => {
    try {
      const value = await setValidApiMap[key]();

      setValid(cur => ({...cur, [key]: value}));
      if (key !== EValidKey.carNumber) {
        setAuthRequest(cur => ({...cur, [key]: false}));
      }
    } catch (error) {
      alert('인증 요청에 실패 했습니다.');
    }
  };

  const initState = () => {
    setSignInfo({
      carNumber: '',
      email: '',
      pwd: '',
      phone: '',
    });
    setCurPwd('');
    setDigitCode({email: '', phone: ''});
    setActiveInfo({
      privacy: 'N',
      location: 'N',
      promotion: 'N',
      marketing: 'N',
    });
    setCheckBox({
      termOfService: false,
      privacy: false,
      location: false,
      promotion: false,
      marketing: false,
    });
    setValid({
      carNumber: undefined,
      phone: false,
      email: false,
    });
    setAuthRequest({
      phone: false,
      email: false,
    });
  };
  const signUpHandler = async () => {
    if (!valid.carNumber) {
      return alert('차량번호 중복확인 해주세요.');
    }
    if (signInfo.pwd !== curPwd) {
      return alert('패스워드가 일치하지 않습니다.');
    }
    if (!valid.phone) {
      return alert('휴대폰 인증 해주세요.');
    }
    if (!valid.email) {
      return alert('이메일 인증 해주세요.');
    }
    for (let [key, value] of Object.entries(checkBox)) {
      if (!value) {
        return alert(`[${key}] 확인해주세요.`);
      }
    }

    try {
      const signUpInfo = {...signInfo, ...activeInfo};
      await SIGN_SERVICE.signUp(signUpInfo);
      alert('회원가입이 완료 되었습니다.');
      initState();
      navigation.push('Home');
    } catch (error) {
      alert('회원가입에 실패했습니다.');
    }
  };

  useEffect(() => {
    console.log(signInfo);
  }, [signInfo]);
  useEffect(() => {
    console.log(activeInfo);
  }, [activeInfo]);
  useEffect(() => {
    console.log(checkBox);
  }, [checkBox]);
  useEffect(() => {
    console.log(valid);
  }, [valid]);
  useEffect(() => {
    console.log(digitCode);
  }, [digitCode]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('뒤로가기', '뒤로가기 누를 시 입력된 데이터가 사라집니다.', [
        {
          text: '취소',
          onPress: () => null,
        },
        {text: '확인', onPress: () => navigation.pop()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
  }, []);
  return (
    <View style={styles.full}>
      <View>
        <Text style={styles.TopText}>회원가입</Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TextInput
              style={styles.inputbox1}
              value={signInfo?.carNumber}
              placeholder="차량번호"
              placeholderTextColor="black"
              onChangeText={setSignInfoHandler(
                ESignInfoKey.carNumber
              )}></TextInput>
            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => setValidHandler(EValidKey.carNumber)}>
              <Text style={styles.buttonText}>중복확인</Text>
            </TouchableOpacity>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', marginTop: 8}}>
            {_.isUndefined(valid.carNumber) ? (
              ''
            ) : _.isBoolean(valid.carNumber) && valid.carNumber ? (
              <Text
                style={{
                  marginLeft: '12%',
                  fontSize: 13,
                  lineHeight: 18,
                  fontWeight: '400',
                  fontFamily: 'Noto Sans',
                }}>
                사용 가능한 차량번호입니다.
              </Text>
            ) : (
              <Text
                style={{
                  marginLeft: '12%',
                  fontSize: 13,
                  lineHeight: 18,
                  fontWeight: '400',
                  fontFamily: 'Noto Sans',
                  color: '#F31414',
                }}>
                사용 불가능한 차량번호입니다.
              </Text>
            )}
          </View>
          <TextInput
            style={styles.inputbox2}
            placeholder="비밀번호"
            placeholderTextColor="black"
            value={signInfo?.pwd}
            secureTextEntry={true}
            onChangeText={setSignInfoHandler(ESignInfoKey.pwd)}></TextInput>
          <TextInput
            style={styles.inputbox2}
            placeholder="비밀번호 확인"
            placeholderTextColor="black"
            value={curPwd}
            secureTextEntry={true}
            onChangeText={text => setCurPwd(text)}></TextInput>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TextInput
              style={styles.inputbox1}
              placeholder="휴대폰"
              placeholderTextColor="black"
              value={signInfo?.phone}
              onChangeText={setSignInfoHandler(ESignInfoKey.phone)}></TextInput>
            <TouchableOpacity
              style={styles.checkButton}
              // onPress={() => sendDigitCodeHandler(EDigitCodeKey.phone)}>
              onPress={() => setValidHandler(EValidKey.phone)}>
              <Text style={styles.buttonText}>인증요청</Text>
            </TouchableOpacity>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TextInput
              style={styles.inputbox1}
              placeholder="이메일"
              placeholderTextColor="black"
              value={signInfo?.email}
              onChangeText={setSignInfoHandler(ESignInfoKey.email)}></TextInput>
            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => sendDigitCodeHandler(EDigitCodeKey.email)}>
              <Text style={styles.buttonText}>인증요청</Text>
            </TouchableOpacity>
          </View>
          {authRequest.email ? (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TextInput
                style={styles.inputbox1}
                placeholder="이메일인증번호"
                placeholderTextColor="black"
                value={digitCode.email}
                onChangeText={setDigitCodeHandler(
                  EDigitCodeKey.email
                )}></TextInput>
              <TouchableOpacity
                style={styles.checkButton}
                onPress={() => setValidHandler(EValidKey.email)}>
                <Text style={styles.buttonText}>인증하기</Text>
              </TouchableOpacity>
            </View>
          ) : (
            ''
          )}
        </View>
        <View style={{marginTop: 10}}>
          <View>
            <View style={styles.checkboxcontainer}>
              <CheckBox
                style={styles.checkbox}
                value={checkBox.termOfService}
                onChange={setCheckBoxHandler(
                  ESignCheckBoxKey.termOfService
                )}></CheckBox>
              <Text style={styles.checkboxText}>이용약관 [보기]</Text>
            </View>
          </View>
          <View>
            <View style={styles.checkboxcontainer}>
              <CheckBox
                style={styles.checkbox}
                value={checkBox.privacy}
                onChange={setCheckBoxHandler(
                  ESignCheckBoxKey.privacy
                )}></CheckBox>
              <Text style={styles.checkboxText}>
                개인정보수집 및 이용 [보기]
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.checkboxcontainer}>
              <CheckBox
                style={styles.checkbox}
                value={checkBox.location}
                onChange={setCheckBoxHandler(
                  ESignCheckBoxKey.location
                )}></CheckBox>
              <Text style={styles.checkboxText}>
                위치기반서비스 이용약관 [보기]
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.checkboxcontainer}>
              <CheckBox
                style={styles.checkbox}
                value={checkBox.promotion}
                onChange={setCheckBoxHandler(
                  ESignCheckBoxKey.promotion
                )}></CheckBox>
              <Text style={styles.checkboxText}>
                프로모션 정보수신약관 [보기]
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.checkboxcontainer}>
              <CheckBox
                style={styles.checkbox}
                value={checkBox.marketing}
                onChange={setCheckBoxHandler(
                  ESignCheckBoxKey.marketing
                )}></CheckBox>
              <Text style={styles.checkboxText}>
                마케팅,SNS,이메일 수신동의 [보기]
              </Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.lastBtn}
            onPress={() => signUpHandler()}>
            <Text style={{color: 'white'}}>가입하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 80,
    marginBottom: 20,
  },
  full: {
    height: '100%',
    width: '100%',

    backgroundColor: '#DEDEDE',
  },
  TopText: {
    color: '#292929',
    marginLeft: '7%',
    marginTop: 50,
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Noto Sans',
  },
  inputbox1: {
    backgroundColor: 'white',
    width: '85%',
    height: 48,
    marginTop: 15,
    marginLeft: '9%',
    borderRadius: 10,
    paddingLeft: 15,
  },
  inputbox2: {
    backgroundColor: 'white',
    width: '85%',
    height: 48,
    marginTop: 15,
    marginLeft: '9%',
    borderRadius: 10,
    paddingLeft: 15,
  },
  checkButton: {
    width: 58,
    height: 28,
    marginTop: 25,
    borderRadius: 6,
    marginLeft: '-20%',
    backgroundColor: '#879BB9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'Noto Sans',
  },
  checkbox: {
    marginLeft: '7%',
    marginTop: '1%',
  },
  checkboxText: {
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 20,
    color: 'black',
    marginLeft: '3%',
    marginTop: 10,
  },
  lastBtn: {
    marginLeft: '9%',
    width: '85%',
    height: 51,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#6DADDB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastBtnText: {
    fontWeight: '500',
    fontFamily: 'Noto Sans',
    fontSize: 16,
    lineHeight: 18,
  },
  checkboxcontainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Login;
