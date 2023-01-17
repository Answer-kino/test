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
} from 'react-native';
import API_Mypage from '../../@api/mypage/Mypage';
import Icon0 from '../../assets/icon0_big.svg';
import Icon1 from '../../assets/icon1_big.svg';
import Icon2 from '../../assets/icon2_big.svg';
import Icon3 from '../../assets/icon3_big.svg';
import Icon4 from '../../assets/icon4_big.svg';
import Icon5 from '../../assets/icon5_big.svg';
import Icon6 from '../../assets/icon6_big.svg';
import ModalSelect from '../../assets/modal_select.svg';
import BottomNav from '../../components/bottomNav/BottomNav';

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
      return <Icon1 style={styles.userImg} />;
    case 2:
      return <Icon2 style={styles.userImg} />;
    case 3:
      return <Icon3 style={styles.userImg} />;
    case 4:
      return <Icon4 style={styles.userImg} />;
    case 5:
      return <Icon5 style={styles.userImg} />;
    case 6:
      return <Icon6 style={styles.userImg} />;
    default:
      return <Icon0 style={styles.userImg} />;
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
      navigation.push('Home');
    } catch (error) {
      alert(error);
    } finally {
      setIsLoding(false);
    }
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
    <View style={styles.full}>
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
        <View style={styles.centeredView}>
          <View style={{backgroundColor: 'white', borderRadius: 14}}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  marginLeft: '10%',
                }}
                onPress={setProfileImg(1)}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '9%',
                  }}>
                  <Icon1 style={{height: 100, width: 100}}></Icon1>
                  <ModalSelect></ModalSelect>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: '10%',
                }}
                onPress={setProfileImg(2)}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon2 style={{height: 100, width: 100}}></Icon2>
                  <ModalSelect></ModalSelect>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: '10%',
                }}
                onPress={setProfileImg(3)}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon3 style={{height: 100, width: 100}}></Icon3>
                  <ModalSelect></ModalSelect>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  marginLeft: '10%',
                }}
                onPress={setProfileImg(4)}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon4 style={{height: 100, width: 100}}></Icon4>
                  <ModalSelect></ModalSelect>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: '10%',
                }}
                onPress={setProfileImg(5)}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon5
                    style={{height: 100, width: 100, marginTop: '10%'}}></Icon5>
                  <ModalSelect></ModalSelect>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: '10%',
                }}
                onPress={setProfileImg(6)}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon6
                    style={{height: 100, width: 100, marginTop: '13%'}}></Icon6>
                  <ModalSelect></ModalSelect>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TopNav navigation={navigation} title="마이페이지" />
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          {myPageProfileMap(myData?.ProfileImg)}
        </TouchableOpacity>
      </View>

      <View>
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
              <Text style={styles.mainContainerRowText}>비밀번호</Text>
            </View>
            <View style={styles.mainContainerRowBtnWrap}>
              <TouchableOpacity style={styles.mainContainerRowBtn}>
                <Text style={styles.mainContainerRowBtnText}>수정하기</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mainContainerRow}>
            <View>
              <Text style={styles.mainContainerRowText}>휴대폰번호</Text>
            </View>
            <View style={styles.mainContainerRowBtnWrap}>
              <TouchableOpacity style={styles.mainContainerRowBtn}>
                <Text style={styles.mainContainerRowBtnText}>변경하기</Text>
              </TouchableOpacity>
              <View style={styles.mainContainerRowRightTextWrap}>
                <Text style={styles.mainContainerRowRightText}>
                  {myData.Phone && convertPhone(myData?.Phone)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.mainContainerRow}>
            <View>
              <Text style={styles.mainContainerRowText}>이메일</Text>
            </View>
            <View style={styles.mainContainerRowBtnWrap}>
              <TouchableOpacity style={styles.mainContainerRowBtn}>
                <Text style={styles.mainContainerRowBtnText}>변경하기</Text>
              </TouchableOpacity>
              <View style={styles.mainContainerRowRightTextWrap}>
                <Text style={styles.mainContainerRowRightText}>
                  {myData?.UserEmail}
                </Text>
              </View>
            </View>
          </View>
          {/* tmp end */}
          <View style={styles.mainContainerRow}>
            <View>
              <Text style={styles.mainContainerRowText}>
                마케팅 정보 수신동의
              </Text>
            </View>
            <View style={styles.mainContainerRowBtnWrap}>
              <Switch
                trackColor={{false: 'D9D9D9', true: '#6DADDB'}}
                thumbColor={'#FFFFFF'}
                value={switchToggle?.Marketing}
                onValueChange={toggleHandler(toggleKey.marketing)}
              />
            </View>
          </View>
          <View style={styles.mainContainerRow}>
            <View>
              <Text style={styles.mainContainerRowText}>메일수신동의</Text>
            </View>
            <View style={styles.mainContainerRowBtnWrap}>
              <Switch
                trackColor={{false: 'D9D9D9', true: '#6DADDB'}}
                thumbColor={'#FFFFFF'}
                value={switchToggle?.Email}
                onValueChange={toggleHandler(toggleKey.mail)}
              />
            </View>
          </View>
          <View style={styles.mainContainerRowBot}>
            <View>
              <Text style={styles.mainContainerRowText}>SNS수신동의</Text>
            </View>
            <View style={styles.mainContainerRowBtnWrap}>
              <Switch
                trackColor={{false: 'D9D9D9', true: '#6DADDB'}}
                thumbColor={'#FFFFFF'}
                value={switchToggle?.SNS}
                onValueChange={toggleHandler(toggleKey.sns)}
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
      <BottomNav navigation={navigation}></BottomNav>
    </View>
  );
};
const styles = StyleSheet.create({
  full: {
    backgroundColor: '#F2F6F8',
    width: '100%',
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
  userImg: {
    marginTop: '12%',
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
    width: '85%',
    marginTop: '10%',
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
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  mainContainerRowBot: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  mainContainerRowText: {fontSize: 15, fontWeight: '500', color: '#292929'},
  mainContainerRowBtnWrap: {display: 'flex', flexDirection: 'row'},
  mainContainerRowBtn: {
    display: 'flex',
    width: 72,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#879BB9',
    justifyContent: 'center',
  },
  mainContainerRowBtnText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
  },
  mainContainerRowRightTextWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 5,
  },
  mainContainerRowRightText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#292929',
  },
  footerContainerWrap: {
    paddingTop: 12,
  },
  footerContainerBtn: {
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: '#6DADDB',
    borderRadius: 14,
    width: '85%',
  },
  footerContainerBtnText: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 40,
    fontWeight: '600',
    color: '#ffffff',
  },
});
export default Mypage;
