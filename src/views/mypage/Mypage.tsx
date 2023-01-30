import {useEffect, useState} from 'react';
import TopNav from '../../components/topNav/TopNav';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Modal,
  Alert,
  Switch,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import API_Mypage from '../../@api/mypage/Mypage';
import IconBack from '../../assets/icon_back.svg';
import Icon0 from '../../assets/icon0_big.svg';
import Icon1 from '../../assets/icon1_big.svg';
import Icon2 from '../../assets/icon2_big.svg';
import Icon3 from '../../assets/icon3_big.svg';
import Icon4 from '../../assets/icon4_big.svg';
import Icon5 from '../../assets/icon5_big.svg';
import Icon6 from '../../assets/icon6_big.svg';
import ModalSelect from '../../assets/modal_select.svg';
import BottomNav from '../../components/bottomNav/BottomNav';
import {Divider} from '@rneui/base';
import {globalStyles} from '../../assets/css/global/styleSheet';
import {MarginBottom} from '../../assets/css/global/margin';
import {modalStyles} from '../../assets/css/modal/modal';
import Dividers from '../../components/divider/Dividers';

interface myDatatype {
  CarNumber?: string;
  Phone?: string;
  ProfileImg?: number;
  Email?: string;
  SNS?: string;
  Marketing?: string;
  UserEmail?: string;
}
interface patchMyDataInfo {
  ProfileImg: number;
  Email: string;
  SNS: string;
  Marketing: string;
}
enum toggleKey {
  mail = 'Email',
  sns = 'SNS',
  marketing = 'Marketing',
}

const myPageProfileMap = (num: any) => {
  switch (num) {
    case 1:
      return <Icon1 />;
    case 2:
      return <Icon2 />;
    case 3:
      return <Icon3 />;
    case 4:
      return <Icon4 />;
    case 5:
      return <Icon5 />;
    case 6:
      return <Icon6 />;
    default:
      return <Icon0 />;
  }
};

