import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Login2 = ({navigation}) => {
  const styles = StyleSheet.create({
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
    inputbox1: {
      backgroundColor: 'white',
      width: '80%',
      height: 48,
      marginTop: 15,
      marginLeft: '9%',
      borderRadius: 10,
      paddingLeft: 15,
    },
    lastBtnText: {
      fontWeight: '500',
      fontFamily: 'Noto Sans',
      fontSize: 13,
      lineHeight: 18,
    },
    lastBtn: {
      marginLeft: '9%',
      width: '80%',
      height: 51,
      marginTop: 30,
      borderRadius: 10,
      backgroundColor: '#6DADDB',
      justifyContent: 'center',
      alignItems: 'center',
    },
    login2Btn: {
      marginLeft: '9%',
      width: '80%',
      height: 53,
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      //   backgroundColor: 'white',
    },
  });
  return (
    <View style={styles.full}>
      <View>
        <Text style={styles.TopText}>로그인</Text>
      </View>
      <View style={{marginTop: 20}}>
        <TextInput style={styles.inputbox1} placeholder="차량번호"></TextInput>
        <TextInput
          style={styles.inputbox1}
          placeholder="사용자 비밀번호"></TextInput>
        <TouchableOpacity
          style={styles.lastBtn}
          onPress={() => navigation.navigate('Home')}>
          <Text style={{color: 'white'}}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 30}}>
        <TouchableOpacity style={styles.login2Btn}>
          <Text style={styles.lastBtnText}>
            E-mail 또는 비밀번호를 잊으셨나요?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 15}}>
        <TouchableOpacity
          style={styles.login2Btn}
          onPress={() => navigation.push('Login')}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={styles.lastBtnText}>계정이 없으신가요?</Text>
            <Text
              style={{
                fontFamily: 'Noto Sans',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 19,
                lineHeight: 20,
                color: '#2D9DB6',
                // marginLeft: 5,
              }}>
              회원가입
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login2;
