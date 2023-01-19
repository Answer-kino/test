import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  Platform,
  Linking,
} from 'react-native';
import API_HOME_SERVICE from '../../@api/home/home';
import {EUserInfo} from '../../@entity/user/entity';
import BottomNav from '../../components/bottomNav/BottomNav';
import Carousel from '../../components/carousel/Carousel';
import SideMenu from '../../components/sideMenu/SideMenu';
import Contract from '../../assets/contract.svg';
import Cardocument from '../../assets/cardocument.svg';
import NftWalletimg from '../../assets/nftWallet.svg';
import Raceinfoimg from '../../assets/raceinfo.svg';
import Community from '../../assets/community.svg';
import Logo from '../../assets/NFTlogo.svg';
import Hamburger from '../../assets/hamburger.svg';
import Barcode from '../../assets/barcode.svg';
import API_BBS_SERVICE from '../../@api/bbs/bbs';
import API_Mypage from '../../@api/mypage/Mypage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Divider} from '@rneui/base';

interface Capitalinfo {
  Capital: any;
  ContactTime: any;
  Contact: any;
}

const Home = ({navigation}: any) => {
  const HOME_SERVICE = new API_HOME_SERVICE();
  const Mypage = new API_Mypage();
  const BBS_SERVICE = new API_BBS_SERVICE();
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const [count, setCount] = useState(0);
  const [isAccess, setIsAccess] = useState(false);
  const [carNumber, setCarNumber] = useState<string>();
  const [capitalInfo, setCapitalInfo] = useState<Capitalinfo>();
  const [noticeInfo, setNoticeInfo] = useState([]);

  // 네비게이션 함수
  const navigationPushHandler = (key: string) => () => {
    navigation.push(key);
  };
  const navigationAccessHandler = (key: string) => () => {
    if (isAccess) {
      switch (key) {
        case 'CommunityBoardList':
          navigation.navigate(key, {CarNumber: carNumber});
          break;
        default:
          navigation.push(key);
      }
    } else {
      alert('비정상 적인 접근');
    }
  };

  const getMyInfo = async () => {
    try {
      const userInfo = await HOME_SERVICE.INFO();
      setCarNumber(userInfo);
      setIsAccess(true);
    } catch (error) {
      setIsAccess(false);
    }
  };

  const getNotice = async () => {
    try {
      const result = await BBS_SERVICE.BBS_Main_Notice();
      setNoticeInfo(result);
    } catch (error) {
      console.log('getNotice :', error);
    }
  };

  const getCapitalinfo = async () => {
    try {
      const result = await Mypage.getMyData();
      setCapitalInfo(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('home');
  }, []);

  const toastWithDurationHandler = () => {
    ToastAndroid.show(
      "2초 이내로 '뒤로' 버튼을 한번 더 누르시면 종료됩니다.",
      ToastAndroid.SHORT
    );
  };

  const backAction = () => {
    if (count === 0) {
      setCount(count + 1);
      toastWithDurationHandler();
      setTimeout(() => {
        setCount(0);
      }, 2000);
    } else if (count >= 1) {
      BackHandler.exitApp();
      setCount(0);
    }
    return true;
  };

  useEffect(() => {
    getMyInfo();
    getNotice();
    getCapitalinfo();
  }, []);

  useEffect(() => {
    const back = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => back.remove();
  }, [backAction]);

  return (
    <View>
      <SideMenu open={open} toggleOpen={toggleOpen} navigation={navigation} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <ImageBackground
          style={styles.background}
          source={require('./../../assets/background.png')}>
          <View style={styles.topTitle}>
            <Logo />
            <View style={styles.topTitleSubContainer}>
              {/* <TouchableOpacity onPress={() => navigation.push('Connect')}>
                <Text style={styles.topTitleContact}>연결</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => toggleOpen()}>
                <Hamburger />
              </TouchableOpacity>
            </View>
          </View>
          <Divider width={1} color={'white'} style={{opacity: 0.4}} />
          {/**----------- */}
          {isAccess && isAccess ? (
            <View style={styles.mainTopCarNumberWrap}>
              <View style={styles.mainTopCarNumberBorder}>
                <Text style={styles.mainTopCarNumberBorderText}>
                  차량번호 : {carNumber}
                </Text>
                <Barcode style={{marginRight: 30}} />
              </View>
            </View>
          ) : (
            <View style={styles.mainTopLoginWrap}>
              <TouchableOpacity
                style={styles.mainTopLoginBtn}
                onPress={navigationPushHandler('Login2')}>
                <Text style={styles.mainTopLoginBtnText}>로그인</Text>
              </TouchableOpacity>
              <View style={styles.mainTopLoginContents}>
                <Text style={styles.mainTopLoginContentsText}>
                  계정확인 및 FNT차량 보증서 확인하기
                </Text>
              </View>
            </View>
          )}

          {/**----------- */}
          <View style={styles.mainBottomNavigationWrap}>
            <View style={styles.mainBottomNavigationBorderWrap}>
              <View style={styles.mainBottomNavigationBorder}>
                <TouchableOpacity
                  style={styles.mainBottomNavigationBorderBtnWrap}
                  onPress={navigationAccessHandler('ContractCheck')}>
                  <View style={styles.mainBottomNavigationBorderBtn}>
                    <Text
                      style={[
                        styles.mainBottomNavigationBorderBtnText,
                        {paddingTop: '7%'},
                      ]}>
                      계약확인
                    </Text>
                  </View>
                  <View style={styles.mainBottomNavigationBorderBtnImgWrap}>
                    <Contract />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mainBottomNavigationBorderBtnWrap}
                  onPress={navigationAccessHandler('CarDocument')}>
                  <View style={styles.mainBottomNavigationBorderBtn}>
                    <Text style={styles.mainBottomNavigationBorderBtnText}>
                      내차{'\n'}NFT 증빙서류
                    </Text>
                  </View>
                  <View style={styles.mainBottomNavigationBorderBtnImgWrap}>
                    <Cardocument />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mainBottomNavigationBorderBtnWrap}
                  onPress={navigationAccessHandler('NFTWallet')}>
                  <View style={styles.mainBottomNavigationBorderBtn}>
                    <Text style={styles.mainBottomNavigationBorderBtnText}>
                      NFT{'\n'}전자지갑
                    </Text>
                  </View>
                  <View style={styles.mainBottomNavigationBorderBtnImgWrap}>
                    <NftWalletimg />
                  </View>
                </TouchableOpacity>
              </View>
              {/**----------- */}
              <Divider
                width={1}
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  marginTop: 7,
                  marginBottom: 7,
                  opacity: 0.4,
                }}
              />
              {/**----------- */}
              <View style={styles.mainBottomNavigationBorder}>
                <TouchableOpacity
                  style={styles.mainBottomNavigationBorderBtnWrap}
                  onPress={navigationAccessHandler('RaceInfo')}>
                  <View style={styles.mainBottomNavigationBorderBtn}>
                    <Text style={styles.mainBottomNavigationBorderBtnText}>
                      내차{'\n'}운행정보
                    </Text>
                  </View>
                  <View style={styles.mainBottomNavigationBorderBtnImgWrap}>
                    <Raceinfoimg />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mainBottomNavigationBorderBtnWrap}
                  onPress={navigationAccessHandler('CommunityBoardList')}>
                  <View style={styles.mainBottomNavigationBorderBtn}>
                    <Text
                      style={[
                        styles.mainBottomNavigationBorderBtnText,
                        {paddingTop: '7%'},
                      ]}>
                      커뮤니티
                    </Text>
                  </View>
                  <View style={styles.mainBottomNavigationBorderBtnImgWrap}>
                    <Community />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mainBottomNavigationBorderBtnWrap}>
                  <View style={styles.mainBottomNavigationBorderBtn}>
                    <Text
                      style={styles.mainBottomNavigationBorderBtnText}></Text>
                  </View>
                  <View
                    style={styles.mainBottomNavigationBorderBtnImgWrap}></View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
        {/**----------- */}
        <View style={styles.descriptionContainer}>
          <TouchableOpacity onPress={navigationPushHandler('NoticeCategory')}>
            <Text style={styles.descriptionTitle}>공지사항</Text>
          </TouchableOpacity>
          {noticeInfo.map((item: any, index: number) => {
            const Title = item.Title;
            const temp = item.CreatedDay;
            const CreateDay = temp.split('T')[0];
            return (
              <TouchableOpacity
                style={styles.descriptionRow}
                key={index}
                onPress={navigationPushHandler('NoticeCategory')}>
                <Text style={styles.text}> {Title}</Text>
                <Text style={styles.text}>{CreateDay}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {/**----------- */}
        <View style={styles.banner}>
          {/* <Image
            source={require('../../assets/banner.png')}
   
          /> */}
          <Carousel />
        </View>
        {/**----------- */}
        <View
          style={{
            width: '85%',
            display: 'flex',
            alignSelf: 'center',
          }}>
          <View>
            <View style={{paddingBottom: 5}}>
              <Text style={styles.descriptionTitle}>콜센터</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={styles.text}>
                {capitalInfo?.Capital ? capitalInfo?.Capital : '캐피탈 콜센터'}
              </Text>
              <Text
                style={styles.text}
                onPress={() => {
                  {
                    capitalInfo?.Contact
                      ? Linking.openURL(`tel:${capitalInfo?.Contact}`)
                      : Linking.openURL(`tel:1588-2114`);
                  }
                }}>
                {capitalInfo?.Contact ? capitalInfo?.Contact : '1588-2114'}
              </Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={styles.text}>[ARS이용시간]</Text>
              <Text style={styles.text}>
                {capitalInfo?.ContactTime
                  ? capitalInfo?.ContactTime
                  : '365일(10:00 ~ 18:00)'}
              </Text>
            </View>
          </View>
        </View>
        <Divider
          width={1}
          style={{marginBottom: 15, marginTop: 15, opacity: 0.4}}
        />
        {/* bottom */}
        <View
          style={{
            width: '85%',
            display: 'flex',
            alignSelf: 'center',
            paddingBottom: 45,
          }}>
          {/**----------- */}
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <TouchableOpacity
                onPress={navigationPushHandler(
                  'TermsOfService'
                )}></TouchableOpacity>
              <TouchableOpacity
                onPress={navigationPushHandler('TermsOfService')}>
                <Text style={{fontSize: 14, fontWeight: '400', color: '#000'}}>
                  이용약관
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={navigationPushHandler('Privacy')}>
                <Text style={{fontSize: 14, fontWeight: '400', color: '#000'}}>
                  개인정보처리방침
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={navigationPushHandler(
                  'TermsOfService'
                )}></TouchableOpacity>
            </View>
          </View>
          {/**----------- */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 13,
                  fontWeight: '400',
                  color: 'black',
                }}>
                경기도 용인시 기흥구 기흥로 58, 기흥 ITC벨리 {'\n'}
                사업자등록번호 418-88-02279
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 80,
  },
  background: {
    height: 280, // 360->310 tw
    // alignItems: 'center',
    overflow: 'visible',
    marginBottom: 15,
  },
  align: {
    alignItems: 'center',
  },
  topTitle: {
    width: '92%',
    height: 50,
    // marginVertical: 12, tw
    marginHorizontal: '4%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topTitleSubContainer: {
    height: 50,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topTitleLogo: {
    width: 161,
    height: 38,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  topTitleContact: {
    width: 49,
    height: 35,
    fontSize: 17,
    lineHeight: 24,
    color: '#FFE600',
    backgroundColor: '#123D70',
    textAlign: 'center',
    padding: 3,
    borderRadius: 50,
  },
  topTitleHamburger: {
    width: 29,
    height: 25,
  },
  loginText1: {
    fontSize: 18,
    lineHeight: 25,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
  },
  loginText2: {
    marginTop: 5,
    fontSize: 18,
    lineHeight: 25,
    color: 'white',
    textAlign: 'center',
  },
  loginTextContainer: {
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText1Container: {
    borderWidth: 1,
    width: 95,
    height: 31,
    borderColor: 'white',
    borderRadius: 50,
  },
  loginInfoContainer: {
    marginTop: 50,
    width: '92%',
    height: 52,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 10,
    marginBottom: -20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuContainer: {
    marginTop: 50,
    width: '92%',
    height: 201,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 10,
  },
  menuRow1: {
    width: '100%',
    height: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
    justifyContent: 'space-around',
  },
  menuRow2: {
    width: '100%',
    height: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  menuImage: {
    marginTop: '10%',
  },
  banner: {
    marginTop: 10,
    marginBottom: 10,
  },
  descriptionContainer: {
    paddingHorizontal: 30,
    marginTop: 35, //40->30 tw
  },
  descriptionContainer2: {
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: -15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
  },
  descriptionContainer3: {
    marginHorizontal: 30,
    marginTop: 30,
    paddingBottom: 70,
    borderBottomWidth: 1,
  },
  descriptionTitle: {
    fontSize: 17,
    fontFamily: 'Noto Sans',
    fontWeight: '700',
    marginVertical: 3,
    color: 'black',
  },
  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  carNumber: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: -0.02,
    color: '#123D70',
  },
  text: {
    color: 'black',
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    fontSize: 13,
  },
  text2: {
    color: '#666666',
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    fontSize: 13,
  },

  menu: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10%',
  },
  mainTopLoginWrap: {
    display: 'flex',
    width: '92%',
    height: 60,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  mainTopLoginBtn: {
    display: 'flex',
    width: 100,
    height: 31,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
  },
  mainTopLoginBtnText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    lineHeight: 24.5,
    textAlign: 'center',
  },
  mainTopLoginContents: {
    display: 'flex',
    marginTop: 10,
    justifyContent: 'center',
  },
  mainTopLoginContentsText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    lineHeight: 22,
    textAlign: 'center',
  },
  mainTopCarNumberWrap: {
    width: '92%',
    display: 'flex',
    alignSelf: 'center',
  },
  mainTopCarNumberBorder: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    marginTop: 15, // 25->15  tw
    marginBottom: 15, // 25->15
    backgroundColor: 'white',
    borderRadius: 15,
    ...Platform.select({android: {elevation: 10}}),
    justifyContent: 'space-between',
  },
  mainTopCarNumberBorderText: {
    marginLeft: 20,
    fontSize: 18,
    color: '#123D70',
    fontWeight: '700',
  },
  mainBottomNavigationWrap: {
    width: '92%',
    display: 'flex',
    alignSelf: 'center',
  },
  mainBottomNavigationBorderWrap: {
    width: '100%',
    paddingTop: '2.8%',
    paddingBottom: '6%',
    height: 190,
    backgroundColor: 'white',
    borderRadius: 20,
    borderBottomRightRadius: 40,
    ...Platform.select({android: {elevation: 10}}),
  },
  mainBottomNavigationBorder: {
    height: '49%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainBottomNavigationBorderBtnWrap: {
    width: '33%',
    display: 'flex',
    alignItems: 'center',
  },
  mainBottomNavigationBorderBtn: {
    height: '40%',
    display: 'flex',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  mainBottomNavigationBorderBtnText: {
    textAlign: 'center',
    color: '#1E4467',
    fontWeight: '700',
    fontSize: 12,
    // lineHeight: 14,
  },
  mainBottomNavigationBorderBtnImgWrap: {
    height: '50%',
    justifyContent: 'center',
  },
});

export default Home;
