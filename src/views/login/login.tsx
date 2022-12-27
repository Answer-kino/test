import {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
// import CheckBox from '@react-native-community/checkbox';
import TermsOfService2 from '../../dummy/TermsOfService2';
const Login = ({navigation}: any) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('뒤로가기', '뒤로가기 누를 시 입력된 데이터가 사라집니다.', [
        {
          text: '취소',
          onPress: () => null,
        },
        {text: '확인', onPress: () => navigation.pop()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
  }, []);
  // const [singupInfo, setSignupInfo] = useState({carNumber : '', email :'', pwd : '', phone : '', privacy:true ,location :true, promotion:true,marketing:true})
  const [carNumber, setCarNumber] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [phone, setPhone] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [location, setLocation] = useState('');
  const [promotion, setPromotion] = useState('');
  const [marketing, setMarketing] = useState('');
  const [termOfServiceCheck, settermOfServiceCheck] = useState(false);
  const [privacyCheck, setPrivacyCheck] = useState(false);
  const [locationCheck, setLocationCheck] = useState(false);
  const [promotionCheck, setPromotionCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);

  const SignUpAxios = async () => {
    setPrivacy;
    const signUpInfo = {
      carNumber: carNumber,
      pwd: pwd,
      email: email,
      phone: phone,
      privacy: privacy,
      location: location,
      promotion: promotion,
      marketing: marketing,
    };
    try {
      const {data}: any = await axios.post(
        'http://223.130.129.121:4500/api/sign/up',
        signUpInfo
      );
      console.log(data);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.full}>
      <View>
        <Text style={styles.TopText}>회원가입</Text>
      </View>
      <View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TextInput
            style={styles.inputbox1}
            placeholder="차량번호"
            placeholderTextColor="black"
            onChangeText={text => setCarNumber(text)}></TextInput>
          <TouchableOpacity style={styles.checkButton}>
            <Text style={styles.buttonText}>중복확인</Text>
          </TouchableOpacity>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 8}}>
          <Text
            style={{
              marginLeft: '12%',
              fontSize: 11,
              lineHeight: 18,
              fontWeight: '400',
              fontFamily: 'Noto Sans',
              width: '35%',
              height: 18,
            }}>
            사용 가능한 차량번호입니다.
          </Text>
          <Text
            style={{
              width: '50%',
              height: 18,
              marginLeft: '2%',
              fontFamily: 'Noto Sans',
              fontWeight: '400',
              fontSize: 13,
              color: '#F31414',
            }}>
            사용 불가능한 차량번호입니다.
          </Text>
        </View>
        <TextInput
          style={styles.inputbox2}
          placeholder="비밀번호"
          placeholderTextColor="black"
          onChangeText={text => setPwd(text)}></TextInput>
        <TextInput
          style={styles.inputbox2}
          placeholder="비밀번호 확인"
          placeholderTextColor="black"></TextInput>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TextInput
            style={styles.inputbox1}
            placeholder="휴대폰"
            placeholderTextColor="black"
            onChangeText={text => setPhone(text)}></TextInput>
          <TouchableOpacity style={styles.checkButton}>
            <Text style={styles.buttonText}>인증하기</Text>
          </TouchableOpacity>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TextInput
            style={styles.inputbox1}
            placeholder="이메일인증"
            placeholderTextColor="black"
            onChangeText={text => setEmail(text)}></TextInput>
          <TouchableOpacity style={styles.checkButton}>
            <Text style={styles.buttonText}>인증하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <View>
          <View style={styles.checkboxcontainer}>
            <CheckBox
              style={styles.checkbox}
              value={termOfServiceCheck}
              onChange={() => {
                settermOfServiceCheck(!termOfServiceCheck);
              }}></CheckBox>
            <Text style={styles.checkboxText}>이용약관 [보기]</Text>
          </View>
        </View>
        <View>
          <View style={styles.checkboxcontainer}>
            <CheckBox
              style={styles.checkbox}
              value={privacyCheck}
              onChange={() => {
                setPrivacyCheck(!privacyCheck);
              }}></CheckBox>
            <Text style={styles.checkboxText}>개인정보수집 및 이용 [보기]</Text>
          </View>
        </View>
        <View>
          <View style={styles.checkboxcontainer}>
            <CheckBox
              style={styles.checkbox}
              value={locationCheck}
              onChange={() => {
                setLocationCheck(!locationCheck);
              }}></CheckBox>
            <Text style={styles.checkboxText}>
              위치기반서비스 이용약관 [보기]
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.checkboxcontainer}>
            <CheckBox
              style={styles.checkbox}
              value={promotionCheck}
              onChange={() => {
                setPromotionCheck(!promotionCheck);
              }}></CheckBox>
            <Text style={styles.checkboxText}>
              프로모션 정보수신약관 [보기]
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.checkboxcontainer}>
            <CheckBox
              style={styles.checkbox}
              value={marketingCheck}
              onChange={() => {
                setMarketingCheck(!marketingCheck);
              }}></CheckBox>
            <Text style={styles.checkboxText}>
              마케팅,SNS,이메일 수신동의 [보기]
            </Text>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.lastBtn} onPress={() => SignUpAxios()}>
          <Text style={{color: 'white'}}>가입하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
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
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Noto Sans',
  },
  inputbox1: {
    backgroundColor: 'white',
    width: '85%',
    height: 48,
    marginTop: 15,
    marginLeft: '9%',
    borderRadius: 10,
    paddingLeft: 15,
  },
  inputbox2: {
    backgroundColor: 'white',
    width: '85%',
    height: 48,
    marginTop: 15,
    marginLeft: '9%',
    borderRadius: 10,
    paddingLeft: 15,
  },
  checkButton: {
    width: 58,
    height: 28,
    marginTop: 25,
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
  checkbox: {
    marginLeft: '7%',
    marginTop: '1%',
  },
  checkboxText: {
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 20,
    color: 'black',
    marginLeft: '3%',
    marginTop: 10,
  },
  lastBtn: {
    marginLeft: '9%',
    width: '85%',
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
  checkboxcontainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Login;
