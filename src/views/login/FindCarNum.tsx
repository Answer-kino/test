import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  BackHandler,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import API_SIGN_SERVICE from '../../@api/sign/sign';
import FindCarNumStyles from '../../assets/css/login/findCarNum';
import {Font} from '../../assets/css/global/newFont';
import {MarginRight, MarginTop} from '../../assets/css/global/margin';

const FindCarNum = ({navigation}: any) => {
  const SIGN_SERVICE = new API_SIGN_SERVICE();
  const initTime = useRef<any>({phone: 0});
  const intervalTimer = useRef<any>({phone: null});
  const [carNumber, setCarNumber] = useState('');
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
  const checkedDigitCodeHandler = async () => {
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
        setIsAllowPhone(isTure);
        if (!isTure) {
          throw new Error('인증번호가 일치하지 않습니다.');
        }
        let data = await SIGN_SERVICE.findCarNumber(phone);
        data = data.carNumbers;
        if (!data.length) {
          throw new Error('등록된 차량번호가 없습니다.');
        } else {
          setCarNumber(data[0].CarNumber);
          clearInterval(intervalTimer.current.phone);
        }
      } catch (error: any) {
        alert(error.message);
        if (error.message === '등록된 차량번호가 없습니다.') {
          setIsAllowPhone(false);
          setIsLoding(false);
        }
      } finally {
        setIsLoding(false);
      }
    }
  };
  return (
    <View style={FindCarNumStyles.Full}>
      <View>
        <Text style={Font.FindCarNumTopText}>차량번호 확인</Text>
      </View>
      <View style={MarginTop(20)}>
        <View style={FindCarNumStyles.FlexRowWithBtn}>
          <TextInput
            style={FindCarNumStyles.InputBoxWithBtn}
            textContentType={'telephoneNumber'}
            keyboardType={'number-pad'}
            maxLength={11}
            value={phone}
            placeholder="휴대폰 번호"
            onChangeText={setSignInfoHandler}
          />
          {isAllowPhone ? (
            <></>
          ) : (
            <TouchableOpacity
              style={FindCarNumStyles.InputBtn}
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
              <View style={FindCarNumStyles.FlexRowText}>
                <Text style={Font.SignUpSendValidNumText}>
                  인증번호를 발송했습니다.(유효시간 4분) 인증번호가오지 않으면
                  입력하신 정보가 정확한지 확인하여주세요. 이미 가입된
                  번호이거나, 가상전화번호는 인증번호를 받을 수 없습니다.
                </Text>
              </View>
            )}
            <View style={FindCarNumStyles.FlexRowWithBtn}>
              <TextInput
                style={FindCarNumStyles.InputBoxWithBtn}
                editable={!isAllowPhone}
                keyboardType={'number-pad'}
                maxLength={6}
                returnKeyType="done"
                placeholder="인증번호를 입력하세요"
                onChangeText={setCheckedInfoDistCodeHandler}
              />

              <Text style={Font.SignUpTimer}>
                {isAllowPhone
                  ? `인증완료`
                  : `${timer.phone.min} : ${timer.phone.sec}`}
              </Text>
            </View>
            {isAllowPhone ? (
              <></>
            ) : (
              <View style={FindCarNumStyles.FlexRowText}>
                <View style={MarginTop(5)}>
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
        {carNumber && (
          <View style={FindCarNumStyles.FlexRowWithBtn}>
            <Text style={Font.FindCarNumCarNumTextLeft}>차량번호: </Text>
            <Text selectable style={Font.FindCarNumCarNumTextRight}>
              {carNumber}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={FindCarNumStyles.LastBtn}
          onPress={() => {
            if (showTextInput.phone && !carNumber) {
              checkedDigitCodeHandler();
            } else {
              navigation.pop();
            }
          }}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
            {showTextInput.phone && !carNumber ? '인증하기' : '확인'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FindCarNum;
