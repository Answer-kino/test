import {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import API_HOME_SERVICE from '../../../@api/home/home';
import TopNav from '../../../components/topNav/TopNav';
import Navigation from '../../../assets/Vector.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Divider} from '@rneui/base';

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
      <View
        style={{width: Dimensions.get('screen').width, alignSelf: 'center'}}>
        {/* Component Top */}
        <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View style={{}}>
              <Text
                style={{
                  color: '#226EC8',
                  fontFamily: 'Noto Sans',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: 17,
                  lineHeight: 23,
                }}>
                계정
              </Text>
            </View>
          </View>
        </View>
        {/* End Component Top */}
        <Divider
          width={0.5}
          color="#72ABEE"
          style={{marginTop: 15, marginBottom: 15}}
        />
        {/* Conponent Body-1 */}
        <View style={{width: '90%', alignSelf: 'center'}}>
          {/* Body - Content 1 */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{width: '30%'}}>
              <Text
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: '400',
                  fontSize: 15,
                  color: 'black',
                }}>
                로그인정보
              </Text>
            </View>
            <View style={{width: '70%'}}>
              <Text
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: '400',
                  fontSize: 15,
                  color: 'black',
                }}>
                {userInfo}
              </Text>
            </View>
          </View>
          {/* End Body - Content 1 */}
        </View>
        {/* End Conponent Body */}
        <Divider
          width={1}
          color="#C7C7C7"
          style={{marginTop: 15, marginBottom: 15}}
        />
        {/* Conponent Body */}
        <View style={{width: '90%', alignSelf: 'center'}}>
          {/* Body - Content 2 */}
          {login ? (
            <View>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onPress={async () => {
                  await AsyncStorage.clear();
                  navigation.reset({routes: [{name: 'Login2'}]});
                }}>
                <View style={{width: '30%'}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: '400',
                      fontSize: 15,
                      color: 'black',
                    }}>
                    로그아웃
                  </Text>
                </View>
                <View
                  style={{
                    width: '70%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    paddingRight: 10,
                  }}>
                  <Navigation></Navigation>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onPress={() => {
                  navigation.navigate('Login2');
                }}>
                <View style={{width: '30%'}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: '400',
                      fontSize: 15,
                      color: 'black',
                    }}>
                    로그인
                  </Text>
                </View>
                <View
                  style={{
                    width: '70%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    paddingRight: 10,
                  }}>
                  <Navigation></Navigation>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {/* End Body - Content 2 */}
        </View>
        {/* End Conponent Body */}
      </View>
      <View
        style={{width: Dimensions.get('screen').width, alignSelf: 'center'}}>
        {/* Component Top */}
        <View style={{width: '90%', alignSelf: 'center', marginTop: 25}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View style={{}}>
              <Text
                style={{
                  color: '#226EC8',
                  fontFamily: 'Noto Sans',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: 17,
                  lineHeight: 23,
                }}>
                버전
              </Text>
            </View>
          </View>
        </View>
        {/* End Component Top */}
        <Divider
          width={0.5}
          color="#72ABEE"
          style={{marginTop: 15, marginBottom: 15}}
        />
        {/* Conponent Body-1 */}
        <View style={{width: '90%', alignSelf: 'center'}}>
          {/* Body - Content 1 */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{width: '30%'}}>
              <Text
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: '400',
                  fontSize: 15,
                  color: 'black',
                }}>
                현재버전
              </Text>
            </View>
            <View style={{width: '70%'}}>
              <Text
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: '400',
                  fontSize: 15,
                  color: 'black',
                }}>
                1.0.0
              </Text>
            </View>
          </View>
          {/* End Body - Content 1 */}
        </View>
        {/* End Conponent Body */}
        <Divider
          width={1}
          color="#C7C7C7"
          style={{marginTop: 15, marginBottom: 15}}
        />
      </View>
      <View
        style={{width: Dimensions.get('screen').width, alignSelf: 'center'}}>
        {/* Component Top */}
        <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View style={{}}>
              <Text
                style={{
                  color: '#226EC8',
                  fontFamily: 'Noto Sans',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: 17,
                  lineHeight: 23,
                }}>
                고객센터
              </Text>
            </View>
          </View>
        </View>
        {/* End Component Top */}
        <Divider
          width={0.5}
          color="#72ABEE"
          style={{marginTop: 15, marginBottom: 15}}
        />

        {/* Conponent Body */}
        <View style={{width: '90%', alignSelf: 'center'}}>
          {/* Body - Content 2 */}
          <View>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={async () => {
                navigation.navigate('Inquiry');
              }}>
              <View style={{width: '30%'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: '400',
                    fontSize: 15,
                    color: 'black',
                  }}>
                  문의하기
                </Text>
              </View>
              <View
                style={{
                  width: '70%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  paddingRight: 10,
                }}>
                <Navigation></Navigation>
              </View>
            </TouchableOpacity>
          </View>

          {/* End Body - Content 2 */}
        </View>
        <Divider
          width={1}
          color="#C7C7C7"
          style={{marginTop: 15, marginBottom: 15}}
        />
        {/* End Conponent Body */}
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
    opacity: 0.4,
    borderWidth: 0.5,
    marginTop: 10,
  },
  text2: {
    marginLeft: 21,
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 18,
    color: 'black',
  },
});
export default Setting;
