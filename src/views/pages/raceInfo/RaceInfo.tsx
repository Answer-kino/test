import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  BackHandler,
  Modal,
  TouchableOpacity,
} from 'react-native';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';
import ModalCloseBtn from '../../../assets/modalclosetbtn.svg';
import RaceInfoStyles from '../../../assets/css/raceInfo/raceInfo';
import {Font} from '../../../assets/css/global/newFont';
import Monitoring from '../../../assets/img/raceInfo/monitoring.svg';
import DashBoard from '../../../assets/img/raceInfo/dashBoard.svg';
import Fuel from '../../../assets/img/raceInfo/fuel.svg';
import DrivingRecord from '../../../assets/img/raceInfo/drivingRecord.svg';
import DrivingLog from '../../../assets/img/raceInfo/drivingLog.svg';
import HUD from '../../../assets/img/raceInfo/HUD.svg';
import CarCheck from '../../../assets/img/raceInfo/carCheck.svg';
import DrivingStyle from '../../../assets/img/raceInfo/drivingStyle.svg';
import Management from '../../../assets/img/raceInfo/comsumableManagement.svg';
interface ItemProps {
  title: string;
  img: string;
}

const Item = (props: ItemProps) => {
  return (
    <View style={RaceInfoStyles.ItemContainer}>
      <View style={RaceInfoStyles.Item}>
        {props.img === '1' && <Monitoring />}
        {props.img === '2' && <CarCheck />}
        {props.img === '3' && <DashBoard />}
        {props.img === '4' && <Fuel />}
        {props.img === '5' && <DrivingRecord />}
        {props.img === '6' && <DrivingLog />}
        {props.img === '7' && <HUD />}
        {props.img === '8' && <DrivingStyle />}
        {props.img === '9' && <Management />}
      </View>
      <Text style={Font.RaceInfoText}>{props.title}</Text>
    </View>
  );
};

const RaceInfo = ({navigation}: any) => {
  const DATA = [
    {title: '모니터링', img: '1'},
    {title: '차량진단', img: '2'},
    {title: '대시보드', img: '3'},
    {title: '연료', img: '4'},
    {title: '주행기록', img: '5'},
    {title: '주행일지', img: '6'},
    {title: 'HUD', img: '7'},
    {title: '운전스타일', img: '8'},
    {title: '소모품관리', img: '9'},
  ];
  const [modalVisible, setModalVisible] = useState(false);

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
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={{width: '100%'}}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={{justifyContent: 'flex-end', marginLeft: '80%'}}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <ModalCloseBtn></ModalCloseBtn>
              </TouchableOpacity>
              <Text style={styles.modalText1}>내차운행정보</Text>
              <Text style={styles.modalText2}>서비스 오픈 예정입니다.</Text>
              <Text style={styles.modalText3}>조금만 기다려 주세요.</Text>
              <View style={styles.modalBtn}>
                <Text style={styles.modalText4}>확인</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <TopNav navigation={navigation} title="내차 운행정보" />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}> */}
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <FlatList
            data={DATA}
            style={styles.flatList}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            renderItem={({item}) => <Item title={item.title} img={item.img} />}
            numColumns={3}></FlatList>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 80,
  },
  container: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  flatList: {
    padding: -20,
    marginVertical: -8,
  },
  titleCode: {
    fontSize: 22,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
  },
  documentImage: {
    width: '100%',
  },
  itemContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: '1.5%',
    marginHorizontal: '1.5%',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3,
  },
  item: {
    height: 50,
    justifyContent: 'center',
    marginVertical: 8,
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
  modalContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginLeft: '10%',
    borderRadius: 20,
  },
  modalText1: {
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
    marginTop: '10%',
    fontFamily: 'Noto Sans',
  },
  modalText2: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    marginTop: '10%',
    fontFamily: 'Noto Sans',
  },
  modalText3: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    fontFamily: 'Noto Sans',
  },
  modalText4: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '500',

    fontFamily: 'Noto Sans',
  },
  modalBtn: {
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    backgroundColor: '#A7C1CF',
    width: '100%',
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',

    marginBottom: '-10%',
  },
});

export default RaceInfo;
