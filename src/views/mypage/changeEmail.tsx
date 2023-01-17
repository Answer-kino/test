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
import {regExp__email} from '../../@utility/reg';

const ChangeEmail = ({navigation, route}: any) => {
  const [newEmail, setNewEmail] = useState<string>('');
  const Mypage = new API_Mypage();
  const changeEmail = async () => {
    if (!regExp__email.test(newEmail)) {
      Alert.alert('올바른 이메일이 아닙니다.');
    } else {
      if (newEmail !== '') {
        const email = newEmail;
        try {
          const result = Mypage.changeEmail(email);
          navigation.replace('Mypage');
        } catch (error) {
          console.log(error);
        }
      } else {
        alert('이메일을 확인해주세요.');
      }
    }
  };

  return (
    <View style={styles.full}>
      <TopNav navigation={navigation} title="이메일 변경" />
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
        <Text style={styles.text}>{route.params.email}</Text>
      </View>
      <TextInput
        style={styles.inputbox2}
        placeholder="새 이메일"
        placeholderTextColor="#898989"
        onChangeText={text => {
          setNewEmail(text);
        }}></TextInput>

      <TouchableOpacity style={styles.modifyBtn} onPress={changeEmail}>
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
  text: {
    // backgroundColor: 'white',
    color: '#898989',
    //   color: 'black',
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    fontSize: 15,

    paddingLeft: 15,
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
});
export default ChangeEmail;
