import {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import API_Mypage from '../../@api/mypage/Mypage';
import TopNav from '../../components/topNav/TopNav';
import API_SIGN_SERVICE from '../../@api/sign/sign';
import {regExp_phone} from '../../@utility/reg';
import {changeStyles} from '../../assets/css/mypage/change';
import {globalStyles} from '../../assets/css/global/styleSheet';
import {MarginTop} from '../../assets/css/global/margin';
import {Font} from '../../assets/css/global/newFont';

const ChangePhoneNumber = ({navigation, route}: any) => {
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>('');
  const [validationText, setValidationText] = useState(false);
  const [validation, setValidation] = useState(false);
  const [digitCode, setDigitCode] = useState('');
  const initTime = useRef<any>({phone: 0});
  const interval = useRef<any>(null);
  const [validTimeCheck, setValidTimeCheck] = useState(false);
  const [time, setTime] = useState<any>({
    min: '0',
    sec: '0',
  });

  const Mypage = new API_Mypage();
  const Valid = new API_SIGN_SERVICE();
  const [validationTime, setValidationTime] = useState<any>({
    phone: false,
  });
  // 로딩여부
  const [isLoding, setIsLoding] = useState(false);
  const timerStart = () => {
    try {
      // if (validationTime[]) return;
      if (interval.current) {
        clearInterval(interval.current);
      }

      // initTime.current[] = 4 * 60;
      initTime.current = 240;
      // console.log(`${} 타이머가 작동을 시작합니다.`);
      interval.current = setInterval(() => {
        if (initTime.current < 1) {
          clearInterval(interval.current);
          // setValidationTime((cur: any) => ({...cur, []: true}));
        }
        const min = initTime.current / 60;
        const sec = initTime.current % 60;
        initTime.current -= 1;

        const tmpObj = {
          min: String(Math.floor(min)).padStart(2, '0'),
          sec: String(sec).padStart(2, '0'),
        };
        setTime(tmpObj);
      }, 1000);

      return () => clearInterval(interval.current);
    } catch (error) {
      console.error(error);
    }
  };

  const changePhoneNumber = async () => {
    if (validation === true) {
      const phone = newPhoneNumber;
      console.log(newPhoneNumber);
      try {
        setIsLoding(true);
        await Mypage.changePhoneNumber(phone);
        navigation.replace('Mypage');
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoding(false);
      }
    } else {
      alert('핸드폰을 인증해주세요.');
    }
  };
  const validPhoneNumber = async () => {
    const type = 'phone';
    const redisKey = newPhoneNumber;
    if (newPhoneNumber.length !== 11 || !regExp_phone.test(newPhoneNumber)) {
      alert('휴대폰 번호를 다시 확인해주세요.');
    } else {
      try {
        setValidationText(true);
        setIsLoding(true);
        const result = await Mypage.validPhoneNumber({type, redisKey});
        if (result.success) {
          timerStartHandler();
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoding(false);
      }
    }
  };

  const timerStartHandler = () => {
    console.log(interval.current);
    if (interval.current) {
      showConfirmTimerHandler();
    } else {
      timerStart();
    }
  };

  const validPhoneNumberCheck = async () => {
    const phone = newPhoneNumber;
    try {
      console.log('digitcode', digitCode);
      setIsLoding(true);
      const result = await Valid.checkPhoneDigitCode({phone, digitCode});
      console.log('수정완료', result);
      if (result.digitCode === false) {
        alert('인증번호가 틀립니다.');
      } else {
        setValidation(true);
        clearInterval(interval.current);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoding(false);
    }
  };

  const showConfirmTimerHandler = () => {
    return Alert.alert(
      '인증번호가 도착하지 않았습니까?',
      '새로운 인증번호를 발급 받으시겠습니까?',
      [
        {
          text: '네',
          onPress: () => {
            setValidation(false);
            timerStart();
          },
        },
        {
          text: '아니오',
        },
      ]
    );
  };
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={globalStyles.BodyWrap}>
      <Modal transparent={true} visible={isLoding}>
        <ActivityIndicator
          size={'large'}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
      </Modal>
      <TopNav navigation={navigation} title="휴대폰 번호 변경" />

      <View style={globalStyles.MainWrap}>
        <View style={MarginTop('5%')} />
        <TextInput
          style={changeStyles.TextInput}
          editable={false}
          value={route.params.phoneNumber}
        />
        <View style={MarginTop(15)} />
        <View style={changeStyles.TextInputThreeQuartersWrap}>
          <TextInput
            style={changeStyles.TextInputThreeQuarters}
            placeholder="새 휴대폰 번호"
            placeholderTextColor="#898989"
            maxLength={11}
            onChangeText={text => {
              setNewPhoneNumber(text);
            }}
          />
          <View style={changeStyles.TextInputWithBtnWrap}>
            <TouchableOpacity
              style={changeStyles.TextInputWithBtn}
              onPress={() => {
                validPhoneNumber();
              }}>
              <Text style={Font.SignUpCheckBtn}>인증요청</Text>
            </TouchableOpacity>
          </View>
        </View>

        {validationText ? (
          <>
            <>
              <View style={{marginVertical: 10}}>
                <Text style={Font.SignUpSendValidNumText}>
                  인증번호를 발송했습니다. (유효시간 4분)
                  {'\n'}
                  인증번호가 오지 않으면 입력하신 정보가 정확한지
                  확인하여주세요. 이미 가입된 번호이거나, 가상전화번호는
                  인증번호를 받을 수 없습니다.
                </Text>
              </View>
            </>
            <View style={changeStyles.TextInputThreeQuartersWrap}>
              <TextInput
                style={changeStyles.TextInputThreeQuarters}
                placeholder="휴대폰인증번호"
                placeholderTextColor="#898989"
                onChangeText={text => {
                  setDigitCode(text);
                }}
              />
              <View style={changeStyles.TextInputWithBtnWithTimerWrap}>
                <View style={changeStyles.TextInputWithBtnWithTimer}>
                  <View style={changeStyles.TextInputWithTimer}>
                    <Text style={Font.SignUpTimer}>
                      {time.min} : {time.sec}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={changeStyles.TextInputWithBtn}
                    onPress={() => {
                      validPhoneNumberCheck();
                    }}
                    disabled={
                      (time.min === '00' && time.sec === '00') || validation
                    }>
                    <Text style={Font.SignUpCheckBtn}>인증하기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {validation ? (
              <View style={MarginTop(10)}>
                <Text style={Font.SignUpMsg}>인증 되었습니다.</Text>
              </View>
            ) : null}
            {time.min === '00' && time.sec === '00' ? (
              <View style={MarginTop(10)}>
                <Text style={Font.SignUpCheckBoxWarningText}>
                  인증시간이 만료되었습니다. 다시 인증해주세요.
                </Text>
              </View>
            ) : null}
            {/* {validationCheck.phone === true ? (
                <Text style={styles.phoneValidationText}>
                  인증번호를 확인해주세요.
                </Text>
              ) : (
                <Text style={styles.phoneValidationText}>인증 완료</Text>
              )} */}
          </>
        ) : null}

        {/* <TextInput
        style={styles.inputbox}
        placeholder="현재 휴대폰 번호"
        placeholderTextColor="#898989"
        onChangeText={text => {
          setCurPhoneNumber(text);
        }}
        secureTextEntry={true}></TextInput> */}

        <TouchableOpacity
          style={changeStyles.SubmitBtnWrap}
          onPress={() => {
            changePhoneNumber();
          }}
          disabled={validTimeCheck}>
          <Text style={Font.ChangePwdCheckBtn}>수정 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePhoneNumber;
