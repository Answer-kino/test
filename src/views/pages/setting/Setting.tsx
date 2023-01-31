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
import Dividers from '../../../components/divider/Dividers';
import {SettingStyles} from '../../../assets/css/setting/Setting';
import {Font} from '../../../assets/css/global/newFont';

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
    <View style={SettingStyles.Full}>
      <TopNav navigation={navigation} title="설정" />
      <View
        style={{width: Dimensions.get('screen').width, alignSelf: 'center'}}>
        {/* Component Top */}
        <View style={SettingStyles.Title}>
          <Text style={Font.SettingTitle}>계정</Text>
        </View>
        {/* End Component Top */}

        <Dividers color="#72ABEE" marginTop="15" marginBottom="15" />
        {/* Conponent Body-1 */}
        <View style={SettingStyles.BodyTopContainer}>
          {/* Body - Content 1 */}
          <View style={SettingStyles.BodyTopLeft}>
            <View style={{width: '30%'}}>
              <Text style={Font.SettingLeftText}>로그인정보</Text>
            </View>
            <View style={{width: '70%'}}>
              <Text style={Font.SettingRightText}>{userInfo}</Text>
            </View>
          </View>
          {/* End Body - Content 1 */}
        </View>
        {/* End Conponent Body */}

        <Dividers color="#C7C7C7" marginTop="15" marginBottom="15" />
        {/* Conponent Body */}
        <View style={SettingStyles.BodyTopContainer}>
          {/* Body - Content 2 */}
          {login ? (
            <View>
              <TouchableOpacity
                style={SettingStyles.BodyBottom}
                onPress={async () => {
                  await AsyncStorage.clear();
                  navigation.reset({routes: [{name: 'Login2'}]});
                }}>
                <View style={{width: '30%'}}>
                  <Text style={Font.SettingLeftText}>로그아웃</Text>
                </View>
                <View>
                  <Navigation></Navigation>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={SettingStyles.BodyBottom}
                onPress={() => {
                  navigation.navigate('Login2');
                }}>
                <View style={{width: '30%'}}>
                  <Text style={Font.SettingLeftText}>로그인</Text>
                </View>
                <View>
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
        <View style={SettingStyles.SecondBodyTitle}>
          <View>
            <Text style={Font.SettingTitle}>버전</Text>
          </View>
        </View>
        {/* End Component Top */}

        <Dividers color="#72ABEE" marginTop="15" marginBottom="15" />
        {/* Conponent Body-1 */}
        <View style={SettingStyles.BodyTopContainer}>
          {/* Body - Content 1 */}
          <View style={SettingStyles.BodyTopLeft}>
            <View style={{width: '30%'}}>
              <Text style={Font.SettingLeftText}>현재버전</Text>
            </View>
            <View style={{width: '70%'}}>
              <Text style={Font.SettingRightText}>1.0.0</Text>
            </View>
          </View>
          {/* End Body - Content 1 */}
        </View>
        {/* End Conponent Body */}
        <Dividers color="#C7C7C7" marginTop="15" marginBottom="15" />
      </View>
      <View
        style={{width: Dimensions.get('screen').width, alignSelf: 'center'}}>
        {/* Component Top */}
        <View style={SettingStyles.SecondBodyTitle}>
          <View>
            <Text style={Font.SettingTitle}>고객센터</Text>
          </View>
        </View>
        {/* End Component Top */}

        <Dividers color="#72ABEE" marginTop="15" marginBottom="15" />

        {/* Conponent Body */}
        <View style={SettingStyles.BodyTopContainer}>
          {/* Body - Content 2 */}
          <View>
            <TouchableOpacity
              style={SettingStyles.BodyBottom}
              onPress={async () => {
                navigation.navigate('Inquiry');
              }}>
              <View style={{width: '30%'}}>
                <Text style={Font.SettingLeftText}>문의하기</Text>
              </View>
              <View>
                <Navigation></Navigation>
              </View>
            </TouchableOpacity>
          </View>

          {/* End Body - Content 2 */}
        </View>

        <Dividers color="#C7C7C7" marginTop="15" marginBottom="15" />
        {/* End Conponent Body */}
      </View>
    </View>
  );
};
export default Setting;
