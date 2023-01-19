import {useEffect, useRef, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from 'react-native';
import API_Mypage from '../../@api/mypage/Mypage';
import TopNav from '../../components/topNav/TopNav';
import API_SIGN_SERVICE from '../../@api/sign/sign';
import {regExp_phone} from '../../@utility/reg';
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

  return (
    <View style={styles.full}>
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
      <View
        style={{
          marginLeft: '9%',
          borderRadius: 10,
          width: '82%',
          marginTop: '5%',
          height: '6%',
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <Text style={styles.text}>{route.params.phoneNumber}</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <TextInput
          style={styles.inputbox}
          placeholder="새 휴대폰 번호"
          placeholderTextColor="#898989"
          maxLength={11}
          onChangeText={text => {
            setNewPhoneNumber(text);
          }}></TextInput>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={() => {
            validPhoneNumber();
          }}>
          <Text style={styles.buttonText}>인증요청</Text>
        </TouchableOpacity>
      </View>
      {validationText ? (
        <>
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <TextInput
              style={styles.inputbox}
              placeholder="휴대폰인증번호"
              placeholderTextColor="#898989"
              onChangeText={text => {
                setDigitCode(text);
              }}></TextInput>
            <Text style={{color: 'black', marginTop: '7%', marginLeft: '-33%'}}>
              {time.min} : {time.sec}
            </Text>
            <TouchableOpacity
              style={styles.checkButton2}
              onPress={() => {
                validPhoneNumberCheck();
              }}
              disabled={(time.min === '00' && time.sec === '00') || validation}>
              <Text style={styles.buttonText}>인증하기</Text>
            </TouchableOpacity>
          </View>
          {validation ? (
            <Text style={styles.validationTimeText}>인증 되었습니다.</Text>
          ) : null}
          {time.min === '00' && time.sec === '00' ? (
            <Text style={styles.validationTimeText}>
              인증시간이 만료되었습니다. 다시 인증해주세요.
            </Text>
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
        style={styles.modifyBtn}
        onPress={() => {
          changePhoneNumber();
        }}
        disabled={validTimeCheck}>
        <Text style={styles.modifyBtnText}>수정 완료</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  full: {
    backgroundColor: '#F2F6F8',
    width: '100%',
    height: '100%',
  },
  inputbox: {
    backgroundColor: 'white',
    // color: '#898989',
    color: 'black',
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    fontSize: 15,
    marginLeft: '9%',
    borderRadius: 10,
    width: '82%',
    paddingLeft: 15,
    marginTop: '3%',
  },
  inputbox2: {
    backgroundColor: 'white',
    color: '#898989',
    //   color: 'black',
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    fontSize: 15,
    marginLeft: '9%',
    borderRadius: 10,
    width: '82%',
    paddingLeft: 15,

    marginTop: '3%',
  },
  image: {
    width: '12%',
    height: '100%',
  },

  PhoneNumberValidationText: {
    color: 'red',
    marginLeft: '9%',
    fontSize: 12,

    marginTop: '1%',
  },
  modifyBtn: {
    color: 'white',
    backgroundColor: '#6DADDB',
    width: '80%',
    borderRadius: 10,
    height: 60,
    marginTop: 20,
    marginLeft: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modifyBtnText: {
    fontFamily: 'Noto Sans',
    fontWeight: '700',
    fontSize: 17,
    color: 'white',
  },
  checkButton: {
    width: 58,
    height: 28,
    marginTop: '6%',
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
  checkButton2: {
    width: 58,
    height: 28,
    marginTop: '6%',
    borderRadius: 6,
    // marginLeft: '-20%',
    backgroundColor: '#879BB9',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '1%',
  },
  phoneValidationText: {
    color: 'red',
    marginLeft: '12%',
    fontSize: 12,
    marginTop: '1%',
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
  text: {
    // backgroundColor: 'white',
    // color: '#898989',
    color: 'black',
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    fontSize: 15,

    paddingLeft: 15,
  },
  validationTimeText: {
    color: 'black',
    marginLeft: '12%',
    marginTop: '1%',
    fontSize: 12,
  },
});
export default ChangePhoneNumber;
