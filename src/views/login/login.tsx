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
import AlertCustom_2Btn from '../../components/alert/alert2btn';
import AlertCustom_1btn from '../../components/alert/alert1btn';
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
        <View style={styles.signUpModalWrap}>
          <View style={styles.signUpModalView}>
            <View style={styles.signUpModalTop}>
              <View style={styles.signUpModalTopHead}>
                <TouchableOpacity
                  style={styles.signUpModalTopHeadBtn}
                  onPress={signUpSuccessHandler}>
                  <Text style={styles.signUpModalTopHeadText}>X</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.signUpModalTopBody}>
                <Text style={styles.signUpModalTopBodyTitle}>환영합니다!</Text>
                <Text style={styles.signUpModalTopBodyContent}>
                  NFT차량 가입이 완료됐습니다.
                </Text>
                <Text style={styles.signUpModalTopBodyCarNumber}>
                  차량번호 : {signInfo?.carNumber}
                </Text>
              </View>
            </View>
            <View style={styles.signUpModalBottom}>
              <TouchableOpacity
                style={styles.signUpModalBottomBtn}
                onPress={signUpSuccessHandler}>
                <Text style={styles.signUpModalBottomText}>시작하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View>
        <Text style={styles.TopText}>회원가입</Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.viewWrap}>
          {/* 차량번호 */}
          <View style={styles.flexRowWithBtn}>
            <TextInput
              style={styles.inputBoxWithBtn}
              placeholder="차량번호"
              onChangeText={setSignInfoHandler(ESignInfoKey.carNumber)}
              placeholderTextColor="#898989"
            />
            <TouchableOpacity
              style={styles.inputBtn}
              onPress={carNumberOverLapCheckedHandler}>
              <Text style={styles.inputText}>중복확인</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flexRowText}>
            {_.isNull(carNubmerOverLap.status) ? (
              ''
            ) : carNubmerOverLap.status ? (
              <Text style={styles.errorMsg}>사용 불가능한 차량번호입니다.</Text>
            ) : (
              <Text style={styles.successMsg}>사용 가능한 차량번호입니다.</Text>
            )}
          </View>

          {/* 비밀번호 */}
          <View style={styles.flexRowinputBox}>
            <TextInput
              style={styles.flexRowinput}
              textContentType={'password'}
              placeholder="비밀번호 (영문+숫자+특수문자 : 8자리이상)"
              secureTextEntry={true}
              maxLength={20}
              onChangeText={setSignInfoHandler(ESignInfoKey.pwd)}
              onBlur={setPwdCheckedHandler('reg')}
              placeholderTextColor="#898989"
            />
          </View>
          <View style={styles.flexRowText}>
            {_.isNull(pwdChecked.reg) ? (
              ''
            ) : pwdChecked.reg ? (
              ''
            ) : (
              <Text style={styles.errorMsg}>
                영문+숫자+특수문자 : 8자리이상을 사용해주세요.
              </Text>
            )}
          </View>

          {/* 비밀번호 확인 */}
          <View style={styles.flexRowinputBox}>
            <TextInput
              style={styles.flexRowinput}
              textContentType={'password'}
              secureTextEntry={true}
              maxLength={20}
              placeholder="비밀번호 확인"
              onChangeText={setCheckedCheckPwdInfoHandler}
              onBlur={setPwdCheckedHandler('same')}
              placeholderTextColor="#898989"
            />
          </View>
          <View style={styles.flexRowText}>
            {_.isNull(pwdChecked.same) ? (
              ''
            ) : pwdChecked.same ? (
              ''
            ) : (
              <Text style={styles.errorMsg}>비밀번호가 일치하지 않습니다.</Text>
            )}
          </View>

          {/* 휴대폰 */}
          <View style={styles.flexRowWithBtn}>
            <TextInput
              style={styles.inputBoxWithBtn}
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
                style={styles.inputBtn}
                onPress={sendDigitCodeHandler('phone')}>
                <Text style={styles.inputText}>인증요청</Text>
              </TouchableOpacity>
            )}
          </View>

          {showTextInput.phone ? (
            <>
              {isAllowSignInfo.phone ? (
                <></>
              ) : (
                <View style={styles.flexRowText}>
                  <Text style={styles.warringMsg}>
                    인증번호를 발송했습니다.(유효시간 4분) 인증번호가오지 않으면
                    입력하신 정보가 정확한지 확인하여주세요. 이미 가입된
                    번호이거나, 가상전화번호는 인증번호를 받을 수 없습니다.
                  </Text>
                </View>
              )}
              <View style={styles.flexRowWithBtn}>
                <TextInput
                  style={styles.inputBoxWithBtn}
                  editable={!isAllowSignInfo.phone}
                  keyboardType={'number-pad'}
                  maxLength={6}
                  placeholder="인증번호 입력하세요"
                  placeholderTextColor="#898989"
                  onChangeText={setCheckedInfoDistCodeHandler('phone')}
                  onBlur={checkedDigitCodeHandler('phone')}
                />
                <View>
                  <Text style={styles.inputTimer}>
                    {isAllowSignInfo.phone
                      ? `인증완료`
                      : `${timer.phone.min} : ${timer.phone.sec}`}
                  </Text>
                </View>
              </View>
              {isAllowSignInfo.phone ? (
                <></>
              ) : (
                <View style={styles.flexRowText}>
                  <Text style={styles.errorMsg}>
                    인증번호를 다시 확인해주세요.
                  </Text>
                </View>
              )}
            </>
          ) : (
            <></>
          )}

          {/* 이메일 */}
          <View style={styles.flexRowWithBtn}>
            <TextInput
              style={styles.inputBoxWithBtn}
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
                style={styles.inputBtn}
                onPress={sendDigitCodeHandler('email')}>
                <Text style={styles.inputText}>인증요청</Text>
              </TouchableOpacity>
            )}
          </View>

          {showTextInput.email ? (
            <>
              {isAllowSignInfo.email ? (
                <></>
              ) : (
                <View style={styles.flexRowText}>
                  <Text style={styles.warringMsg}>
                    인증번호를 발송했습니다.(유효시간 4분) 인증번호가오지 않으면
                    입력하신 정보가 정확한지 확인하여주세요. 이미 가입된
                    이메일이거나, 존재하지 않는 이메일은 인증번호를 받을 수
                    없습니다.
                  </Text>
                </View>
              )}
              <View style={styles.flexRowWithBtn}>
                <TextInput
                  style={styles.inputBoxWithBtn}
                  editable={!isAllowSignInfo.email}
                  keyboardType={'number-pad'}
                  maxLength={6}
                  placeholder="인증번호 입력하세요"
                  onChangeText={setCheckedInfoDistCodeHandler('email')}
                  placeholderTextColor="#898989"
                  onBlur={checkedDigitCodeHandler('email')}
                />
                <View>
                  <Text style={styles.inputTimer}>
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
                <View style={styles.flexRowText}>
                  <Text style={styles.errorMsg}>
                    인증번호를 다시 확인해주세요.
                  </Text>
                </View>
              )}
            </>
          ) : (
            <></>
          )}

          {/* 체크박스 */}
          <View style={styles.checkBoxWrap}>
            <View style={styles.checkBoxView}>
              <CheckBox
                value={!Object.values(checkBox).some(el => el !== true)}
                onChange={setAllCheckBoxHandler}
                tintColors={{true: '#747474', false: 'black'}}
                onTintColor="white"
              />
              <TouchableOpacity
                style={styles.checkBoxLabelWrap}
                onPress={setAllCheckBoxHandler}>
                <Text style={{color: '#797979'}}>약관 전체동의</Text>
              </TouchableOpacity>
            </View>
            <Divider width={2} style={{marginBottom: 8, marginTop: 8}} />
            <View style={styles.checkBoxView}>
              <CheckBox
                value={checkBox.termsOfService}
                onChange={setCheckBoxHandler('termsOfService')}
                tintColors={{true: '#747474', false: 'black'}}
              />
              <TouchableOpacity
                style={styles.checkBoxLabelWrap}
                onPress={setCheckBoxHandler('termsOfService')}>
                <Text style={styles.requirementsMsg}>필수</Text>
                <Text style={{color: '#797979'}}>이용약관</Text>
              </TouchableOpacity>
              <Text
                style={{color: '#797979'}}
                onPress={navigationPushHandler('TermsOfService')}>
                {' '}
                [내용보기]
              </Text>
            </View>
            <View style={styles.checkBoxView}>
              <CheckBox
                value={checkBox.privacy}
                onChange={setCheckBoxHandler('privacy')}
                tintColors={{true: '#747474', false: 'black'}}
              />
              <TouchableOpacity
                style={styles.checkBoxLabelWrap}
                onPress={setCheckBoxHandler('privacy')}>
                <Text style={styles.requirementsMsg}>필수</Text>
                <Text style={{color: '#797979'}}>개인정보수집 및 이용</Text>
              </TouchableOpacity>
              <Text
                style={{color: '#797979'}}
                onPress={navigationPushHandler('Privacy')}>
                {' '}
                [내용보기]
              </Text>
            </View>
            <View style={styles.checkBoxView}>
              <CheckBox
                value={checkBox.promotion}
                onChange={setCheckBoxHandler('promotion')}
                tintColors={{true: '#747474', false: 'black'}}
              />
              <TouchableOpacity
                style={styles.checkBoxLabelWrap}
                onPress={setCheckBoxHandler('promotion')}>
                <Text style={styles.selectionMsg}>선택</Text>
                <Text style={{color: '#797979'}}>프로모션 정보수신약관</Text>
              </TouchableOpacity>
              <Text
                style={{color: '#797979'}}
                onPress={navigationPushHandler('Promotion')}>
                {' '}
                [내용보기]
              </Text>
            </View>
            <View style={styles.checkBoxView}>
              <CheckBox
                value={checkBox.snsEmailMarketing}
                onChange={setCheckBoxHandler('snsEmailMarketing')}
                tintColors={{true: '#747474', false: 'black'}}
              />
              <TouchableOpacity
                style={styles.checkBoxLabelWrap}
                onPress={setCheckBoxHandler('snsEmailMarketing')}>
                <Text style={styles.selectionMsg}>선택</Text>
                <Text style={{color: '#797979'}}>
                  마케팅,SNS,이메일 수신동의
                </Text>
              </TouchableOpacity>
              <Text
                style={{color: '#797979'}}
                onPress={navigationPushHandler('Marketing')}>
                {' '}
                [내용보기]
              </Text>
            </View>
            <View style={styles.checkBoxView}>
              <Text style={{color: 'red', fontSize: 13}}>
                이용 약관과 개인정보수집 및 이용 안내에 모두 동의해주세요.
              </Text>
            </View>
          </View>
          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.lastBtn} onPress={signUpHandler}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
                가입하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height,
  },
  // signUpModal
  signUpModalWrap: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
  },
  signUpModalView: {
    width: '80%',
    height: 200,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 15,
  },
  signUpModalTop: {height: '75%'},
  signUpModalTopHead: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  signUpModalTopHeadBtn: {
    backgroundColor: 'black',
    width: 33,
    height: 33,
    borderRadius: 100,
    marginTop: 10,
    marginRight: 10,
  },
  signUpModalTopHeadText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 33,
    textAlign: 'center',
  },
  signUpModalTopBody: {
    display: 'flex',
    alignItems: 'center',
  },
  signUpModalTopBodyTitle: {
    color: '#292929',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 35,
    marginBottom: 10,
  },
  signUpModalTopBodyContent: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  signUpModalTopBodyCarNumber: {
    color: '#226EC8',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  signUpModalBottom: {
    display: 'flex',
    height: '25%',
    backgroundColor: '#73A2D9',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  signUpModalBottomBtn: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpModalBottomText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 20,
  },

  // main
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
  viewWrap: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '85%',
  },
  flexRowText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  flexRowinputBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    backgroundColor: 'white',
    height: 48,
    borderRadius: 10,
    marginBottom: 10,
  },
  flexRowinput: {
    display: 'flex',
    flex: 1,
    color: 'black',
    marginLeft: 5,
  },
  flexRowWithBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    backgroundColor: 'white',
    height: 48,
    borderRadius: 10,
    marginBottom: 10,
  },
  inputBoxWithBtn: {
    display: 'flex',
    flex: 1,
    color: 'black',
    marginLeft: 5,
  },
  inputBtn: {
    width: 58,
    height: 33,
    borderRadius: 6,
    backgroundColor: '#879BB9',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  inputTimer: {
    width: 58,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
    color: '#898989',
  },
  inputText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 28,
    color: '#FFFFFF',
  },
  checkBoxWrap: {
    width: '85%',
  },
  checkBoxView: {
    display: 'flex',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkBoxLabelWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  requirementsMsg: {
    fontFamily: 'Noto Sans',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20,
    color: '#226EC8',
    marginRight: 5,
  },
  selectionMsg: {
    fontFamily: 'Noto Sans',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20,
    color: '#000000',
    marginRight: 5,
  },
  successMsg: {
    width: '100%',
    textAlign: 'left',
    color: 'black',
    fontSize: 12,
    marginBottom: 10,
  },
  warringMsg: {
    width: '100%',
    textAlign: 'left',
    color: '#2D0DB6',
    fontSize: 12,
    marginBottom: 10,
  },
  errorMsg: {
    width: '100%',
    textAlign: 'left',
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  lastBtn: {
    flex: 1,
    width: '80%',
    height: 51,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#6DADDB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
