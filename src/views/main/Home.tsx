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
} from 'react-native';
import BottomNav from '../../components/bottomNav/BottomNav';
import Carousel from '../../components/carousel/Carousel';
import SideMenu from '../../components/sideMenu/SideMenu';
import Contract from '../../assets/contract.svg';
import Cardocument from '../../assets/cardocument.svg';
import NftWalletimg from '../../assets/nftWallet.svg';
import Raceinfoimg from '../../assets/raceinfo.svg';
import Community from '../../assets/community.svg';

const Home = ({navigation}: any, act: any) => {
  useEffect(() => {
    console.log(act);
  }, [Home]);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const [count, setCount] = useState(0);
  const toastWithDurationHandler = () => {
    ToastAndroid.show(
      "2초 이내로 '뒤로' 버튼을 한번 더 누르시면 종료됩니다.",
      ToastAndroid.SHORT,
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
          {/**----------- */}
          <View style={styles.topTitle}>
            <Image
              style={styles.topTitleLogo}
              source={require('../../assets/logo1.png')}
            />
            <View style={styles.topTitleSubContainer}>
              <TouchableOpacity onPress={() => navigation.push('Connect')}>
                <Text style={styles.topTitleContact}>연결</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleOpen()}>
                <Image
                  style={styles.topTitleHamburger}
                  source={require('../../assets/hamburger1.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/**----------- */}
          <View style={styles.loginTextContainer}>
            {/* 토큰있으면 숨김처리 */}
            <TouchableOpacity
              onPress={() => navigation.push('Login2')}
              style={styles.loginText1Container}>
              <Text style={styles.loginText1}>로그인</Text>
            </TouchableOpacity>
            <Text style={styles.loginText2}>
              계정확인 및 NFT차량 보증서 확인하기
            </Text>
          </View>
          {/**----------- */}
          {/* <View style={styles.align}>
            <View style={styles.loginInfoContainer}>
              <Text style={styles.carNumber}>차량번호: 123가 1234</Text>
              <Image source={require('../../assets/el_barcode.png')} />
            </View>
          </View> */}
          {/**----------- */}
          {/**----------- */}
          <View style={styles.align}>
            <View style={styles.menuContainer}>
              <View style={styles.menuRow1}>
                <TouchableOpacity
                  onPress={() => navigation.push('ContractCheck')}>
                  {/* <Image source={require('../../assets/Group1.png')} /> */}
                  <View style={styles.menu}>
                    <Text style={{color: 'black'}}>계약확인</Text>
                    <Contract style={styles.menuImage}></Contract>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => navigation.push('CarDocument')}>
                  {/* <Image source={require('../../assets/Group2.png')} /> */}
                  <View style={styles.menu}>
                    <Text style={styles.text}>내차</Text>
                    <Text style={styles.text}>증빙서류</Text>
                    <Cardocument style={styles.menuImage}></Cardocument>
                  </View>
                  {/* <Group2></Group2> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.push('NFTWallet')}>
                  {/* <Image source={require('../../assets/Group3.png')} /> */}
                  <View style={styles.menu}>
                    <Text style={styles.text}>NFT</Text>
                    <Text style={styles.text}>전자지갑</Text>
                    <NftWalletimg style={styles.menuImage}></NftWalletimg>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.menuRow2}>
                <TouchableOpacity
                  style={styles.menuImage}
                  onPress={() => navigation.push('RaceInfo')}>
                  {/* <Image source={require('../../assets/Group4.png')} /> */}
                  <View style={styles.menu2}>
                    <Text style={styles.text}>내차</Text>
                    <Text style={styles.text}>운행정보</Text>
                    <Raceinfoimg style={styles.menuImage}></Raceinfoimg>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuImage}
                  onPress={() => navigation.push('CommunityBoardList')}>
                  {/* <Image source={require('../../assets/Group5.png')} /> */}
                  <View style={styles.menu2}>
                    <Text style={styles.text}>커뮤니티</Text>
                    <Community style={styles.menuImage}></Community>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuImage}
                  onPress={() => navigation.push('CommunityBoardList')}>
                  {/* <Image source={require('../../assets/Group5.png')} /> */}
                  <View style={styles.menu2}>
                    <Text style={styles.text}>커뮤니티</Text>
                    <Community style={styles.menuImage}></Community>
                  </View>
                </TouchableOpacity>
                <View style={styles.menuImage} />
              </View>
            </View>
          </View>
          {/**----------- */}
        </ImageBackground>
        {/**----------- */}
        <View style={styles.descriptionContainer}>
          <TouchableOpacity onPress={() => navigation.push('NoticeCategory')}>
            <Text style={styles.descriptionTitle}>공지사항</Text>
          </TouchableOpacity>
          <View style={styles.descriptionRow}>
            <Text style={styles.text}>[공지] 간편한 모바일 NFT보증서</Text>
            <Text style={styles.text}>2022.10.31</Text>
          </View>
          <View style={styles.descriptionRow}>
            <Text style={styles.text}>[공지] 간편한 모바일 NFT보증서</Text>
            <Text style={styles.text}>2022.10.31</Text>
          </View>
          <View style={styles.descriptionRow}>
            <Text style={styles.text}>[공지] 간편한 모바일 NFT보증서</Text>
            <Text style={styles.text}>2022.10.31</Text>
          </View>
        </View>
        {/**----------- */}
        <View style={styles.banner}>
          {/* <Image
            source={require('../../assets/banner.png')}
   
          /> */}
          <Carousel />
        </View>
        {/**----------- */}
        <View style={styles.descriptionContainer2}>
          <Text style={styles.descriptionTitle}>콜센터</Text>
          <View style={styles.descriptionRow}>
            <Text style={styles.text}>캐피탈 콜센터</Text>
            <Text style={styles.text}>1533-3753</Text>
          </View>
          <View style={styles.descriptionRow}>
            <Text style={styles.text}>[ARS이용시간]</Text>
            <Text style={styles.text}>365일 (10:00 ~ 18:00)</Text>
          </View>
        </View>
        {/**----------- */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.text}>
            이용약관 | 위치기반서비스 이용약관 | 개인정보처리방침 | 전자금융거래
            이용약관
          </Text>
        </View>
        {/**----------- */}
        <View style={styles.descriptionContainer3}>
          <Text style={styles.text}>
            경기도 용인시 기흥구 기흥로 58, 기흥 ITC벨리 B동 2101호
          </Text>
          <Text style={styles.text}>
            사업자등록번호 418-88-02279 418-88-02279
          </Text>
        </View>
        {/**----------- */}
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
    height: 390,
    // alignItems: 'center',
    overflow: 'visible',
  },
  align: {
    alignItems: 'center',
  },
  topTitle: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'white',
    margin: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topTitleSubContainer: {
    height: 50,
    width: 100,
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
    marginTop: 20,
  },
  descriptionContainer: {
    paddingHorizontal: 30,
    marginTop: 30,
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
});

export default Home;
