import {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Alert,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Divider} from '@rneui/themed';
import CheckBox from '@react-native-community/checkbox';
import _ from 'lodash';
import API_SIGN_SERVICE from '../../@api/sign/sign';
import ModalCloseBtn from '../../assets/modalclosetbtn.svg';
import {regExp__pwd, regExp__email} from '../../@utility/reg';
import AlertCustom_2Btn from '../../components/alert/Alert2btn';
import AlertCustom_1btn from '../../components/alert/Alert1btn';
import {SignUpStyles} from '../../assets/css/login/signup';
import {Font} from '../../assets/css/global/newFont';
import {
  MarginLeft,
  MarginRight,
  MarginTop,
} from '../../assets/css/global/margin';
enum ESignInfoKey {
  carNumber = 'carNumber',
  email = 'email',
  pwd = 'pwd',
  phone = 'phone',
}
type TSignInfoKey = 'carNumber' | 'email' | 'pwd' | 'phone';
type TSignInfo = {
  [key in string]: string;
};

enum ECheckedInfoKey {
  checkPwd = 'checkPwd',
  digitCodePhone = 'phone',
  digitCodeEmail = 'email',
}
type TCheckedInfoKey = 'checkPwd' | 'phone' | 'email';
interface IDistCodeInfo {
  digitCode: string;
  isAllow: false;
}
type TCheckedInfo = {
  // TODO: type형태 제대로 작성해야함.
  [key in string]: any;
};

enum EPwdCheckedKey {
  reg = 'reg',
  same = 'same',
}
type TPwdCheckedKey = 'reg' | 'same';
type IPwdChecked = {
  [key in EPwdCheckedKey]: boolean | null;
};

