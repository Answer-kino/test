import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import API_HOME_SERVICE from '../../@api/home/home';
import Banner from '../../assets/sidemenubanner.svg';
import LoginImg from '../../assets/Login.svg';
import LogoutImg from '../../assets/Logout.svg';
import SideBanner from '../../assets/sideBanner2.svg';
import Question from '../../assets/question.svg';
import Inquiry from '../../assets/inquiry.svg';
import SideArrow from '../../assets/sideArrow.svg';
import X from '../../assets/x.svg';
import Logout from '../../assets/Logout.svg';

import Dividers from '../divider/Dividers';
import SideMenuStyles from '../../assets/css/sideMenu/sideMenu';
import {Font} from '../../assets/css/global/newFont';
import {MarginLeft} from '../../assets/css/global/margin';
interface SideMenuProps {
  open: boolean;
  toggleOpen: Function;
  navigation: any;
}

const SideMenu = ({open, toggleOpen, navigation}: SideMenuProps) => {
  const HOME_SERVICE = new API_HOME_SERVICE();
  const [userInfo, setUserInfo] = useState();
  const [login, setLogin] = useState<any>('');
  const getMyInfo = async () => {
    const act = await AsyncStorage.getItem('act');
    if (act) {
      try {
        const userInfo = await HOME_SERVICE.INFO();
        console.log('tw', userInfo);
        setUserInfo(userInfo);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const checkToken = async () => {
    const act = await AsyncStorage.getItem('act');
    if (act !== null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  const enterPage = async (key: any) => {
    const act = await AsyncStorage.getItem('act');
    if (act === null) {
      alert('로그인 해주세요.');
    } else {
      toggleOpen(false); // 햄버거에서 다른 메뉴로 들어갔다가 홈화면으로 다시 돌아왔을 때 햄버거 메뉴가 열려있는 부분 방지
      navigation.navigate(key);
    }
  };

  useEffect(() => {
    checkToken();
    getMyInfo();
  }, []);
  return (
    <MenuDrawer
      open={open}
      position={'right'}
      drawerContent={
        <View style={SideMenuStyles.Container}>
          <View style={SideMenuStyles.Box}>
            <View style={SideMenuStyles.BoxTop}>
              <View style={SideMenuStyles.CloseBtn}>
                <TouchableOpacity onPress={() => toggleOpen()}>
                  <X />
                </TouchableOpacity>
              </View>
              <View style={SideMenuStyles.CarInfo}>
                <View style={SideMenuStyles.CarIconContainer}>
                  <View style={SideMenuStyles.CarIconWrap}>
                    <Image
                      source={require('../../assets/fa-solid_car-alt.png')}
                    />
                  </View>
                  <Text style={Font.SideMenuCarNumber}>차량번호 : </Text>
                  <Text style={Font.SideMenuCarNumber}>{userInfo}</Text>
                </View>
              </View>

              <View style={SideMenuStyles.SideMenuContainer}>
                <TouchableOpacity
                  style={SideMenuStyles.SideMenuSection}
                  onPress={() => {
                    navigation.navigate('Question');
                  }}>
                  <View style={SideMenuStyles.SideMenuSectionLeft}>
                    <Question></Question>
                    <View style={MarginLeft(10)}>
                      <Text style={Font.SideMenuMenuName}>자주묻는질문</Text>
                    </View>
                  </View>
                  <SideArrow />
                </TouchableOpacity>
              </View>
              <Dividers></Dividers>
              <View style={SideMenuStyles.SideMenuContainer}>
                <TouchableOpacity
                  style={SideMenuStyles.SideMenuSection}
                  onPress={() => {
                    enterPage('Inquiry');
                  }}>
                  <View style={SideMenuStyles.SideMenuSectionLeft}>
                    <Inquiry></Inquiry>
                    <View style={MarginLeft(10)}>
                      <Text style={Font.SideMenuMenuName}>문의하기</Text>
                    </View>
                  </View>
                  <SideArrow />
                </TouchableOpacity>
              </View>
              <Dividers></Dividers>
              <View style={SideMenuStyles.SideMenuContainer}>
                <TouchableOpacity
                  style={SideMenuStyles.SideMenuSection}
                  onPress={() => {
                    enterPage('InquiryList');
                  }}>
                  <View style={SideMenuStyles.SideMenuSectionLeft}>
                    <Inquiry></Inquiry>
                    <View style={MarginLeft(10)}>
                      <Text style={Font.SideMenuMenuName}>문의글보기</Text>
                    </View>
                  </View>

                  <SideArrow />
                </TouchableOpacity>
              </View>
              <Dividers></Dividers>
              <View style={SideMenuStyles.SideMenuContainer}>
                <TouchableOpacity
                  style={SideMenuStyles.SideMenuSection}
                  onPress={async () => {
                    await AsyncStorage.clear();
                    navigation.reset({routes: [{name: 'Login2'}]});
                  }}>
                  <View style={SideMenuStyles.SideMenuSectionLeft}>
                    <Logout></Logout>
                    <View style={MarginLeft(10)}>
                      <Text style={Font.SideMenuMenuName}>로그아웃</Text>
                    </View>
                  </View>

                  <SideArrow />
                </TouchableOpacity>
              </View>
              <Dividers></Dividers>
              <View
                style={{
                  overflow: 'hidden',
                  width: '100%',
                }}>
                <SideBanner
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    marginTop: '125%',
                  }}
                />
              </View>
            </View>
            {/* {login ? (
              <View style={{justifyContent: 'flex-end'}}>
                <TouchableOpacity
                  onPress={async () => {
                    await AsyncStorage.clear();
                    navigation.reset({routes: [{name: 'Login2'}]});
                  }}
                  style={{
                    height: '10%',
                    marginTop: '140%',
                    width: '30%',
                    marginLeft: '60%',
                  }}>
                  <View style={styles.sideMenuSectionLeft2}>
                    <LogoutImg></LogoutImg>
                    <Text style={styles.logoutText}>로그아웃</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{justifyContent: 'flex-end'}}>
                <TouchableOpacity
                  onPress={async () => {
                    navigation.navigate('Login2');
                  }}
                  style={{
                    height: '10%',
                    marginTop: '140%',
                    width: '30%',
                    marginLeft: '60%',
                  }}>
                  <View style={styles.sideMenuSectionLeft2}>
                    <LoginImg></LoginImg>
                    <Text style={styles.logoutText}>로그인</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )} */}
          </View>
        </View>
      }
      drawerPercentage={100}
      animationTime={50}
      overlay={true}>
      <></>
    </MenuDrawer>
  );
};

export default SideMenu;
