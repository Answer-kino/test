import {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import API_Mypage from '../../@api/mypage/Mypage';
import TopNav from '../../components/topNav/TopNav';
import {regExp__pwd} from '../../@utility/reg';
const ChangePassword = ({navigation}: any) => {
  const [curPwd, setCurPwd] = useState<string>('');
  const [newPwd, setNewPwd] = useState<string>('');
  const [newPwd2, setNewPwd2] = useState<string>('');
  // const [pwdValidation, setPwdValidation] = useState(false);
  // const [pwdEqual, setPwdEqual] = useState(false);
  const [pwdCheck, setPwdCheck] = useState({
    pwdValidation: false,
    pwdEqual: false,
  });
  const Mypage = new API_Mypage();

  const pwdValidationHandler = (key: any) => {
    if (!regExp__pwd.test(newPwd)) {
      setPwdCheck((cur: any) => ({...cur, [key]: true}));
    }
    if (newPwd !== newPwd2) {
      setPwdCheck((cur: any) => ({...cur, [key]: true}));
    }
  };

  const errorHandler = () => {
    if (curPwd === newPwd) {
      alert('현재 비밀번호와 새로운 비밀번호가 동일합니다.');
    }
    if (newPwd !== newPwd2) {
      alert('새로운 비밀번호를 확인해주세요.');
    }
    if (!regExp__pwd.test(newPwd)) {
      alert('패스워드를 영문+숫자+특수문자 : 8자리 이상을 사용해주세요.');
    }
  };

  const changePwd = async () => {
    errorHandler();

    if (curPwd !== newPwd && newPwd === newPwd2 && regExp__pwd.test(newPwd)) {
      try {
        const result = await Mypage.changePasswd({curPwd, newPwd});
        console.log('twresult', result);
        navigation.push('Mypage');
        setCurPwd('');
        setNewPwd('');
        setNewPwd2('');
      } catch (error: any) {
        // console.log(error);
        console.log(error.response);
      }
    }
  };

  return (
    <View style={styles.full}>
      <TopNav navigation={navigation} title="패스워드 변경" />

      <TextInput
        style={styles.inputbox}
        placeholder="비밀번호"
        placeholderTextColor="#898989"
        value={curPwd}
        onChangeText={text => {
          setCurPwd(text);
        }}
        secureTextEntry={true}></TextInput>
      <TextInput
        style={styles.inputbox2}
        placeholder="새 비밀번호"
        placeholderTextColor="#898989"
        value={newPwd}
        onChangeText={text => {
          setNewPwd(text);
        }}
        secureTextEntry={true}
        onBlur={() => {
          pwdValidationHandler('pwdValidation');
        }}></TextInput>
      {pwdCheck.pwdValidation ? (
        <Text style={styles.pwdValidationText}>
          숫자,영문,특수문자 포함하여 8자리 이상 입력해주세요.
        </Text>
      ) : null}
      <TextInput
        style={styles.inputbox2}
        placeholder="새 비밀번호 확인"
        placeholderTextColor="#898989"
        secureTextEntry={true}
        value={newPwd2}
        onBlur={() => {
          pwdValidationHandler('pwdEqual');
        }}
        onChangeText={text => {
          setNewPwd2(text);
        }}></TextInput>
      {pwdCheck.pwdEqual ? (
        <Text style={styles.pwdValidationText}>
          새로운 비밀번호가 다릅니다.
        </Text>
      ) : null}
      <TouchableOpacity style={styles.modifyBtn} onPress={changePwd}>
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
