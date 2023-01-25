import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  Linking,
} from 'react-native';
import API_HOME_SERVICE from '../../@api/home/home';
import BottomNav from '../../components/bottomNav/BottomNav';
import Carousel from '../../components/carousel/Carousel';
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
import {Divider} from '@rneui/base';
import {globalStyles} from '../../assets/css/global/styleSheet';
import {mainStyles} from '../../assets/css/home/homeStyleSheet';
import {MarginBottom, MarginTop} from '../../assets/css/global/margin';

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
    } catch (error) {}
  };

  const getCapitalinfo = async () => {
    try {
      const result = await Mypage.getMyData();
      setCapitalInfo(result);
    } catch (error) {
      console.log(error);
    }
  };

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
    <View
      style={{
        width: '100%',
      }}>
      <View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={globalStyles.ScrollView}>
          <ImageBackground
            style={mainStyles.Background}
            source={require('./../../assets/background.png')}>
            <View style={globalStyles.MainWrap}>
              <View style={mainStyles.TopStyle}>
                <Logo />
                {/* <TouchableOpacity onPress={() => navigation.push('Connect')}>
                  <Text style={styles.topTitleContact}>연결</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => toggleOpen()}>
                  <Hamburger />
                </TouchableOpacity>
              </View>
            </View>
            <Divider
              width={1}
              color={'white'}
              style={{opacity: 0.4, marginBottom: 12.5}}
            />
            <View style={globalStyles.MainWrap}>
              {isAccess && isAccess ? (
                <View style={mainStyles.CarNumberWrap}>
                  <View style={mainStyles.CarNumberBorder}>
                    <View style={mainStyles.CarNumberBorderTextWarp}>
                      <Text style={mainStyles.CarNumberBorderText}>
                        차량번호 : {carNumber}
                      </Text>
                      <Barcode />
                    </View>
                  </View>
                </View>
              ) : (
                <View style={mainStyles.LoginWrap}>
                  <TouchableOpacity
                    style={mainStyles.LoginBtn}
                    onPress={navigationPushHandler('Login2')}>
                    <Text style={mainStyles.LoginBtnText}>로그인</Text>
                  </TouchableOpacity>
                  <View style={mainStyles.LoginContentsWrap}>
                    <Text style={mainStyles.LoginContentsText}>
                      계정확인 및 FNT차량 보증서 확인하기
                    </Text>
                  </View>
                </View>
              )}
            </View>
            {/**----------- */}
            <View style={globalStyles.MainWrap}>
              <View style={mainStyles.MainNavigationWrap}>
                <View style={mainStyles.MainNavigationBorderWrap}>
                  <View style={mainStyles.MainNavigationBorder}>
                    <TouchableOpacity
                      style={mainStyles.MainNavigationBorderBtnWrap}
                      onPress={navigationAccessHandler('ContractCheck')}>
                      <View style={mainStyles.MainNavigationBorderBtn}>
                        <Text
                          style={[
                            mainStyles.MainNavigationBorderBtnText,
                            {paddingTop: '7%'},
                          ]}>
                          계약확인
                        </Text>
                      </View>
                      <View style={mainStyles.MainNavigationBorderBtnImgWrap}>
                        <Contract />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={mainStyles.MainNavigationBorderBtnWrap}
                      onPress={navigationAccessHandler('CarDocument')}>
                      <View style={mainStyles.MainNavigationBorderBtn}>
                        <Text style={mainStyles.MainNavigationBorderBtnText}>
                          내차{'\n'}NFT 증빙서류
                        </Text>
                      </View>
                      <View style={mainStyles.MainNavigationBorderBtnImgWrap}>
                        <Cardocument />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={mainStyles.MainNavigationBorderBtnWrap}
                      onPress={navigationAccessHandler('NFTWallet')}>
                      <View style={mainStyles.MainNavigationBorderBtn}>
                        <Text style={mainStyles.MainNavigationBorderBtnText}>
                          NFT{'\n'}전자지갑
                        </Text>
                      </View>
                      <View style={mainStyles.MainNavigationBorderBtnImgWrap}>
                        <NftWalletimg />
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* End mainBottomNavigationBorder */}
                  <Divider
                    width={1}
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      // marginTop: 7,
                      // marginBottom: 7,
                      opacity: 0.4,
                    }}
                  />
                  <View style={mainStyles.MainNavigationBorder}>
                    <TouchableOpacity
                      style={mainStyles.MainNavigationBorderBtnWrap}
                      onPress={navigationAccessHandler('ContractCheck')}>
                      <View style={mainStyles.MainNavigationBorderBtn}>
                        <Text style={[mainStyles.MainNavigationBorderBtnText]}>
                          내차{'\n'}운행정보
                        </Text>
                      </View>
                      <View style={mainStyles.MainNavigationBorderBtnImgWrap}>
                        <Raceinfoimg />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={mainStyles.MainNavigationBorderBtnWrap}
                      onPress={navigationAccessHandler('CarDocument')}>
                      <View style={mainStyles.MainNavigationBorderBtn}>
                        <Text style={mainStyles.MainNavigationBorderBtnText}>
                          커뮤니티
                        </Text>
                      </View>
                      <View style={mainStyles.MainNavigationBorderBtnImgWrap}>
                        <Community />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={mainStyles.MainNavigationBorderBtnWrap}>
                      <View style={mainStyles.MainNavigationBorderBtn}>
                        <Text style={mainStyles.MainNavigationBorderBtnText} />
                      </View>
                      <View style={mainStyles.MainNavigationBorderBtnImgWrap} />
                    </TouchableOpacity>
                  </View>
                  {/* End mainBottomNavigationBorder */}
                </View>
                {/* End MainNavigationBorderWrap */}
              </View>
              {/* End MainNavigationWrap */}
            </View>
            {/* End MainWrap */}
          </ImageBackground>
          {/*  */}
          <View style={globalStyles.MainWrap}>
            <View style={mainStyles.DescriptionWrap}>
              <TouchableOpacity
                onPress={navigationPushHandler('NoticeCategory')}>
                <Text style={mainStyles.DescriptionTitle}>공지사항</Text>
              </TouchableOpacity>
              <View style={MarginTop(5)} />
              {noticeInfo.map((item: any, index: number) => {
                const Title = item.Title;
                const temp = item.CreatedDay;
                const CreateDay = temp.split('T')[0];
                return (
                  <TouchableOpacity
                    style={mainStyles.DescriptionRow}
                    key={index}
                    onPress={navigationPushHandler('NoticeCategory')}>
                    <Text style={mainStyles.DescriptionText}> {Title}</Text>
                    <Text style={mainStyles.DescriptionText}>{CreateDay}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {/* End DescriptionWrap */}
          </View>
          {/* End MainWrap */}
          {/*  */}
          <View style={MarginTop(25)} />
          <Carousel />
          <View style={MarginBottom(20)} />
          {/*  */}
          <View style={globalStyles.MainWrap}>
            <View style={mainStyles.DescriptionWrap}>
              <View>
                <Text style={mainStyles.DescriptionTitle}>콜센터</Text>
                <View style={MarginTop(5)} />
                <View style={mainStyles.DescriptionRow}>
                  <Text style={mainStyles.DescriptionText}>
                    {capitalInfo?.Capital
                      ? capitalInfo?.Capital
                      : '캐피탈 콜센터'}
                  </Text>
                  <Text
                    style={mainStyles.DescriptionText}
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
                <View style={mainStyles.DescriptionRow}>
                  <Text style={mainStyles.DescriptionText}>ARS이용시간</Text>
                  <Text style={mainStyles.DescriptionText}>
                    {capitalInfo?.ContactTime
                      ? capitalInfo?.ContactTime
                      : '365일(10:00 ~ 18:00)'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* End MainWrap */}
          <Divider
            width={1}
            style={{marginBottom: 15, marginTop: 15, opacity: 0.4}}
          />
          {/*  */}
          <View style={globalStyles.MainWrap}>
            <View style={mainStyles.FooterWrap}>
              <View style={MarginTop(10)} />
              <View style={mainStyles.FooterTop}>
                <TouchableOpacity
                  onPress={navigationPushHandler('TermsOfService')}
                />
                <TouchableOpacity
                  onPress={navigationPushHandler('TermsOfService')}>
                  <Text style={mainStyles.FooterTopText}>이용약관</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigationPushHandler('Privacy')}>
                  <Text style={mainStyles.FooterTopText}>개인정보처리방침</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={navigationPushHandler('TermsOfService')}
                />
              </View>
              {/* End FooterTop */}

              {/**----------- */}
              <View style={MarginTop(15)} />
              <View style={mainStyles.FooterBottom}>
                <View>
                  <Text style={mainStyles.FooterBottomText}>
                    경기도 용인시 기흥구 기흥로 58, 기흥 ITC벨리 {'\n'}
                    사업자등록번호 418-88-02279
                  </Text>
                </View>
              </View>
              {/* End FooterBottom */}
            </View>
            {/* End FooterWrap */}
          </View>
          {/* End MainWrap */}
        </ScrollView>
        <BottomNav navigation={navigation} />
      </View>
    </View>
  );
};

export default Home;
