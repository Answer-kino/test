import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import API_HOME_SERVICE from '../../@api/home/home';
import Banner from '../../assets/sidemenubanner.svg';
import LoginImg from '../../assets/Login.svg';
import LogoutImg from '../../assets/Logout.svg';
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
    console.log(act);
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
        <View style={styles.container}>
          <View style={styles.box}>
            <View style={styles.boxTop}>
              <View style={styles.carInfo}>
                <View style={styles.carIconContainer}>
                  <View style={styles.carIconWrap}>
                    <Image
                      source={require('../../assets/fa-solid_car-alt.png')}
                    />
                  </View>
                  <Text style={styles.carNumber}>차량번호 : {userInfo}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleOpen()}>
                  <Image
                    style={styles.closeButton}
                    source={require('../../assets/x.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.sideMenuContainer}>
                <TouchableOpacity
                  style={styles.sideMenuSection}
                  onPress={() => {
                    navigation.navigate('Question');
                  }}>
                  <View style={styles.sideMenuSectionLeft}>
                    <Image source={require('../../assets/question.png')} />
                    <Text style={styles.menuText}>자주묻는질문</Text>
                  </View>
                  <Image source={require('../../assets/sideArrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sideMenuSection}
                  onPress={() => {
                    enterPage('Inquiry');
                  }}>
                  <View style={styles.sideMenuSectionLeft}>
                    <Image source={require('../../assets/inquiry.png')} />
                    <Text style={styles.menuText}>문의하기</Text>
                  </View>

                  <Image source={require('../../assets/sideArrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sideMenuSection}
                  onPress={() => {
                    enterPage('InquiryList');
                  }}>
                  <View style={styles.sideMenuSectionLeft}>
                    <Image source={require('../../assets/inquiry.png')} />
                    <Text style={styles.menuText}>문의글보기</Text>
                  </View>

                  <Image source={require('../../assets/sideArrow.png')} />
                </TouchableOpacity>
              </View>
              <View style={{height: '30%'}}>
                <Banner style={{marginTop: '90%', width: '0%'}}></Banner>
              </View>
            </View>
            {login ? (
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
            )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba( 0, 0, 0, 0.4 )',
    alignItems: 'flex-end',
  },
  box: {
    flex: 1,
    width: 270,
    backgroundColor: 'white',
  },
  boxTop: {
    height: 202,
  },
  carInfo: {
    height: 97,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  carIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carIconWrap: {
    width: 23,
    height: 23,
    backgroundColor: '#A7C1CF',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  carNumber: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: -0.02,
    color: '#2262AD',
  },
  closeButton: {
    marginTop: 20,
    color: '#707070',
  },
  sideMenuContainer: {
    marginHorizontal: 25,
  },
  sideMenuSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: '#DBDBDB',
    borderBottomWidth: 1,
  },
  sideMenuSectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 15,
    // lineHeight: 32,
    letterSpacing: -0.05,
    marginLeft: 10,
    color: 'black',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812',
  },
  sideMenuSectionLeft2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'black',

    // marginLeft: '60%',
  },
  logoutText: {
    marginLeft: '7%',
    fontSize: 15,
    color: 'black',
  },
});

export default SideMenu;