type tmpType = {
  [key: string]: any;
};
const Login = ({navigation}: any) => {
  // alert
  const [modalVisible, setModalVisible] = useState({
    carNumberLength: false,
    carNumberDuplicate: false,
    emailValid: false,
    phoneValid: false,
    reValidNumber: false,
    signUpFaliure: false,
  });

  const SIGN_SERVICE = new API_SIGN_SERVICE();
  // 회원가입 정보
  const [signInfo, setSignInfo] = useState<TSignInfo>({
    carNumber: '',
    pwd: '',
    phone: '',
    email: '',
  });
  const regExp__pwd2 =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&\/])[A-Za-z\d$@$!%*#?&//]{8,}$/;

  console.log('정규식', regExp__pwd2.test('/answer4321'));
  // 회원 체크박스 정보
  const [activeInfo, setActiveInfo] = useState({
    termsOfService: 'N',
    privacy: 'N',
    promotion: 'N',
    marketing: 'N',
    emailConsent: 'N',
    snsConsent: 'N',
  });
  // 패스워드2, 인증번호 & 인증번호전송 가능여부
  const [checkedInfo, setCheckedInfo] = useState<TCheckedInfo>({
    checkPwd: '',
    phone: {digitCode: '', isAllow: false},
    email: {digitCode: '', isAllow: false},
  });
  // 차량 중복확인
  const [carNubmerOverLap, setCarNubmerOverLap] = useState<tmpType>({
    status: null,
    carNumber: null,
  });
  // 패스워드 정규표현식, 패스워드1,2 동일 여부
  const [pwdChecked, setPwdChecked] = useState<IPwdChecked>({
    reg: null,
    same: null,
  });
  // 휴대폰,이메일 인증요청시 타이머
  const initTime = useRef<any>({phone: 0, email: 0});
  const intervalTimer = useRef<any>({phone: null, email: null});
  const [timer, setTimer] = useState({
    phone: {
      min: '0',
      sec: '0',
    },
    email: {
      min: '0',
      sec: '0',
    },
  });
  // 휴대폰,이메일 인증요청시 하단 문구 출력여부
  const [showTextInput, setShowTextInput] = useState({
    phone: false,
    email: false,
  });
  // 체크박스 선택 여부
  const [checkBox, setCheckBox] = useState<tmpType>({
    termsOfService: false,
    privacy: false,
    promotion: false,
    snsEmailMarketing: false,
  });
  // 회원가입 올바르지 않은 값 확인용
  const [isAllowSignInfo, setIsAllowSignInfo] = useState({
    carNumber: false,
    pwd: false,
    phone: false,
    email: false,
    termsOfService: false,
    privacy: false,
  });
  // 회원가입 완료 모달
  const [signUpModal, setSignUpModal] = useState(false);
  // 로딩여부
  const [isLoding, setIsLoding] = useState(false);

  // 인증번호 재요청
  const [reSendDigitCode, setReSendDigitCode] = useState<tmpType>({
    phone: false,
    email: false,
  });

  // 네비게이션 함수
  const navigationPushHandler = (key: string) => () => {
    navigation.push(key);
  };

  // 차번호 중복 확인

  const carNumberOverLapCheckedHandler = async () => {
    const {carNumber} = signInfo;
    if (carNumber.length < 4) {
      // setModalVisible(true);
      Alert.alert('차량번호 확인해주세요.');
    } else {
    }

    try {
      setIsLoding(true);
      const duplicate = await SIGN_SERVICE.OverLapCar(signInfo.carNumber);
      setCarNubmerOverLap({status: duplicate, carNumber});
      setIsAllowSignInfo(cur => ({...cur, carNumber: true}));
    } catch (error) {
      alert('중복된 차량번호가 존재합니다.');
    } finally {
      setIsLoding(false);
    }
  };

  // 기본정보 입력
  const setSignInfoHandler = (key: TSignInfoKey) => (text: string) => {
    const value = text;
    setSignInfo(cur => ({...cur, [key]: value}));
  };

  // 비밀번호 확인 입력
  const setCheckedCheckPwdInfoHandler = (text: string) => {
    const value = text;
    setCheckedInfo(cur => ({...cur, checkPwd: value}));
  };

  // 패스워드 정규표현식 확인 && 패스워드 일치 확인
  const setPwdCheckedHandler = (key: TPwdCheckedKey) => () => {
    let value: boolean | null;
    if (key === EPwdCheckedKey.reg) {
      value = regExp__pwd.test(signInfo.pwd);
    }
    if (key === EPwdCheckedKey.same) {
      value = signInfo.pwd === checkedInfo.checkPwd;
    }
    setPwdChecked(cur => ({...cur, [key]: value}));
  };

  // 인증번호 전송 여부 확인
  const sendDigitCodeHandler = (key: TSignInfoKey) => async () => {
    if (!checkedInfo[key].isAllow) {
      return alert(`${key} 를 확인해주세요.`);
    }
    if (reSendDigitCode[key]) {
      Alert.alert(
        '인증번호를 받지 못하셨나요?',
        '인증요청을 다시 진행 할까요?',
        [
          {
            text: '네',
            onPress: () => {
              sendDigitCode(key);
            },
          },
          {
            text: '아니요',
            onPress: () => {
              return;
            },
          },
        ]
      );
    } else {
      sendDigitCode(key);
    }
  };

  // 인증번호 전송
  const sendDigitCode = async (key: string) => {
    try {
      const sendDigitCode =
        key === 'email' ? 'sendEmailDigitCode' : 'sendPhoneDigitCode';

      setIsLoding(true);
      const devTmp = await SIGN_SERVICE[sendDigitCode](signInfo[key]);
      setShowTextInput(cur => ({...cur, [key]: true}));
      setReSendDigitCode(cur => ({...cur, [key]: true}));
      startTimer(key);
      console.log(`[${key}] sendDigitCode : `, devTmp);
    } catch (error) {
      alert('인증 번호 전송에 실패했습니다.');
    } finally {
      setIsLoding(false);
    }
  };

  // 타이머 작동
  const startTimer = (key: string) => {
    if (intervalTimer.current[key]) {
      clearInterval(intervalTimer.current[key]);
    }

    initTime.current[key] = 60 * 4 - 1;
    intervalTimer.current[key] = setInterval(() => {
      if (initTime.current[key] < 1) {
        clearInterval(intervalTimer.current[key]);
      }
      const min = initTime.current[key] / 60;
      const sec = initTime.current[key] % 60;
      initTime.current[key] -= 1;

      const setTimerParam = {
        min: String(Math.floor(min)).padStart(2, '0'),
        sec: String(sec).padStart(2, '0'),
      };
      setTimer(cur => ({...cur, [key]: setTimerParam}));
    }, 1000);
  };

  // 인증번호 입력
  const setCheckedInfoDistCodeHandler = (key: string) => (text: string) => {
    const value = text;
    setCheckedInfo(cur => ({...cur, [key]: {...cur[key], digitCode: value}}));
  };
  // 인증번호 확인
  const checkedDigitCodeHandler = (key: string) => async () => {
    const digitCode = checkedInfo[key].digitCode;
    if (digitCode.length === 6) {
      try {
        const checkedDigitCode =
          key === 'email' ? 'checkEmailDigitCode' : 'checkPhoneDigitCode';

        const checkDigitCodeParam = {
          [key]: signInfo[key],
          digitCode,
        };
        setIsLoding(true);
        const isTure = await SIGN_SERVICE[checkedDigitCode](
          checkDigitCodeParam
        );
        setIsAllowSignInfo(cur => ({...cur, [key]: isTure}));
        if (!isTure) {
          throw new Error('인증번호가 일치하지 않습니다.');
        }
        clearInterval(intervalTimer.current[key]);
      } catch (error) {
        alert('인증번호가 일치하지 않습니다.');
      } finally {
        setIsLoding(false);
      }
    }
  };

  // 체크박스 선택 [ All ]
  const setAllCheckBoxHandler = () => {
    const checkBoxBoolean = Object.values(checkBox).some(el => el !== true);
    const activeInfoValue = checkBoxBoolean ? 'Y' : 'N';

    const tmpCheckBox: any = {};
    Object.keys(checkBox).map(key => {
      tmpCheckBox[key] = checkBoxBoolean;
    });
    setCheckBox(tmpCheckBox);

    const tmpActiveInfo: any = {};
    Object.keys(activeInfo).map(key => {
      tmpActiveInfo[key] = activeInfoValue;
    });
    setActiveInfo(tmpActiveInfo);
  };
  // 체크박스 선택 [ 단일 ]
  const setCheckBoxHandler = (key: string) => (e: any) => {
    const checkBoxBoolean = !checkBox[key];
    const activeInfoValue = checkBoxBoolean ? 'Y' : 'N';

    setCheckBox(cur => ({...cur, [key]: checkBoxBoolean}));
    setActiveInfoHandler(key, activeInfoValue);
  };
  const setActiveInfoHandler = (key: string, value: string) => {
    if (key === 'snsEmailMarketing') {
      const tmpObj: tmpType = {};
      ['marketing', 'emailConsent', 'snsConsent'].map(
        key => (tmpObj[key] = value)
      );
      setActiveInfo(cur => ({...cur, ...tmpObj}));
    } else {
      setActiveInfo(cur => ({...cur, [key]: value}));
    }
  };

  // 회원가입 신청
  const signUpHandler = async () => {
    let errorMsg;
    for (let [key, value] of Object.entries(isAllowSignInfo)) {
      if (!value) {
        switch (key) {
          case 'carNumber':
            errorMsg = '차량번호를 확인해주세요.';
            break;
          case 'pwd':
            errorMsg = '패스워드를 확인해주세요.';
            break;
          case 'phone':
            errorMsg = '연락처를 확인해주세요.';
            break;
          case 'email':
            errorMsg = '이메일를 확인해주세요.';
            break;
          case 'termsOfService':
            errorMsg = '[필수] 이용약관를 동의해주세요.';
            break;
          case 'privacy':
            errorMsg = '[필수] 개인정보수집 및 이용를 동의해주세요.';
            break;
        }
        if (errorMsg) break;
      }
    }
    if (errorMsg) return Alert.alert('필수조건 필요', errorMsg);

    try {
      setIsLoding(true);
      const signUpParams = {...signInfo, ...activeInfo};
      await SIGN_SERVICE.signUp(signUpParams);
      setSignUpModal(true);
    } catch (error) {
      alert('signUpHandler 회원가입 실패');
      setSignUpModal(false);
    } finally {
      setIsLoding(false);
    }
  };

  // 회원가입 완료 모달
  const signUpSuccessHandler = () => {
    setSignUpModal(false);
    navigation.navigate('Login2');
  };

  /**
   * useEffect Hook API
   */
  useEffect(() => {
    const {carNumber} = carNubmerOverLap;

    if (carNumber === signInfo.carNumber) {
      setCarNubmerOverLap(cur => ({...cur, status: false}));
    } else {
      setCarNubmerOverLap(cur => ({...cur, status: null}));
    }
  }, [signInfo.carNumber]);
  // 패스워드 일치 && 정규표현식 일치 확인
  useEffect(() => {
    if (pwdChecked.reg && pwdChecked.same) {
      setIsAllowSignInfo(cur => ({...cur, pwd: true}));
    }
  }, [pwdChecked]);
  // 휴대폰 11글자 확인 여부
  useEffect(() => {
    signInfo.phone.length === 11
      ? (setCheckedInfo(cur => ({
          ...cur,
          phone: {...cur.phone, isAllow: true},
        })),
        setIsAllowSignInfo(cur => ({...cur, phone: true})))
      : setCheckedInfo(cur => ({
          ...cur,
          phone: {...cur.phone, isAllow: false},
        })),
      setIsAllowSignInfo(cur => ({...cur, phone: false}));
  }, [signInfo.phone]);
  // 이메일 정규표현식 일치 확인
  useEffect(() => {
    regExp__email.test(signInfo.email)
      ? setCheckedInfo(cur => ({
          ...cur,
          email: {...cur.email, isAllow: true},
        }))
      : setCheckedInfo(cur => ({
          ...cur,
          email: {...cur.email, isAllow: false},
        }));
  }, [signInfo.email]);
  // 체크박스 필수 조건 여부 확인
  useEffect(() => {
    const {termsOfService, privacy} = activeInfo;
    if (termsOfService === 'Y') {
      setIsAllowSignInfo(cur => ({...cur, termsOfService: true}));
    } else {
      setIsAllowSignInfo(cur => ({...cur, termsOfService: false}));
    }
    if (privacy === 'Y') {
      setIsAllowSignInfo(cur => ({...cur, privacy: true}));
    } else {
      setIsAllowSignInfo(cur => ({...cur, privacy: false}));
    }
  }, [activeInfo]);
  useEffect(() => {
    const backAction = () => {
      Alert.alert('뒤로가기', '뒤로가기 누를 시 입력된 데이터가 사라집니다.', [
        {
          text: '취소',
          onPress: () => null,
        },
        {text: '확인', onPress: () => navigation.replace('Login2')},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
  }, [navigation]);

  return (
    <View style={SignUpStyles.Full}>
      <AlertCustom_1btn
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        errorMsg="Carnumber_length"></AlertCustom_1btn>
      <Modal transparent={true} visible={isLoding}>
        <ActivityIndicator
          size={'large'}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
      </Modal>
      <Modal animationType="fade" transparent={true} visible={signUpModal}>
        <View style={SignUpStyles.SignUpModalWrap}>
          <View style={SignUpStyles.SignUpModalView}>
            <View style={SignUpStyles.SignUpModalTop}>
              <View style={SignUpStyles.SignUpModalTopHead}>
                <TouchableOpacity
                  style={SignUpStyles.SignUpModalTopHeadBtn}
                  onPress={signUpSuccessHandler}>
                  <Text style={Font.SignUpModalClose}>X</Text>
                </TouchableOpacity>
              </View>
              <View style={SignUpStyles.SignUpModalTopBody}>
                <Text style={Font.SignUpModalTitle}>환영합니다!</Text>
                <Text style={Font.SignUpModalMiddleTop}>
                  NFT차량 가입이 완료됐습니다.
                </Text>
                <Text style={Font.SignUpModalCarNumber}>
                  차량번호 : {signInfo?.carNumber}
                </Text>
              </View>
            </View>
            <View style={SignUpStyles.SignUpModalBottom}>
              <TouchableOpacity
                style={SignUpStyles.SignUpModalBottomBtn}
                onPress={signUpSuccessHandler}>
                <Text style={Font.SignUpModalBtn}>시작하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={SignUpStyles.TopText}>
        <Text style={Font.SignUpTop}>회원가입</Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={SignUpStyles.ScrollView}>
        <View style={SignUpStyles.ViewWrap}>
          {/* 차량번호 */}
          <View style={SignUpStyles.FlexRowWithBtn}>
            <TextInput
              style={SignUpStyles.InputBoxWithBtn}
              placeholder="차량번호"
              onChangeText={setSignInfoHandler(ESignInfoKey.carNumber)}
              placeholderTextColor="#898989"
            />
            <TouchableOpacity
              style={SignUpStyles.InputBtn}
              onPress={carNumberOverLapCheckedHandler}>
              <Text style={Font.SignUpCheckBtn}>중복확인</Text>
            </TouchableOpacity>
          </View>
          <View style={SignUpStyles.FlexRowText}>
            {_.isNull(carNubmerOverLap.status) ? (
              ''
            ) : carNubmerOverLap.status ? (
              <View style={SignUpStyles.MsgContainer}>
                <Text style={Font.SignUpWarningMsg}>
                  사용 불가능한 차량번호입니다.
                </Text>
              </View>
            ) : (
              <View style={SignUpStyles.MsgContainer}>
                <Text style={Font.SignUpMsg}>사용 가능한 차량번호입니다.</Text>
              </View>
            )}
          </View>

          {/* 비밀번호 */}
          <View style={SignUpStyles.FlexRowinputBox}>
            <TextInput
              style={SignUpStyles.FlexRowinput}
              textContentType={'password'}
              placeholder="비밀번호 (영문+숫자+특수문자 : 8자리이상)"
              secureTextEntry={true}
              maxLength={20}
              onChangeText={setSignInfoHandler(ESignInfoKey.pwd)}
              onBlur={setPwdCheckedHandler('reg')}
              placeholderTextColor="#898989"
            />
          </View>
          <View style={SignUpStyles.FlexRowText}>
            {_.isNull(pwdChecked.reg) ? (
              ''
            ) : pwdChecked.reg ? (
              ''
            ) : (
              <View style={SignUpStyles.MsgContainer}>
                <Text style={Font.SignUpWarningMsg}>
                  영문+숫자+특수문자 : 8자리이상을 사용해주세요.
                </Text>
              </View>
            )}
          </View>

          {/* 비밀번호 확인 */}
          <View style={SignUpStyles.FlexRowinputBox}>
            <TextInput
              style={SignUpStyles.FlexRowinput}
              textContentType={'password'}
              secureTextEntry={true}
              maxLength={20}
              placeholder="비밀번호 확인"
              onChangeText={setCheckedCheckPwdInfoHandler}
              onBlur={setPwdCheckedHandler('same')}
              placeholderTextColor="#898989"
            />
          </View>
          <View style={SignUpStyles.FlexRowText}>
            {_.isNull(pwdChecked.same) ? (
              ''
            ) : pwdChecked.same ? (
              ''
            ) : (
              <View style={SignUpStyles.MsgContainer}>
                <Text style={Font.SignUpWarningMsg}>
                  비밀번호가 일치하지 않습니다.
                </Text>
              </View>
            )}
          </View>

          {/* 휴대폰 */}
          <View style={SignUpStyles.FlexRowWithBtn}>
            <TextInput
              style={SignUpStyles.InputBoxWithBtn}
              textContentType={'telephoneNumber'}
              keyboardType={'number-pad'}
              maxLength={11}
              placeholder="휴대폰"
              onChangeText={setSignInfoHandler(ESignInfoKey.phone)}
              placeholderTextColor="#898989"
            />
            {isAllowSignInfo.phone ? (
              <></>
            ) : (
              <TouchableOpacity
                style={SignUpStyles.InputBtn}
                onPress={sendDigitCodeHandler('phone')}>
                <Text style={Font.SignUpCheckBtn}>인증요청</Text>
              </TouchableOpacity>
            )}
          </View>

          {showTextInput.phone ? (
            <>
              {isAllowSignInfo.phone ? (
                <></>
              ) : (
                <View style={SignUpStyles.FlexRowText}>
                  <Text style={Font.SignUpSendValidNumText}>
                    인증번호를 발송했습니다.(유효시간 4분) 인증번호가오지 않으면
                    입력하신 정보가 정확한지 확인하여주세요. 이미 가입된
                    번호이거나, 가상전화번호는 인증번호를 받을 수 없습니다.
                  </Text>
                </View>
              )}
              <View style={SignUpStyles.FlexRowWithBtn}>
                <TextInput
                  style={SignUpStyles.InputBoxWithBtn}
                  editable={!isAllowSignInfo.phone}
                  keyboardType={'number-pad'}
                  maxLength={6}
                  placeholder="인증번호 입력하세요"
                  placeholderTextColor="#898989"
                  onChangeText={setCheckedInfoDistCodeHandler('phone')}
                  onBlur={checkedDigitCodeHandler('phone')}
                />

                <Text style={Font.SignUpTimer}>
                  {' '}
                  {isAllowSignInfo.phone
                    ? `인증완료`
                    : `${timer.phone.min} : ${timer.phone.sec}`}
                </Text>
              </View>
              {isAllowSignInfo.phone ? (
                <></>
              ) : (
                <View style={SignUpStyles.FlexRowText}>
                  <View style={SignUpStyles.MsgContainer}>
                    <Text style={Font.SignUpWarningMsg}>
                      인증번호를 다시 확인해주세요.
                    </Text>
                  </View>
                </View>
              )}
            </>
          ) : (
            <></>
          )}

          {/* 이메일 */}
          <View style={SignUpStyles.FlexRowWithBtn}>
            <TextInput
              style={SignUpStyles.InputBoxWithBtn}
              textContentType={'emailAddress'}
              keyboardType={'email-address'}
              placeholder="이메일"
              placeholderTextColor="#898989"
              onChangeText={setSignInfoHandler(ESignInfoKey.email)}
            />
            {isAllowSignInfo.email ? (
              <></>
            ) : (
              <TouchableOpacity
                style={SignUpStyles.InputBtn}
                onPress={sendDigitCodeHandler('email')}>
                <Text style={Font.SignUpCheckBtn}>인증요청</Text>
              </TouchableOpacity>
            )}
          </View>

          {showTextInput.email ? (
            <>
              {isAllowSignInfo.email ? (
                <></>
              ) : (
                <View style={SignUpStyles.FlexRowText}>
                  <Text style={Font.SignUpSendValidNumText}>
                    인증번호를 발송했습니다.(유효시간 4분) 인증번호가오지 않으면
                    입력하신 정보가 정확한지 확인하여주세요. 이미 가입된
                    이메일이거나, 존재하지 않는 이메일은 인증번호를 받을 수
                    없습니다.
                  </Text>
                </View>
              )}
              <View style={SignUpStyles.FlexRowWithBtn}>
                <TextInput
                  style={SignUpStyles.InputBoxWithBtn}
                  editable={!isAllowSignInfo.email}
                  keyboardType={'number-pad'}
                  maxLength={6}
                  placeholder="인증번호 입력하세요"
                  onChangeText={setCheckedInfoDistCodeHandler('email')}
                  placeholderTextColor="#898989"
                  onBlur={checkedDigitCodeHandler('email')}
                />
                <View>
                  <Text style={Font.SignUpTimer}>
                    {' '}
                    {isAllowSignInfo.email
                      ? `인증완료`
                      : `${timer.email.min} : ${timer.email.sec}`}
                  </Text>
                </View>
              </View>

              {isAllowSignInfo.email ? (
                <></>
              ) : (
                <View style={SignUpStyles.FlexRowText}>
                  <Text style={Font.SignUpWarningMsg}>
                    인증번호를 다시 확인해주세요.
                  </Text>
                </View>
              )}
            </>
          ) : (
            <></>
          )}

          {/* 체크박스 */}
          <View style={SignUpStyles.CheckBoxWrap}>
            <View style={SignUpStyles.CheckBoxView}>
              <CheckBox
                value={!Object.values(checkBox).some(el => el !== true)}
                onChange={setAllCheckBoxHandler}
                tintColors={{true: '#747474', false: 'black'}}
                onTintColor="white"
              />
              <TouchableOpacity
                style={SignUpStyles.CheckBoxLabelWrap}
                onPress={setAllCheckBoxHandler}>
                <Text style={{color: '#797979'}}>약관 전체동의</Text>
              </TouchableOpacity>
            </View>
            <Divider width={2} style={{marginBottom: 8, marginTop: 8}} />

            <View style={SignUpStyles.CheckBoxView}>
              <CheckBox
                value={checkBox.termsOfService}
                onChange={setCheckBoxHandler('termsOfService')}
                tintColors={{true: '#747474', false: 'black'}}
              />
              <TouchableOpacity
                style={SignUpStyles.CheckBoxLabelWrap}
                onPress={setCheckBoxHandler('termsOfService')}>
                <Text style={Font.SignUpEssential}>필수</Text>
                <View style={MarginLeft(5)}>
                  <Text style={Font.SignUpCheckBoxRightText}>이용약관</Text>
                </View>
              </TouchableOpacity>
              <Text
                style={Font.SignUpCheckBoxRightText}
                onPress={navigationPushHandler('TermsOfService')}>
                {' '}
                [내용보기]
              </Text>
            </View>
            <View style={SignUpStyles.CheckBoxView}>
              <CheckBox
                value={checkBox.privacy}
                onChange={setCheckBoxHandler('privacy')}
                tintColors={{true: '#747474', false: 'black'}}
              />
              <TouchableOpacity
                style={SignUpStyles.CheckBoxLabelWrap}
                onPress={setCheckBoxHandler('privacy')}>
                <Text style={Font.SignUpEssential}>필수</Text>
                <View style={MarginLeft(5)}>
                  <Text style={Font.SignUpCheckBoxRightText}>
                    개인정보수집 및 이용
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={Font.SignUpCheckBoxRightText}
                onPress={navigationPushHandler('Privacy')}>
                {' '}
                [내용보기]
              </Text>
            </View>
            <View style={SignUpStyles.CheckBoxView}>
              <CheckBox
                value={checkBox.promotion}
                onChange={setCheckBoxHandler('promotion')}
                tintColors={{true: '#747474', false: 'black'}}
              />
              <TouchableOpacity
                style={SignUpStyles.CheckBoxLabelWrap}
                onPress={setCheckBoxHandler('promotion')}>
                <Text style={Font.SignUpNotEssential}>선택</Text>
                <View style={MarginLeft(5)}>
                  <Text style={Font.SignUpCheckBoxRightText}>
                    프로모션 정보수신약관
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={Font.SignUpCheckBoxRightText}
                onPress={navigationPushHandler('Promotion')}>
                {' '}
                [내용보기]
              </Text>
            </View>
            <View style={SignUpStyles.CheckBoxView}>
              <CheckBox
                value={checkBox.snsEmailMarketing}
                onChange={setCheckBoxHandler('snsEmailMarketing')}
                tintColors={{true: '#747474', false: 'black'}}
              />
              <TouchableOpacity
                style={SignUpStyles.CheckBoxLabelWrap}
                onPress={setCheckBoxHandler('snsEmailMarketing')}>
                <Text style={Font.SignUpNotEssential}>선택</Text>
                <View style={MarginLeft(5)}>
                  <Text style={Font.SignUpCheckBoxRightText}>
                    마케팅,SNS,이메일 수신동의
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={Font.SignUpCheckBoxRightText}
                onPress={navigationPushHandler('Marketing')}>
                {' '}
                [내용보기]
              </Text>
            </View>
            <View style={SignUpStyles.CheckBoxView}></View>
          </View>
          <View style={SignUpStyles.FlexRow}>
            <TouchableOpacity
              style={SignUpStyles.LastBtn}
              onPress={signUpHandler}>
              <Text style={Font.SignUpCheckBtn}>가입하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
