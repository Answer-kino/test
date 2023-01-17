import {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  Alert,
} from 'react-native';
import API_HOME_SERVICE from '../../../@api/home/home';
import TopNav from '../../../components/topNav/TopNav';
import Navigation from '../../../assets/Vector.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = ({navigation}: any) => {
  const checkToken = async () => {
    const act = await AsyncStorage.getItem('act');
    if (act !== null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  const HOME_SERVICE = new API_HOME_SERVICE();
  const [userInfo, setUserInfo] = useState();
  const [login, setLogin] = useState(false);
  const getMyInfo = async () => {
    try {
      const userInfo = await HOME_SERVICE.INFO();
      console.log('tw', userInfo);
      setUserInfo(userInfo);
    } catch (error) {}
  };

  useEffect(() => {
    checkToken();
    getMyInfo();
  }, []);

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
    <View style={styles.full}>
      <TopNav navigation={navigation} title="설정" />

      <View style={{display: 'flex', flexDirection: 'column'}}>
        <View
          style={{
            marginTop: 50,
            marginLeft: 21,
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Text style={styles.text}>계정</Text>
        </View>
        <View style={styles.line}></View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={styles.text2}>로그인정보</Text>
          <Text style={styles.text2}>{userInfo}</Text>
        </View>
        <View
          style={{
            marginLeft: 21,
            marginRight: 21,
            borderBottomColor: '#8D8D8D',
            borderWidth: 0.5,
            marginTop: 10,
          }}></View>
        <View>
          {login ? (
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={async () => {
                await AsyncStorage.clear();
                navigation.reset({routes: [{name: 'Login2'}]});
              }}>
              <Text style={styles.text2}>로그 아웃</Text>
              <Navigation
                style={{marginRight: '10%', marginTop: 10}}></Navigation>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={async () => {
                navigation.push('Login2');
              }}>
              <Text style={styles.text2}>로그인</Text>
              <Navigation
                style={{marginRight: '10%', marginTop: 10}}></Navigation>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 21,
            marginTop: 50,
          }}>
          <Text style={styles.text}>버전</Text>
        </View>
        <View style={styles.line}></View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={styles.text2}>현재 버전</Text>
          <Text style={styles.text2}>1.2.15</Text>
        </View>
        <View
          style={{
            marginLeft: 21,
            marginRight: 21,
            borderBottomColor: '#8D8D8D',
            borderWidth: 0.5,
            marginTop: 10,
          }}></View>
      </View>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 50,
            marginLeft: 21,
          }}>
          <Text style={styles.text}>고객센터</Text>
        </View>
        <View style={styles.line}></View>
        <View>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={async () => {
              {
                login
                  ? navigation.push('Inquiry')
                  : Alert.alert('로그인 해주세요.');
              }
            }}>
            <Text style={styles.text2}>문의하기</Text>
            <Navigation
              style={{marginRight: '10%', marginTop: 10}}></Navigation>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginLeft: 21,
            marginRight: 21,
            borderBottomColor: '#8D8D8D',
            borderWidth: 0.5,
            marginTop: 10,
          }}></View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  full: {
    backgroundColor: '#DEDEDE',
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#226EC8',
    fontFamily: 'Noto Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 23,
  },
  image: {
    width: 20,
    height: 20,
    marginLeft: 3,
    marginTop: 2,
  },
  line: {
    borderBottomColor: '#72ABEE',
    marginLeft: 21,
    marginRight: 21,
    borderWidth: 0.5,
    marginTop: 10,
  },
  text2: {
    marginLeft: 21,
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 18,
    marginTop: 10,
    color: 'black',
  },
});
export default Setting;
