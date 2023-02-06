import {useEffect, useState} from 'react';
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
import {regExp__pwd} from '../../@utility/reg';
import _ from 'lodash';
import {changeStyles} from '../../assets/css/mypage/change';
import {globalStyles} from '../../assets/css/global/styleSheet';
import {MarginTop} from '../../assets/css/global/margin';
import {Font} from '../../assets/css/global/newFont';

const ChangePassword = ({navigation}: any) => {
  const MYPAGE_SERVICE = new API_Mypage();

  // 패스워드 정보
  const [pwdInfo, setPwdInfo] = useState<any>({
    curPwd: '',
    newPwd1: '',
    newPwd2: '',
  });

  // 패스워드 정규표현식, 패스워드1,2 동일 여부
  const [pwdChecked, setPwdChecked] = useState<any>({
    reg: null,
    same: null,
  });
  // 패스워드 올바르지 않은 값 확인용
  const [isAllowPwdInfo, setIsAllowPwdInfo] = useState({
    newPwd: false,
  });
  // 로딩여부
  const [isLoding, setIsLoding] = useState(false);

  // 네비게이션 함수
  const navigationReplaceHandler = (key: string) => {
    navigation.replace(key);
  };

  // 변경할 패스워드 입력

  const setPwdInfoHandler = (key: string) => (text: string) => {
    const value = text;
    setPwdInfo((cur: any) => ({...cur, [key]: value}));
  };

  // 패스워드 정규표현식 확인 && 패스워드 일치 확인
  const setPwdCheckedHandler = (key: any) => () => {
    let value: boolean | null;
    if (key === 'reg') {
      value = regExp__pwd.test(pwdInfo.newPwd1);
    }
    if (key === 'same') {
      value = pwdInfo.newPwd1 === pwdInfo.newPwd2;
    }

    setPwdChecked((cur: any) => ({...cur, [key]: value}));
  };

  // 패스워드 수정
  const modifyPwd = async () => {
    if (!isAllowPwdInfo.newPwd) {
      return Alert.alert(
        '비밀번호 잘못에러',
        '변경할 비밀번호를 확인해주세요.'
      );
    }
    try {
      const changePasswdParams = {
        curPwd: pwdInfo.curPwd,
        newPwd: pwdInfo.newPwd1,
      };
      setIsLoding(true);
      await MYPAGE_SERVICE.changePasswd(changePasswdParams);
      navigationReplaceHandler('Mypage');
    } catch (error: any) {
      try {
        return Alert.alert('비밀번호 변경실패', error);
      } catch (error) {
        return Alert.alert('비밀번호 변경실패', '잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsLoding(false);
    }
  };

  // 콘솔
  useEffect(() => {
    console.log(pwdInfo);
  }, [pwdInfo]);

  // 패스워드 일치 && 정규표현식 일치 확인
  useEffect(() => {
    if (pwdChecked.reg && pwdChecked.same) {
      setIsAllowPwdInfo(cur => ({...cur, newPwd: true}));
    }
  }, [pwdChecked]);
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
      <TopNav navigation={navigation} title="패스워드 변경" />
      <View style={globalStyles.MainWrap}>
        <View style={MarginTop('5%')} />
        <TextInput
          style={changeStyles.TextInput}
          placeholder="비밀번호"
          placeholderTextColor="#898989"
          value={pwdInfo.curPwd}
          onChangeText={setPwdInfoHandler('curPwd')}
          secureTextEntry={true}
        />
        <View style={MarginTop(15)} />
        <TextInput
          style={changeStyles.TextInput}
          placeholder="새 비밀번호"
          placeholderTextColor="#898989"
          value={pwdInfo.newPwd1}
          onChangeText={setPwdInfoHandler('newPwd1')}
          // onBlur={setPwdCheckedHandler('reg')}
          onChange={setPwdCheckedHandler('reg')}
          secureTextEntry={true}
        />

        {_.isNull(pwdChecked.reg) ? (
          <View style={MarginTop(15)} />
        ) : pwdChecked.reg ? (
          <View style={MarginTop(15)} />
        ) : (
          <Text style={Font.ChangePwdWarningMsg}>
            숫자,영문,특수문자 포함하여 8자리 이상 입력해주세요.
          </Text>
        )}

        <TextInput
          style={changeStyles.TextInput}
          placeholder="새 비밀번호 확인"
          placeholderTextColor="#898989"
          secureTextEntry={true}
          value={pwdInfo.newPwd2}
          onChangeText={setPwdInfoHandler('newPwd2')}
          onChange={e => {
            {
              pwdInfo.newPwd1 === e.nativeEvent.text
                ? setPwdChecked((cur: any) => ({...cur, ['same']: true}))
                : setPwdChecked((cur: any) => ({...cur, ['same']: false}));
            }
          }}
          // onChange={setPwdCheckedHandler('same')}
        />

        {_.isNull(pwdChecked.same) ? (
          <View style={MarginTop(15)} />
        ) : pwdChecked.same ? (
          <View style={MarginTop(15)} />
        ) : (
          <Text style={Font.FindPwdWarningMsg}>
            새로운 비밀번호가 다릅니다.
          </Text>
        )}

        <TouchableOpacity
          style={changeStyles.SubmitBtnWrap}
          onPress={modifyPwd}>
          <Text style={changeStyles.SubmitBtnText}>수정 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;
