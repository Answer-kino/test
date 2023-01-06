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

interface myDatatype {
  CarNumber?: string;
  Phone?: number;
  ProfileImg?: number;
  Email?: string;
  SNS?: string;
  Marketing?: string;
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

  const getDataHandler = async () => {
    try {
      const result = await MypageApi.getMyData();
      getSwitchToggleHandler(result);
      setMyData(result);
    } catch (error) {
      alert(error);
    }
  };
  const getSwitchToggleHandler = (result: any) => {
    try {
      const {Email, Marketing, SNS} = result;
      const tmpObj: any = {};
      tmpObj.Email = Email === 'Y';
      tmpObj.Marketing = Marketing === 'Y';
      tmpObj.SNS = SNS === 'Y';
      console.log('tmpObj', tmpObj);
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
      await MypageApi.patchMyData(patchMyDataInfo);
      navigation.push('Home');
    } catch (error) {
      alert(error);
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
        <View
          style={{
            marginLeft: '9%',
            backgroundColor: 'white',
            borderRadius: 14,
            width: '83%',
            marginTop: '20%',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.text1}>차량번호</Text>
            <Text style={styles.text2}>{myData?.CarNumber}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.text1}>현재비밀번호</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  navigation.navigate('ChangePassword');
                }}>
                <Text style={styles.text3}>수정하기</Text>
              </TouchableOpacity>
              <Text style={styles.text2}>***********</Text>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '-10%',
            }}>
            <Text style={styles.text1}>휴대폰번호</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: '1%',
              }}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.text3}>재인증하기</Text>
              </TouchableOpacity>
              <Text style={styles.text2}>
                {myData?.Phone?.toString().replace(
                  /^(\d{2,3})(\d{3,4})(\d{4})$/,
                  `$1-$2-$3`
                )}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '-12%',
            }}>
            <Text style={styles.text1}>마케팅 정보 수신동의</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={switchToggle.Marketing ? '#f5dd4b' : '#f4f3f4'}
              // ios_backgroundColor="#3e3e3e"
              onValueChange={toggleHandler(toggleKey.marketing)}
              value={switchToggle.Marketing}
              // value={marketing}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '1%',
            }}>
            <Text style={styles.text1}>메일수신동의</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={switchToggle.Email ? '#f5dd4b' : '#f4f3f4'}
              // ios_backgroundColor="#3e3e3e"
              onValueChange={toggleHandler(toggleKey.mail)}
              value={switchToggle.Email}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '1%',
            }}>
            <Text style={styles.text1}>SNS수신동의</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={switchToggle.SNS ? '#f5dd4b' : '#f4f3f4'}
              // ios_backgroundColor="#3e3e3e"
              onValueChange={toggleHandler(toggleKey.sns)}
              value={switchToggle.SNS}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.modifyBtn} onPress={patchMyData}>
          <Text style={styles.modifyBtnText}>수정 완료</Text>
        </TouchableOpacity>
      </View>
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
    lineHeight: 40,
    marginLeft: '5%',
    height: 30,
  },
  text2: {
    display: 'flex',
    color: 'black',
    font: 'Noto Sans',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 40,
    marginRight: '5%',
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
    marginRight: '2%',
    height: '38%',
    marginTop: '2%',
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
});
export default Mypage;
