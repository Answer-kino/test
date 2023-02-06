import {useEffect, useState} from 'react';
import TopNav from '../../components/topNav/TopNav';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Modal,
  Alert,
  Switch,
  ActivityIndicator,
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
import {globalStyles} from '../../assets/css/global/styleSheet';
import {MarginBottom, MarginLeft} from '../../assets/css/global/margin';
import {modalStyles} from '../../assets/css/modal/modal';
import Dividers from '../../components/divider/Dividers';
import {Font} from '../../assets/css/global/newFont';
import {MyPageStyles} from '../../assets/css/mypage/mypage';

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
              <View style={{alignItems: 'center'}}>
                <Text style={Font.MypageModalText}>이미지 선택</Text>
              </View>
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
        <View style={MyPageStyles.TopImageContainer}>
          <View
            style={{
              display: 'flex',
            }}>
            <TouchableOpacity
              style={MyPageStyles.TopImageBackgroud}
              onPress={() => {
                setModalVisible(true);
              }}>
              <IconBack style={{position: 'absolute'}} />
              {myPageProfileMap(myData?.ProfileImg)}
            </TouchableOpacity>
          </View>
        </View>

        <View style={globalStyles.MainWrap}>
          <View style={MyPageStyles.MainContainerWrap}>
            {/* tmp */}
            <View style={MyPageStyles.MainContainerRowTop}>
              <View>
                <Text style={Font.MypageLeftText}>차량번호</Text>
              </View>
              <View>
                <Text style={Font.MypageRightText}>{myData?.CarNumber}</Text>
              </View>
            </View>
            <View style={MyPageStyles.MainContainerRow}>
              <View>
                <Text style={Font.MypageLeftText}>휴대폰번호</Text>
              </View>
              <View style={MyPageStyles.MainContainerRowBtnWrap}>
                <View style={MyPageStyles.MainContainerRowRightTextWrap}>
                  <Text style={Font.MypageRightText}>
                    {myData.Phone && convertPhone(myData?.Phone)}
                  </Text>
                  <View style={MarginLeft(5)} />
                  <TouchableOpacity
                    style={MyPageStyles.MainContainerRowBtn}
                    onPress={navigationNaivigateHandlerMap(
                      'ChangePhoneNumber'
                    )}>
                    <Text style={Font.MyPageBtnText}>변경</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={MyPageStyles.MainContainerRow}>
              <View>
                <Text style={Font.MypageLeftText}>이메일</Text>
              </View>
              <View style={MyPageStyles.MainContainerRowBtnWrap}>
                <View style={MyPageStyles.MainContainerRowRightTextWrap}>
                  <Text style={Font.MypageRightText}>{myData?.UserEmail}</Text>
                  <View style={MarginLeft(5)} />
                  <TouchableOpacity
                    style={MyPageStyles.MainContainerRowBtn}
                    onPress={navigationNaivigateHandlerMap('ChangeEmail')}>
                    <Text style={Font.MyPageBtnText}>변경</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={MyPageStyles.MainContainerRow}>
              <View>
                <Text style={Font.MypageLeftText}>비밀번호</Text>
              </View>
              <View style={MyPageStyles.MainContainerRowBtnWrap}>
                <View style={MyPageStyles.MainContainerRowRightTextWrap}>
                  <Text style={Font.MypageRightText}>*********</Text>
                  <View style={MarginLeft(5)} />
                  <TouchableOpacity
                    style={MyPageStyles.MainContainerRowBtn}
                    onPress={navigationReplaceHandler('ChangePassword')}>
                    <Text style={Font.MyPageBtnText}>변경</Text>
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
            <View style={MyPageStyles.MainContainerRow}>
              <View>
                <Text style={Font.MypageLeftText}>마케팅 정보 수신동의</Text>
              </View>
              <View style={MyPageStyles.MainContainerRowBtnWrap}>
                <Switch
                  trackColor={{false: '#D9D9D9', true: '#6DADDB'}}
                  thumbColor={'#FFFFFF'}
                  value={switchToggle?.Marketing}
                  onValueChange={toggleHandler(toggleKey.marketing)}
                  style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
                />
              </View>
            </View>
            <View style={MyPageStyles.MainContainerRow}>
              <View>
                <Text style={Font.MypageLeftText}>메일수신동의</Text>
              </View>
              <View style={MyPageStyles.MainContainerRowBtnWrap}>
                <Switch
                  trackColor={{false: '#D9D9D9', true: '#6DADDB'}}
                  thumbColor={'#FFFFFF'}
                  value={switchToggle?.Email}
                  onValueChange={toggleHandler(toggleKey.mail)}
                  style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
                />
              </View>
            </View>
            <View style={MyPageStyles.MainContainerRowBot}>
              <View>
                <Text style={Font.MypageLeftText}>SNS수신동의</Text>
              </View>
              <View style={MyPageStyles.MainContainerRowBtnWrap}>
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
          <TouchableOpacity onPress={patchMyData}>
            <View style={globalStyles.Button}>
              <Text style={Font.AllBtnText}>수정하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation}></BottomNav>
    </View>
  );
};

export default Mypage;
