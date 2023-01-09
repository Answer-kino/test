import {useEffect, useRef, useState} from 'react';
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
  Modal,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import _ from 'lodash';
import API_SIGN_SERVICE from '../../@api/sign/sign';
import ModalCloseBtn from '../../assets/modalclosetbtn.svg';
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
  all = 'all',
  privacy = 'privacy',
  location = 'location',
  promotion = 'promotion',
  marketing = 'marketing',
  eamilConsent = 'emailConsent',
  SnsConsent = 'SnsConsent',
}
type TActiveInfoValue = 'Y' | 'N';
type TActiveInfo = {
  [key in EActiveInfoKey]: TActiveInfoValue;
};

enum ESignCheckBoxKey {
  all = 'all',
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
  const [modalVisible, setModalVisible] = useState(false);
  const [digitCode, setDigitCode] = useState({email: '', phone: ''});
  const [activeInfo, setActiveInfo] = useState<TActiveInfo>({
    all: 'N',
    privacy: 'N',
    location: 'N',
    promotion: 'N',
    marketing: 'N',
    emailConsent: 'N',
    SnsConsent: 'N',
  });
  const [checkBox, setCheckBox] = useState<TSignCheckBox>({
    all: false,
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
  const [validationCheck, setValidationCheck] = useState({
    phone: true,
    email: true,
  });

  const [pwdValidationCheck, setPwdValidationCheck] = useState(true);
  const [pwdEqualCheck, setPwdEqualCheck] = useState(true);
  const [phoneValidationCheckText, setPhoneValidationCheckText] =
    useState(false);

  let regPwd =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

  const pwdValidationHandler = () => {
    if (regPwd.test(signInfo.pwd)) {
      setPwdValidationCheck(true);
    } else {
      setPwdValidationCheck(false);
    }
  };
  const pwdEqualCheckHandler = () => {
    if (curPwd === signInfo.pwd) {
      setPwdEqualCheck(true);
    } else {
      setPwdEqualCheck(false);
    }
  };

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

  //리팩토링 필요
  const setCheckBoxHandler2 = (key: ESignCheckBoxKey) => (e: any) => {
    const checkBoxBoolean = !checkBox[key];
    const activeInfoValue = 'Y';
    setCheckBox(cur => ({...cur, [key]: checkBoxBoolean}));
    setCheckBox(cur => ({...cur, location: checkBoxBoolean}));
    setCheckBox(cur => ({...cur, marketing: checkBoxBoolean}));
    setCheckBox(cur => ({...cur, privacy: checkBoxBoolean}));
    setCheckBox(cur => ({...cur, promotion: checkBoxBoolean}));
    setCheckBox(cur => ({...cur, termOfService: checkBoxBoolean}));
    console.log(activeInfo);
    // if (key !== ESignCheckBoxKey.termOfService)
    //   setActiveInfo(cur => ({...cur, [key]: activeInfoValue}));
    if (checkBox.all) {
      setActiveInfo(cur => ({...cur, all: 'Y'}));
      setActiveInfo(cur => ({...cur, location: 'Y'}));
      setActiveInfo(cur => ({...cur, marketing: 'Y'}));
      setActiveInfo(cur => ({...cur, privacy: 'Y'}));
      setActiveInfo(cur => ({...cur, promotion: 'Y'}));
      setActiveInfo(cur => ({...cur, emailConsent: 'Y'}));
      setActiveInfo(cur => ({...cur, SnsConsent: 'Y'}));
    } else {
      setActiveInfo(cur => ({...cur, all: 'N'}));
      setActiveInfo(cur => ({...cur, location: 'N'}));
      setActiveInfo(cur => ({...cur, marketing: 'N'}));
      setActiveInfo(cur => ({...cur, privacy: 'N'}));
      setActiveInfo(cur => ({...cur, promotion: 'N'}));
      setActiveInfo(cur => ({...cur, emailConsent: 'N'}));
      setActiveInfo(cur => ({...cur, SnsConsent: 'N'}));
    }
  };

  const sendDigitCodeApiMap = {
    phone: async () => {
      return await SIGN_SERVICE.sendPhoneDigitCode(signInfo.phone);
    },
    email: async () => {
      return await SIGN_SERVICE.sendEmailDigitCode(signInfo.email);
    },
  };

  const sendDigitCodeHandler = async (key: EDigitCodeKey) => {
    setPhoneValidationCheckText(true);
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
      const PhoneDigitCode = {
        phone: signInfo.phone,
        digitCode: digitCode.phone,
      };
      const t = await SIGN_SERVICE.checkPhoneDigitCode(PhoneDigitCode);
      if (t === false) {
        setValidationCheck(cur => ({...cur, phone: true}));
      } else {
        setValidationCheck(cur => ({...cur, phone: false}));
      }

      console.log('validationCheck', validationCheck);
      return true;
    },
    email: async () => {
      const checkEMailDigitcodeInfo = {
        email: signInfo.email,
        digitCode: digitCode.email,
      };
      const t = await SIGN_SERVICE.checkEmailDigitCode(checkEMailDigitcodeInfo);
      if (t === false) {
        setValidationCheck(cur => ({...cur, email: true}));
      } else {
        setValidationCheck(cur => ({...cur, email: false}));
      }
      return true;
    },
  };
  const setValidHandler = async (key: EValidKey) => {
    console.log('validationCheck', validationCheck);
    try {
      const value = await setValidApiMap[key]();
      console.log('value', value);
      setValid(cur => ({...cur, [key]: value}));

      if (value) {
      }
      // if (key !== EValidKey.carNumber) {
      //   setAuthRequest(cur => ({...cur, [key]: false}));
      // }
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
      all: 'N',
      privacy: 'N',
      location: 'N',
      promotion: 'N',
      marketing: 'N',
      emailConsent: 'N',
      SnsConsent: 'N',
    });
    setCheckBox({
      all: false,
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
    if (!regPwd.test(signInfo.pwd)) {
      return alert('비밀번호 형식을 확인해주세요.');
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
    if (!checkBox.termOfService || !checkBox.privacy) {
      return alert('이용약관 확인해주세요.');
    }
    // for (let [key, value] of Object.entries(checkBox)) {
    //   if (!value) {
    //     return alert(`[${key}] 확인해주세요.`);
    //   }
    // }

    try {
      // console.log('tw123', delete activeInfo.emailConsent, activeInfo);
      delete activeInfo.all;
      const signUpInfo = {...signInfo, ...activeInfo};
      // console.log('tw1234', signUpInfo);

      console.log('tw2', signUpInfo);
      await SIGN_SERVICE.signUp(signUpInfo);
      // console.log('tw:', signInfo);
      setModalVisible(true);
      // initState();
    } catch (error) {
      alert('회원가입에 실패했습니다.');
    }
  };

  // useEffect(() => {
  //   console.log(signInfo);
  // }, [signInfo]);
  // useEffect(() => {
  //   console.log(activeInfo);
  // }, [activeInfo]);
  // useEffect(() => {
  //   console.log(checkBox);
  // }, [checkBox]);
  // useEffect(() => {
  //   console.log(valid);
  // }, [valid]);
  // useEffect(() => {
  //   console.log(digitCode);
  // }, [digitCode]);

  const [seconds, setSeconds] = useState<any>({
    phone: 0,
    email: 0,
  });

  const [minutes, setMinutes] = useState<any>({
    phone: 0,
    email: 0,
  });

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

  const initTime = useRef<any>({phone: 0, email: 0});
  const interval = useRef<any>({phone: null, email: null});
  const [time, setTime] = useState<any>({
    phone: {
      min: '0',
      sec: '0',
    },
    email: {
      min: '0',
      sec: '0',
    },
  });

  const [validationTime, setValidationTime] = useState<any>({
    email: false,
    phone: false,
  });
  const timerStart = (key: string) => {
    try {
      if (validationTime[key]) return;
      initTime.current[key] = 4 * 60;
      console.log(`${key} 타이머가 작동을 시작합니다.`);
      interval.current[key] = setInterval(() => {
        if (initTime.current[key] < 1) {
          clearInterval(interval.current[key]);
          setValidationTime(cur => ({...cur, [key]: true}));
        }

        const min = initTime.current[key] / 60;
        const sec = initTime.current[key] % 60;
        initTime.current[key] -= 1;
        const tmpObj = {
          min: String(Math.floor(min)).padStart(2, '0'),
          sec: String(sec).padStart(2, '0'),
        };
        setTime((cur): any => ({...cur, [key]: tmpObj}));
      }, 1000);

      return () => clearInterval(interval.current[key]);
    } catch (error) {
      console.error(error);
    }
  };

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
                  color: 'black',
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
            onBlur={() => {
              pwdValidationHandler();
            }}
            onChangeText={setSignInfoHandler(ESignInfoKey.pwd)}></TextInput>
          {pwdValidationCheck ? null : (
            <Text style={styles.pwdValidationText}>형식에 맞지 않습니다.</Text>
          )}
          <TextInput
            style={styles.inputbox2}
            placeholder="비밀번호 확인"
            placeholderTextColor="black"
            value={curPwd}
            secureTextEntry={true}
            onChangeText={text => setCurPwd(text)}
            onBlur={() => {
              pwdEqualCheckHandler();
            }}></TextInput>
          {pwdEqualCheck ? null : (
            <Text style={styles.pwdValidationText}>
              비밀번호를 확인해주세요.
            </Text>
          )}

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TextInput
              style={styles.inputbox1}
              placeholder="휴대폰"
              placeholderTextColor="black"
              value={signInfo?.phone}
              onChangeText={setSignInfoHandler(ESignInfoKey.phone)}></TextInput>
            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => {
                timerStart('phone');
                sendDigitCodeHandler(EDigitCodeKey.phone);
              }}>
              {/* onPress={() => setValidHandler(EValidKey.phone)}> */}
              <Text style={styles.buttonText}>인증요청</Text>
            </TouchableOpacity>
          </View>
          {phoneValidationCheckText ? (
            <>
              <Text style={styles.phoneValidText}>
                인증번호를 발송했습니다. (유효시간 4분)
              </Text>
              <Text style={styles.phoneValidText2}>
                인증번호가 오지 않으면 입력하신 정보가 정확한지 확인하여주세요.
                이미 가입된 번호이거나, 가상전화번호는 인증번호를 받을 수
                없습니다.
              </Text>
            </>
          ) : null}

          {authRequest.phone ? (
            <>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <TextInput
                  style={styles.inputbox1}
                  placeholder="핸드폰인증번호"
                  placeholderTextColor="black"
                  value={digitCode.phone}
                  onChangeText={setDigitCodeHandler(
                    EDigitCodeKey.phone
                  )}></TextInput>
                <Text
                  style={{color: 'black', marginTop: '8%', marginLeft: '-33%'}}>
                  {time.phone.min} : {time.phone.sec}
                </Text>
                <TouchableOpacity
                  style={styles.checkButton2}
                  onPress={() => setValidHandler(EValidKey.phone)}>
                  <Text style={styles.buttonText}>인증하기</Text>
                </TouchableOpacity>
              </View>
              {validationCheck.phone === true ? (
                <Text style={styles.pwdValidationText}>
                  인증번호를 확인해주세요.
                </Text>
              ) : (
                <Text style={styles.pwdValidationText}>인증 완료</Text>
              )}
            </>
          ) : (
            ''
          )}
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TextInput
              style={styles.inputbox1}
              placeholder="이메일"
              placeholderTextColor="black"
              value={signInfo?.email}
              onChangeText={setSignInfoHandler(ESignInfoKey.email)}></TextInput>
            <TouchableOpacity
              style={styles.checkButton}
              // onPress={() =>
              // timerStart()
              // sendDigitCodeHandler(EDigitCodeKey.email)}
              onPress={() => {
                timerStart('email');
                sendDigitCodeHandler(EDigitCodeKey.email);
              }}>
              <Text style={styles.buttonText}>인증요청</Text>
            </TouchableOpacity>
          </View>

          {authRequest.email ? (
            <>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <TextInput
                  style={styles.inputbox1}
                  placeholder="이메일인증번호"
                  placeholderTextColor="black"
                  value={digitCode.email}
                  onChangeText={setDigitCodeHandler(
                    EDigitCodeKey.email
                  )}></TextInput>
                <Text
                  style={{color: 'black', marginTop: '8%', marginLeft: '-33%'}}>
                  {time.email.min} : {time.email.sec}
                </Text>
                <TouchableOpacity
                  style={styles.checkButton2}
                  onPress={() => setValidHandler(EValidKey.email)}>
                  <Text style={styles.buttonText}>인증하기</Text>
                </TouchableOpacity>
              </View>
              {validationCheck.email === true ? (
                <Text style={styles.pwdValidationText}>
                  인증번호를 확인해주세요.
                </Text>
              ) : (
                <Text style={styles.pwdValidationText}>인증 완료</Text>
              )}
            </>
          ) : (
            ''
          )}
        </View>
        <View style={{marginTop: 10}}>
          <View>
            <View style={styles.checkboxcontainer}>
              <CheckBox
                style={styles.checkbox}
                value={checkBox.all}
                onChange={setCheckBoxHandler2(ESignCheckBoxKey.all)}></CheckBox>
              <Text style={styles.checkboxText}>전체 동의</Text>
            </View>
            <View style={styles.checkboxcontainer}>
              <CheckBox
                style={styles.checkbox}
                value={checkBox.termOfService}
                onChange={setCheckBoxHandler(
                  ESignCheckBoxKey.termOfService
                )}></CheckBox>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('TermsOfService');
                }}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={styles.checkboxText2}>필수</Text>
                  <Text style={styles.checkboxText}> 이용약관 [보기]</Text>
                </View>
              </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Privacy');
                }}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={styles.checkboxText2}>필수</Text>
                  <Text style={styles.checkboxText}>
                    개인정보수집 및 이용 [보기]
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {/* <View style={styles.checkboxcontainer}>
              <CheckBox
                style={styles.checkbox}
                value={checkBox.location}
                onChange={setCheckBoxHandler(
                  ESignCheckBoxKey.location
                )}></CheckBox>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={styles.checkboxText3}>선택</Text>
                <Text style={styles.checkboxText}>
                  위치기반서비스 이용약관 [보기]
                </Text>
              </View>
            </View> */}
          </View>
          <View>
            <View style={styles.checkboxcontainer}>
              <CheckBox
                style={styles.checkbox}
                value={checkBox.promotion}
                onChange={setCheckBoxHandler(
                  ESignCheckBoxKey.promotion
                )}></CheckBox>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Promotion');
                }}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={styles.checkboxText3}>선택</Text>
                  <Text style={styles.checkboxText}>
                    프로모션 정보수신약관 [보기]
                  </Text>
                </View>
              </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Marketing');
                }}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={styles.checkboxText3}>선택</Text>
                  <Text style={styles.checkboxText}>
                    마케팅,SNS,이메일 수신동의 [보기]
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={{color: 'red', fontSize: 13, marginLeft: '12%'}}>
          이용 약관과 개인정보수집 및 이용 안내에 모두 동의해주세요.
        </Text>
        <View>
          <TouchableOpacity
            style={styles.lastBtn}
            onPress={() => signUpHandler()}>
            <Text style={{color: 'white'}}>가입하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <TouchableOpacity style={{width: '100%'}}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText1}>환영합니다!</Text>
              <Text style={styles.modalText2}>
                NFT차량 가입이 완료됐습니다.
              </Text>
              <Text style={styles.modalText3}>
                차량번호 : {signInfo && signInfo.carNumber}
              </Text>
              <View style={styles.modalBtn}>
                <TouchableOpacity
                  // style={{backgroundColor: 'black'}}
                  onPress={() => {
                    initState();
                    navigation.push('Login2');
                  }}>
                  <Text style={styles.modalText4}>시작하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
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
    color: 'black',
  },
  inputbox2: {
    backgroundColor: 'white',
    width: '85%',
    height: 48,
    marginTop: 15,
    marginLeft: '9%',
    borderRadius: 10,
    paddingLeft: 15,
    color: 'black',
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
  checkButton2: {
    width: 58,
    height: 28,
    marginTop: '7%',
    borderRadius: 6,
    // marginLeft: '-20%',
    backgroundColor: '#879BB9',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '1%',
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'Noto Sans',
  },
  phoneValidText: {
    marginLeft: '12%',
    color: '#2D9DB6',
    fontSize: 12,
    marginTop: '1%',
  },
  phoneValidText2: {
    marginLeft: '12%',
    color: '#2D9DB6',
    fontSize: 12,
  },
  checkbox: {
    marginLeft: '7%',
    marginTop: '1%',
  },
  pwdValidationText: {
    color: 'red',
    marginLeft: '12%',
    fontSize: 12,
    marginTop: '1%',
  },
  validationCheck: {
    color: 'red',
    fontSize: 12,
    marginLeft: '12%',
    marginTop: '1%',
  },

  checkboxText: {
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 20,
    color: '#797979',
    marginLeft: '3%',
    marginTop: 10,
  },
  checkboxText2: {
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 20,
    color: '#226EC8',
    marginLeft: '3%',
    marginTop: 10,
  },
  checkboxText3: {
    fontFamily: 'Noto Sans',
    fontWeight: '600',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
  },
  modalContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginLeft: '10%',
    borderRadius: 20,
  },
  modalText1: {
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
    marginTop: '10%',
    fontFamily: 'Noto Sans',
  },
  modalText2: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    marginTop: '10%',
    fontFamily: 'Noto Sans',
  },
  modalText3: {
    fontSize: 14,
    color: '#226EC8',
    fontWeight: '500',
    fontFamily: 'Noto Sans',
  },
  modalText4: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '500',

    fontFamily: 'Noto Sans',
  },
  modalBtn: {
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    backgroundColor: '#A7C1CF',
    width: '100%',
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',

    marginBottom: '-10%',
  },
});

export default Login;
