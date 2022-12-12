import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

// import CheckBox from '@react-native-community/checkbox';
import TermsOfService2 from '../../components/bottomNav/termsOfService2';
const Login = () => {
  const a = ['a', 'b'];
  const styles = StyleSheet.create({
    full: {
      height: '100%',
      width: '100%',

      backgroundColor: '#6C6E73',
    },
    TopText: {
      color: '#292929',
      marginLeft: 26,
      marginTop: 50,
      fontSize: 22,
      fontWeight: '700',
      fontFamily: 'Noto Sans',
    },
    inputbox1: {
      backgroundColor: 'white',
      width: 350,
      height: 48,
      marginTop: 15,
      marginLeft: 29,
      borderRadius: 10,
      paddingLeft: 15,
    },
    inputbox2: {
      backgroundColor: 'white',
      width: 350,
      height: 48,
      marginTop: 15,
      marginLeft: 29,
      borderRadius: 10,
      paddingLeft: 15,
    },
    checkButton: {
      width: 58,
      height: 28,
      marginTop: 25,
      borderRadius: 6,
      marginLeft: -70,
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
    checkboxText: {
      fontFamily: 'Noto Sans',
      fontWeight: '400',
      fontSize: 15,
      lineHeight: 20,
      color: 'black',
      marginLeft: 66,
      marginTop: 10,
    },
    lastBtn: {
      marginLeft: 29,
      width: 350,
      height: 51,
      marginTop: 30,
      borderRadius: 10,
      backgroundColor: '#6DADDB',
      justifyContent: 'center',
      alignItems: 'center',
    },
    lastBtnText: {
      fontWeight: '500',
      fontFamily: 'Noto Sans',
      fontSize: 16,
      lineHeight: 18,
    },
  });
  return (
    <View style={styles.full}>
      <View>
        <Text style={styles.TopText}>회원가입</Text>
      </View>
      <View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TextInput
            style={styles.inputbox1}
            placeholder="차량번호"></TextInput>
          <TouchableOpacity style={styles.checkButton}>
            <Text style={styles.buttonText}>중복확인</Text>
          </TouchableOpacity>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 8}}>
          <Text
            style={{
              marginLeft: 47,
              fontSize: 13,
              lineHeight: 18,
              fontWeight: '400',
              fontFamily: 'Noto Sans',
              width: 155,
              height: 18,
            }}>
            사용 가능한 차량번호입니다.
          </Text>
          <Text
            style={{
              width: 175,
              height: 18,
              marginLeft: 5,
              fontFamily: 'Noto Sans',
              fontWeight: '400',
              fontSize: 13,
              color: '#F31414',
            }}>
            사용 불가능한 차량번호입니다.
          </Text>
        </View>
        <TextInput style={styles.inputbox2} placeholder="비밀번호"></TextInput>
        <TextInput
          style={styles.inputbox2}
          placeholder="비밀번호 확인"></TextInput>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TextInput style={styles.inputbox1} placeholder="휴대폰"></TextInput>
          <TouchableOpacity style={styles.checkButton}>
            <Text style={styles.buttonText}>인증하기</Text>
          </TouchableOpacity>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TextInput
            style={styles.inputbox1}
            placeholder="이메일인증"></TextInput>
          <TouchableOpacity style={styles.checkButton}>
            <Text style={styles.buttonText}>인증하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 10}}>
        {TermsOfService2.map((item, index) => {
          return (
            <Text key={index} style={styles.checkboxText}>
              {item}
            </Text>
          );
        })}
      </View>
      <View>
        <TouchableOpacity style={styles.lastBtn}>
          <Text>가입하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
