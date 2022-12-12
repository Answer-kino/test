import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import BottomNav from '../../components/bottomNav/BottomNav';

interface MainProps {
  navigation: Function;
}

const Home = ({navigation}) => {
  return (
    <View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <ImageBackground
          style={styles.background}
          source={require('../../assets/배경.png')}>
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
              <Image
                style={styles.topTitleHamburger}
                source={require('../../assets/햄버거1.png')}
              />
            </View>
          </View>
          {/**----------- */}
          <View style={styles.loginTextContainer}>
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
          <View style={styles.align}>
            <View style={styles.menuContainer}>
              <View style={styles.menuRow1}>
                <TouchableOpacity
                  style={styles.menuImage}
                  onPress={() => navigation.push('ContractCheck')}>
                  <Image source={require('../../assets/Group1.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuImage}
                  onPress={() => navigation.push('CarDocument')}>
                  <Image source={require('../../assets/Group2.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuImage}
                  onPress={() => navigation.push('NFTWallet')}>
                  <Image source={require('../../assets/Group3.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.menuRow2}>
                <TouchableOpacity
                  style={styles.menuImage}
                  onPress={() => navigation.push('RaceInfo')}>
                  <Image source={require('../../assets/Group4.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuImage}
                  onPress={() => navigation.push('CommunityBoardList')}>
                  <Image source={require('../../assets/Group5.png')} />
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
            <Text>[공지] 간편한 모바일 NFT보증서</Text>
            <Text>2022.10.31</Text>
          </View>
          <View style={styles.descriptionRow}>
            <Text>[공지] 간편한 모바일 NFT보증서</Text>
            <Text>2022.10.31</Text>
          </View>
          <View style={styles.descriptionRow}>
            <Text>[공지] 간편한 모바일 NFT보증서</Text>
            <Text>2022.10.31</Text>
          </View>
        </View>
        {/**----------- */}
        <View>
          <Image
            source={require('../../assets/배너자리.png')}
            style={styles.banner}
          />
        </View>
        {/**----------- */}
        <View style={styles.descriptionContainer2}>
          <Text style={styles.descriptionTitle}>콜센터</Text>
          <View style={styles.descriptionRow}>
            <Text>캐피탈 콜센터</Text>
            <Text>1533-3753</Text>
          </View>
          <View style={styles.descriptionRow}>
            <Text>[ARS이용시간]</Text>
            <Text>365일 (10:00 ~ 18:00)</Text>
          </View>
        </View>
        {/**----------- */}
        <View style={styles.descriptionContainer}>
          <Text>
            이용약관 | 위치기반서비스 이용약관 | 개인정보처리방침 | 전자금융거래
            이용약관
          </Text>
        </View>
        {/**----------- */}
        <View style={styles.descriptionContainer3}>
          <Text>경기도 용인시 기흥구 기흥로 58, 기흥 ITC벨리 B동 2101호</Text>
          <Text>사업자등록번호 418-88-02279 418-88-02279</Text>
        </View>
        {/**----------- */}
      </ScrollView>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 100,
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
  menuContainer: {
    marginTop: 50,
    width: 340,
    height: 201,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    borderWidth: 2,
  },
  menuRow1: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
    justifyContent: 'space-around',
  },
  menuRow2: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  menuImage: {
    width: 84,
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
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
  },
  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Home;
