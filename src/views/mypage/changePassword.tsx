import {useEffect, useState} from 'react';
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
import {regExp__pwd} from '../../@utility/reg';
import _ from 'lodash';
import API_SIGN_SERVICE from '../../@api/sign/sign';
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
      <TopNav navigation={navigation} title="패스워드 변경" />

      <TextInput
        style={styles.inputbox}
        placeholder="비밀번호"
        placeholderTextColor="#898989"
        value={pwdInfo.curPwd}
        onChangeText={setPwdInfoHandler('curPwd')}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.inputbox2}
        placeholder="새 비밀번호"
        placeholderTextColor="#898989"
        value={pwdInfo.newPwd1}
        onChangeText={setPwdInfoHandler('newPwd1')}
        onBlur={setPwdCheckedHandler('reg')}
        secureTextEntry={true}
      />

      {_.isNull(pwdChecked.reg) ? (
        ''
      ) : pwdChecked.reg ? (
        ''
      ) : (
        <Text style={styles.pwdValidationText}>
          숫자,영문,특수문자 포함하여 8자리 이상 입력해주세요.
        </Text>
      )}

      <TextInput
        style={styles.inputbox2}
        placeholder="새 비밀번호 확인"
        placeholderTextColor="#898989"
        secureTextEntry={true}
        value={pwdInfo.newPwd2}
        onChangeText={setPwdInfoHandler('newPwd2')}
        onBlur={setPwdCheckedHandler('same')}
      />

      {_.isNull(pwdChecked.same) ? (
        ''
      ) : pwdChecked.same ? (
        ''
      ) : (
        <Text style={styles.pwdValidationText}>
          새로운 비밀번호가 다릅니다.
        </Text>
      )}

      <TouchableOpacity style={styles.modifyBtn} onPress={modifyPwd}>
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
    color: '#898989',
    //   color: 'black',
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    fontSize: 15,
    marginLeft: '9%',
    borderRadius: 10,
    width: '82%',
    paddingLeft: 15,
    marginTop: '10%',
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

  pwdValidationText: {
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
  text: {
    // backgroundColor: 'white',
    color: '#898989',
    //   color: 'black',
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    fontSize: 15,

    paddingLeft: 15,
  },
});
export default ChangePassword;
