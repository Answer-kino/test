import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  BackHandler,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_SIGN_SERVICE from '../../@api/sign/sign';
import FindPwdStyles from '../../assets/css/login/findPwd';
import {Font} from '../../assets/css/global/newFont';
import {MarginTop} from '../../assets/css/global/margin';

const FindPwd = ({navigation}: any) => {
  const SIGN_SERVICE = new API_SIGN_SERVICE();
  const initTime = useRef<any>({phone: 0});
  const intervalTimer = useRef<any>({phone: null});
  const [carNumber, setCarNumber] = useState('125가1234');
  const [phone, setPhone] = useState('');
  const [isAllowPhone, setIsAllowPhone] = useState(false);
  const [isLoding, setIsLoding] = useState(false);
  const [timer, setTimer] = useState({
    phone: {
      min: '0',
      sec: '0',
    },
  });
  const [showTextInput, setShowTextInput] = useState({
    phone: false,
  });
  const [checkedInfo, setCheckedInfo] = useState({
    digitCode: '',
    isAllow: false,
  });
  const [reSendDigitCode, setReSendDigitCode] = useState({
    phone: false,
  });

  const [valid, setValid] = useState(false);
  useEffect(() => {
    const backAction = () => {
      navigation.pop();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    phone.length === 11
      ? (setCheckedInfo(cur => ({...cur, isAllow: true})),
        setIsAllowPhone(true))
      : setCheckedInfo(cur => ({...cur, isAllow: false})),
      setIsAllowPhone(false);
  }, [phone]);
  const setSignInfoHandler = (text: string) => {
    const value = text;
    setPhone(value);
  };

  const sendDigitCodeHandler = async () => {
    if (!checkedInfo.isAllow) {
      return alert(`휴대폰 번호를 확인해주세요.`);
    }
    if (reSendDigitCode.phone) {
      Alert.alert(
        '인증번호를 받지 못하셨나요?',
        '인증요청을 다시 진행 할까요?',
        [
          {
            text: '네',
            onPress: () => {
              sendDigitCode();
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
      sendDigitCode();
    }
  };
  const sendDigitCode = async () => {
    try {
      const sendDigitCode = 'sendPhoneDigitCode';

      setIsLoding(true);
      const devTmp = await SIGN_SERVICE[sendDigitCode](phone);
      setShowTextInput({phone: true});
      setReSendDigitCode({phone: true});
      startTimer();
    } catch (error) {
      alert('인증 번호 전송에 실패했습니다.');
    } finally {
      setIsLoding(false);
    }
  };

  const startTimer = () => {
    if (intervalTimer.current.phone) {
      clearInterval(intervalTimer.current.phone);
    }

    initTime.current.phone = 60 * 4 - 1;
    intervalTimer.current.phone = setInterval(() => {
      if (initTime.current.phone < 1) {
        clearInterval(intervalTimer.current.phone);
      }
      const min = initTime.current.phone / 60;
      const sec = initTime.current.phone % 60;
      initTime.current.phone -= 1;

      const setTimerParam = {
        min: String(Math.floor(min)).padStart(2, '0'),
        sec: String(sec).padStart(2, '0'),
      };
      setTimer({phone: setTimerParam});
    }, 1000);
  };

  const setCheckedInfoDistCodeHandler = (text: string) => {
    const value = text;
    setCheckedInfo(cur => ({...cur, digitCode: value}));
  };
  const checkedDigitCodeHandler = () => async () => {
    const digitCode = checkedInfo.digitCode;
    if (digitCode.length === 6) {
      try {
        const checkedDigitCode = 'checkPhoneDigitCode';
        const checkDigitCodeParam = {
          phone: phone,
          digitCode,
        };
        setIsLoding(true);
        const isTure = await SIGN_SERVICE[checkedDigitCode](
          checkDigitCodeParam
        );
        if (!isTure) {
          throw new Error('인증번호가 일치하지 않습니다.');
        }
        await SIGN_SERVICE.findPwd(carNumber, phone);

        setIsAllowPhone(isTure);
        setValid(isTure);
        clearInterval(intervalTimer.current.phone);
      } catch (error: any) {
        console.log(error);
        alert(error.message);
      } finally {
        setIsLoding(false);
      }
    }
  };
  return (
    <View style={FindPwdStyles.Full}>
      <View>
        <Text style={Font.FindPwdTopText}>비밀번호 찾기</Text>
      </View>
      <View style={MarginTop(20)}>
        <TextInput
          style={FindPwdStyles.Inputbox1}
          placeholder="차량번호"
          placeholderTextColor="black"
          onChangeText={text => setCarNumber(text)}></TextInput>

        <View style={FindPwdStyles.FlexRowWithBtn}>
          <TextInput
            style={FindPwdStyles.InputBoxWithBtn}
            textContentType={'telephoneNumber'}
            keyboardType={'number-pad'}
            maxLength={11}
            value={phone}
            placeholder="휴대폰 번호"
            onChangeText={setSignInfoHandler}
            placeholderTextColor="black"
          />
          {isAllowPhone ? (
            <></>
          ) : (
            <TouchableOpacity
              style={FindPwdStyles.InputBtn}
              onPress={sendDigitCodeHandler}>
              <Text style={Font.SignUpCheckBtn}>인증요청</Text>
            </TouchableOpacity>
          )}
        </View>

        {showTextInput.phone ? (
          <>
            {isAllowPhone ? (
              <></>
            ) : (
              <View style={FindPwdStyles.FlexRowText}>
                <Text style={Font.SignUpSendValidNumText}>
                  인증번호를 발송했습니다.(유효시간 4분) 인증번호가오지 않으면
                  입력하신 정보가 정확한지 확인하여주세요. 이미 가입된
                  번호이거나, 가상전화번호는 인증번호를 받을 수 없습니다.
                </Text>
              </View>
            )}
            <View style={FindPwdStyles.FlexRowWithBtn}>
              <TextInput
                style={FindPwdStyles.InputBoxWithBtn}
                editable={!isAllowPhone}
                keyboardType={'number-pad'}
                maxLength={6}
                returnKeyType="done"
                placeholder="인증번호 입력하세요"
                onChangeText={setCheckedInfoDistCodeHandler}
                // onBlur={checkedDigitCodeHandler()}
              />
              {/* 인증하기를 누르면 임시 비밀번호가 전송되었습니다 문구 보이고 그 밑에 확인 버튼 */}
              <View>
                <Text style={Font.SignUpTimer}>
                  {isAllowPhone
                    ? `인증완료`
                    : `${timer.phone.min} : ${timer.phone.sec}`}
                </Text>
              </View>
            </View>
            {isAllowPhone ? (
              <>
                <View style={FindPwdStyles.FlexRowText}>
                  <Text style={Font.FindPwdValidSuccess}>인증 완료</Text>
                </View>
                <View style={FindPwdStyles.FlexRowText}>
                  <Text style={Font.FindPwdSendValidNumText}>
                    휴대폰 번호로 임시 비밀번호를 보내드렸습니다. 로그인 후
                    비밀번호를 변경해 주십시오.
                  </Text>
                </View>
              </>
            ) : (
              <View style={FindPwdStyles.FlexRowText}>
                <Text style={Font.FindPwdWarningMsg}>
                  인증번호를 다시 확인해주세요.
                </Text>
              </View>
            )}
            {!valid ? (
              <TouchableOpacity
                style={FindPwdStyles.LastBtn}
                onPress={checkedDigitCodeHandler()}>
                <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
                  인증하기
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={FindPwdStyles.LastBtn}
                onPress={() => {
                  navigation.pop();
                }}>
                <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
                  확인
                </Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <></>
        )}

        {/* <TouchableOpacity
          style={styles.lastBtn}
          onPress={() => navigation.pop()}>
          <Text style={{color: 'white'}}>로그인</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default FindPwd;