const Mypage = ({navigation}: any) => {
  const MypageApi = new API_Mypage();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [myData, setMyData] = useState<myDatatype>({});
  const [switchToggle, setSwitchToggle] = useState({
    Email: false,
    Marketing: false,
    SNS: false,
  });
  // 로딩여부
  const [isLoding, setIsLoding] = useState(false);

  // 네비게이션 함수
  const navigationReplaceHandler = (key: string) => () => {
    navigation.push(key);
  };
  const navigationNavigateHandler = (key: string, params: any) => () => {
    navigation.push(key, params);
  };

  const navigationNaivigateHandlerMap = (key: string) => () => {
    let params;
    if (key === 'ChangePhoneNumber') params = {phoneNumber: myData?.Phone};
    else if (key === 'ChangeEmail') params = {email: myData?.UserEmail};
    else return;

    navigationNavigateHandler(key, params)();
  };

  const getDataHandler = async () => {
    try {
      setIsLoding(true);
      const result = await MypageApi.getMyData();
      getSwitchToggleHandler(result);
      setMyData(result);
    } catch (error) {
      // alert(error);
    } finally {
      setIsLoding(false);
    }
  };

  const convertPhone = (phoneNumber: string) => {
    const tmpObj = [];
    tmpObj.push(phoneNumber?.slice(0, 3));
    tmpObj.push(phoneNumber?.slice(3, 7));
    tmpObj.push(phoneNumber?.slice(7, 11));

    return tmpObj.join('-');
  };

  const getSwitchToggleHandler = (result: any) => {
    try {
      const {Email, Marketing, SNS} = result;
      const tmpObj: any = {
        Email: Email === 'Y',
        Marketing: Marketing === 'Y',
        SNS: SNS === 'Y',
      };

      setSwitchToggle(tmpObj);
    } catch (error) {
      alert(error);
    }
  };

  const setProfileImg = (imgNum: number) => () => {
    setMyData(cur => ({...cur, ProfileImg: imgNum}));
    setModalVisible(false);
  };

  const toggleHandler = (key: toggleKey) => () => {
    const dataValue = myData[key] === 'Y' ? 'N' : 'Y';
    const toggleValue = !switchToggle[key];

    setMyData(cur => ({...cur, [key]: dataValue}));
    setSwitchToggle(cur => ({...cur, [key]: toggleValue}));
  };

  const patchMyData = async () => {
    Alert.alert(
      '정말로 수정하시겠습니까?',
      '수신동의 정보에 대해 수정하시겠습니까?',
      [
        {
          text: '네',
          onPress: async () => {
            try {
              const {ProfileImg, Email, Marketing, SNS}: any = myData;
              const patchMyDataInfo: patchMyDataInfo = {
                ProfileImg,
                Email,
                Marketing,
                SNS,
              };
              setIsLoding(true);
              await MypageApi.patchMyData(patchMyDataInfo);
              Alert.alert(
                '수정완료',
                '수정이 완료되었습니다. 메인화면으로 이동하시겠습니까?',
                [
                  {
                    text: '네',
                    onPress: () => {
                      navigation.push('Home');
                    },
                  },
                  {
                    text: '아니오',
                  },
                ]
              );
            } catch (error) {
              alert(error);
            } finally {
              setIsLoding(false);
            }
          },
        },
        {text: '아니오'},
      ]
    );
  };
  useEffect(() => {
    getDataHandler();
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
    <View style={globalStyles.BodyWrap}>
      <Modal transparent={true} visible={isLoding}>
        <ActivityIndicator
          size={'large'}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={modalStyles.ModalWrap}>
          <View style={modalStyles.MainWrap}>
            <View style={modalStyles.HeaderWrap}>
              <Text style={modalStyles.HeaderText}>이미지 선택</Text>
              <TouchableOpacity
                style={modalStyles.ModalCloseWrap}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={modalStyles.ModalCloseText}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={MarginBottom(25)} />
            <View style={modalStyles.ImgBoxWrap}>
              <View style={globalStyles.FlexRow}>
                <View style={modalStyles.ImgBox}>
                  <TouchableOpacity onPress={setProfileImg(1)}>
                    <Icon1></Icon1>
                    <ModalSelect></ModalSelect>
                  </TouchableOpacity>
                </View>
                <View style={modalStyles.ImgBox}>
                  <TouchableOpacity onPress={setProfileImg(2)}>
                    <Icon2></Icon2>
                    <ModalSelect></ModalSelect>
                  </TouchableOpacity>
                </View>
                <View style={modalStyles.ImgBox}>
                  <TouchableOpacity onPress={setProfileImg(3)}>
                    <Icon3></Icon3>
                    <ModalSelect></ModalSelect>
                  </TouchableOpacity>
                </View>
              </View>
              {/*  */}
              <View style={modalStyles.ImgBoxWrap}>
                <View style={globalStyles.FlexRow}>
                  <View style={modalStyles.ImgBox}>
                    <TouchableOpacity onPress={setProfileImg(4)}>
                      <Icon4></Icon4>
                      <ModalSelect></ModalSelect>
                    </TouchableOpacity>
                  </View>
                  <View style={modalStyles.ImgBox}>
                    <TouchableOpacity onPress={setProfileImg(5)}>
                      <Icon5></Icon5>
                      <ModalSelect></ModalSelect>
                    </TouchableOpacity>
                  </View>
                  <View style={modalStyles.ImgBox}>
                    <TouchableOpacity onPress={setProfileImg(6)}>
                      <Icon6></Icon6>
                      <ModalSelect></ModalSelect>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <TopNav navigation={navigation} title="마이페이지" />

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: Dimensions.get('screen').width,
            marginTop: '12.5%',
            marginBottom: '12.5%',
          }}>
          <View
            style={{
              display: 'flex',
            }}>
            <TouchableOpacity
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setModalVisible(true);
              }}>
              <IconBack style={{position: 'absolute'}} />
              {myPageProfileMap(myData?.ProfileImg)}
            </TouchableOpacity>
          </View>
        </View>

        <View style={globalStyles.MainWrap}>
          <View style={styles.mainContainerWrap}>
            {/* tmp */}
            <View style={styles.mainContainerRowTop}>
              <View>
                <Text style={styles.mainContainerRowText}>차량번호</Text>
              </View>
              <View>
                <Text style={styles.mainContainerRowText}>
                  {myData?.CarNumber}
                </Text>
              </View>
            </View>
            <View style={styles.mainContainerRow}>
              <View>
                <Text style={styles.mainContainerRowText}>휴대폰번호</Text>
              </View>
              <View style={styles.mainContainerRowBtnWrap}>
                <View style={styles.mainContainerRowRightTextWrap}>
                  <Text style={styles.mainContainerRowRightText}>
                    {myData.Phone && convertPhone(myData?.Phone)}
                  </Text>
                  <TouchableOpacity
                    style={styles.mainContainerRowBtn}
                    onPress={navigationNaivigateHandlerMap(
                      'ChangePhoneNumber'
                    )}>
                    <Text style={styles.mainContainerRowBtnText}>변경</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.mainContainerRow}>
              <View>
                <Text style={styles.mainContainerRowText}>이메일</Text>
              </View>
              <View style={styles.mainContainerRowBtnWrap}>
                <View style={styles.mainContainerRowRightTextWrap}>
                  <Text style={styles.mainContainerRowRightText}>
                    {myData?.UserEmail}
                  </Text>
                  <TouchableOpacity
                    style={styles.mainContainerRowBtn}
                    onPress={navigationNaivigateHandlerMap('ChangeEmail')}>
                    <Text style={styles.mainContainerRowBtnText}>변경</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.mainContainerRow}>
              <View>
                <Text style={styles.mainContainerRowText}>비밀번호</Text>
              </View>
              <View style={styles.mainContainerRowBtnWrap}>
                <View style={styles.mainContainerRowRightTextWrap}>
                  <Text style={styles.mainContainerRowRightText}>
                    *********
                  </Text>
                  <TouchableOpacity
                    style={styles.mainContainerRowBtn}
                    onPress={navigationReplaceHandler('ChangePassword')}>
                    <Text style={styles.mainContainerRowBtnText}>변경</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* tmp end */}
            {/* <Divider
              color="#d7d7d7"
              width={0.5}
              style={{marginTop: 20, marginBottom: 12}}
            /> */}
            <Dividers marginTop="20" marginBottom="12"></Dividers>
            <View style={styles.mainContainerRow}>
              <View>
                <Text style={styles.mainContainerRowText}>
                  마케팅 정보 수신동의
                </Text>
              </View>
              <View style={styles.mainContainerRowBtnWrap}>
                <Switch
                  trackColor={{false: '#D9D9D9', true: '#6DADDB'}}
                  thumbColor={'#FFFFFF'}
                  value={switchToggle?.Marketing}
                  onValueChange={toggleHandler(toggleKey.marketing)}
                  style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
                />
              </View>
            </View>
            <View style={styles.mainContainerRow}>
              <View>
                <Text style={styles.mainContainerRowText}>메일수신동의</Text>
              </View>
              <View style={styles.mainContainerRowBtnWrap}>
                <Switch
                  trackColor={{false: '#D9D9D9', true: '#6DADDB'}}
                  thumbColor={'#FFFFFF'}
                  value={switchToggle?.Email}
                  onValueChange={toggleHandler(toggleKey.mail)}
                  style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
                />
              </View>
            </View>
            <View style={styles.mainContainerRowBot}>
              <View>
                <Text style={styles.mainContainerRowText}>SNS수신동의</Text>
              </View>
              <View style={styles.mainContainerRowBtnWrap}>
                <Switch
                  trackColor={{false: '#D9D9D9', true: '#6DADDB'}}
                  thumbColor={'#FFFFFF'}
                  value={switchToggle?.SNS}
                  onValueChange={toggleHandler(toggleKey.sns)}
                  style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
                />
              </View>
            </View>
            {/*  */}
          </View>
          <View style={styles.footerContainerWrap}>
            <TouchableOpacity
              style={styles.footerContainerBtn}
              onPress={patchMyData}>
              <Text style={styles.footerContainerBtnText}>수정하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation}></BottomNav>
    </View>
  );
};
const styles = StyleSheet.create({
  full: {
    backgroundColor: '#F2F6F8',
    width: Dimensions.get('screen').width,
    height: '100%',
  },
  image: {
    width: '12%',
    height: '100%',
  },
  text1: {
    color: 'black',
    font: 'Noto Sans',
    fontWeight: '500',
    fontSize: 15,
    // lineHeight: 40,
    marginLeft: '5%',
    // height: 30,
  },
  text2: {
    display: 'flex',
    color: 'black',
    font: 'Noto Sans',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 30,
    marginRight: '03%',
    height: 30,
  },
  text3: {
    color: 'white',
    font: 'Noto Sans',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 28,
  },
  btn: {
    backgroundColor: '#879BB9',
    borderRadius: 6,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '1%',
    height: '35%',
    // marginTop: '2%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
  },
  modifyBtn: {
    color: 'white',
    backgroundColor: '#6DADDB',
    width: '80%',
    borderRadius: 10,
    height: 60,
    marginTop: 20,
    marginLeft: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modifyBtnText: {
    fontFamily: 'Noto Sans',
    fontWeight: '700',
    fontSize: 17,
  },
  mainContainerWrap: {
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 14,
    width: '100%',
  },
  mainContainerRowTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  mainContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  mainContainerRowBot: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  mainContainerRowText: {fontSize: 15, color: '#292929'},
  mainContainerRowBtnWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  mainContainerRowBtn: {
    display: 'flex',
    width: 40,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#879BB9',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  mainContainerRowBtnText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
  },
  mainContainerRowRightTextWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mainContainerRowRightText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 5,
    textAlign: 'right',
    marginRight: 5,
  },
  footerContainerWrap: {
    paddingTop: 20,
    paddingBottom: 80,
  },
  footerContainerBtn: {
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: '#6DADDB',
    borderRadius: 8,
    width: '100%',
    paddingTop: 7.5,
    paddingBottom: 7.5,
  },
  footerContainerBtnText: {
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 40,
    fontWeight: '500',
    color: '#ffffff',
  },
});
export default Mypage;
