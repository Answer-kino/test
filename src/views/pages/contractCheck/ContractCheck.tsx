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
  Touchable,
  Button,
  Pressable,
  Modal,
  Alert,
  BackHandler,
} from 'react-native';
import API_CAPITAL_SERVICE from '../../../@api/capital/capital';
import API_TOKEN_SERVICE from '../../../@api/token/token';
import {ECapitalInfo} from '../../../@entity/capital/entity';
import {addComma, cutOff__10000} from '../../../@utility/number';
import {convertTime} from '../../../@utility/time';

import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';
import ModalCloseBtn from '../../../assets/modalclosetbtn.svg';
import {Divider} from '@rneui/base';
import Dividers from '../../../components/divider/Dividers';
import {Font} from '../../../assets/css/global/newFont';

const ContractCheck = ({navigation}: any) => {
  const CAPITAL_SERVICE = new API_CAPITAL_SERVICE();
  const TOKEN_SERVICE = new API_TOKEN_SERVICE();

  const [capitalInfo, setCapitalInfo] = useState<ECapitalInfo>({});
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);

  const getCapitalInfo = async () => {
    try {
      const data = await CAPITAL_SERVICE.GET();
      setCapitalInfo(data);
    } catch (error) {
      const success = await TOKEN_SERVICE.REFRESH__TOKEN();

      if (success) {
        alert('관리자에게 문의해주세요.');
      } else {
        alert('로그인을 다시 시도해주세요.');
        navigation.push('Login2');
      }
    }
  };

  useEffect(() => {
    getCapitalInfo();
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
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <ModalCloseBtn style={{marginLeft: '95%'}}></ModalCloseBtn>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>의무가입사항</Text>
            <Text style={styles.modalText}>
              {capitalInfo?.CompulsorySubscription}
            </Text>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonText}>확 인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TopNav navigation={navigation} title="계약확인" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.descriptionContainer}>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>이용자명</Text>
              <Text style={Font.ContractCheckRight}>{capitalInfo?.Name}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>사업자</Text>
              <Text style={Font.ContractCheckRight}>
                {capitalInfo?.Business}
              </Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>대상구분</Text>
              <Text style={Font.ContractCheckRight}>
                {capitalInfo?.Division}
              </Text>
            </View>
          </View>
          {/* <Divider style={styles.divider}></Divider> */}
          <Dividers marginTop="10"></Dividers>
          {/**----------- */}
          {/**----------- */}
          <View style={styles.descriptionContainer}>
            <Text style={Font.ContractCheckTitle}>이용차량의 표시</Text>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>개시일</Text>
              <Text style={Font.ContractCheckRight}>
                {convertTime(capitalInfo?.StartAt)}
              </Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>만기일</Text>
              <Text style={Font.ContractCheckRight}>
                {convertTime(capitalInfo?.DueAt)}
              </Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>차량번호</Text>
              <Text style={Font.ContractCheckRight}>
                {capitalInfo?.CarNumber}
              </Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>차대번호</Text>
              <Text style={Font.ContractCheckRight}>
                {capitalInfo?.VehicleId}
              </Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>차량명</Text>
              <Text style={Font.ContractCheckRight}>
                {capitalInfo?.VehicleName}
              </Text>
            </View>
          </View>
          {/* <Divider style={styles.divider}></Divider> */}
          <Dividers marginTop="10"></Dividers>
          {/**----------- */}

          {/**----------- */}
          <View style={styles.descriptionContainer}>
            <Text style={Font.ContractCheckTitle}>주요계약조건</Text>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>대여기간</Text>
              <Text style={Font.ContractCheckRight}>
                {convertTime(capitalInfo?.RentalPeriod)}
              </Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>약정 운행거리</Text>
              <Text style={Font.ContractCheckRight}>{`${addComma(
                capitalInfo?.ContractedMileage
              )} km`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>보증금</Text>
              <Text style={Font.ContractCheckRight}>{`${addComma(
                capitalInfo?.Subsidy
              )} 원`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>선수금</Text>
              <Text style={Font.ContractCheckRight}>{`${addComma(
                capitalInfo?.AdvancePay
              )} 원`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>계약해지시</Text>
              <Text style={Font.ContractCheckRight}>
                {capitalInfo?.AcquisitionOrReturn}
              </Text>
            </View>
          </View>
          {/* <Divider style={styles.divider}></Divider> */}
          <Dividers marginTop="10" />
          {/**----------- */}
          {/**----------- */}
          <View style={styles.descriptionContainer}>
            <Text style={Font.ContractCheckTitle}>결제정보</Text>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>정비 서비스</Text>
              <Text style={Font.ContractCheckRight}>{capitalInfo?.Repair}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>결제방법</Text>
              <Text style={Font.ContractCheckRight}>
                {capitalInfo?.PaymentMethod}
              </Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>결제은행</Text>
              <Text style={Font.ContractCheckRight}>
                {capitalInfo?.PaymentBank}
              </Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>결제일</Text>
              <Text
                style={
                  Font.ContractCheckRight
                }>{`매월 ${capitalInfo?.PaymentAt} 일`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>예금주</Text>
              <Text style={Font.ContractCheckRight}>
                {capitalInfo?.AccountHolder}
              </Text>
            </View>
          </View>
          {/* <Divider style={styles.divider}></Divider> */}
          <Dividers marginTop="10" />
          {/**----------- */}
          {/**----------- */}
          <View style={styles.descriptionContainer2}>
            <Text style={Font.ContractCheckTitle}>보험내용</Text>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>운전자 연령</Text>
              <Text
                style={
                  Font.ContractCheckRight
                }>{`${capitalInfo?.DriverAge} 세이상`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>자기부담금</Text>
              <Text style={Font.ContractCheckRight}>{`${cutOff__10000(
                capitalInfo?.Dedutible
              )} 만원`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>
                차량반납시 차량훼손 면책금
              </Text>
              <Text style={Font.ContractCheckRight}>{`${cutOff__10000(
                capitalInfo?.IndemnityReturn
              )} 만원`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>
                차량전손시 차량손해 면책금
              </Text>
              <Text style={Font.ContractCheckRight}>{`${cutOff__10000(
                capitalInfo?.IndemnityTotalLoss
              )} 만원`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={Font.ContractCheckLeft}>의무가입사항</Text>
              <TouchableOpacity style={styles.button} onPress={openModal}>
                <Text style={Font.ContractCheckCheckBtn}>확인하기</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/**----------- */}
        </View>
        <View style={styles.bottomDescription}>
          <Text style={Font.ContractCheckBottomText}>
            {`※상기 계약과 같이 ${capitalInfo?.Capital} 렌트카 계약이 체결되었음을 확인합니다.`}
          </Text>
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
  container: {
    marginHorizontal: 30,
    marginTop: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
  },
  bottomDescription: {
    marginHorizontal: 50,
    marginTop: 10,
    marginBottom: 100,
  },
  descriptionContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: -10,
    paddingBottom: 15,
    // borderBottomWidth: 1,
    // borderColor: '#D8D8D8',
  },
  descriptionContainer2: {
    marginHorizontal: 20,
    marginTop: 10,
    paddingBottom: 20,
  },
  descriptionTitle: {
    fontSize: 17,
    marginVertical: 3,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
    fontFamily: 'Noto Sans',
    fontWeight: '700',
  },
  descriptionText: {
    marginVertical: 3,
    color: 'black',
  },
  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 62,
    height: 24,
    backgroundColor: '#879BB9',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    overflow: 'hidden',
  },
  buttonClose: {
    marginTop: 20,
    marginBottom: -35,
    backgroundColor: '#A7C1CF',
    width: 1000,
    height: 49,
    justifyContent: 'center',
  },
  textStyle: {
    color: 'black',
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 2,
  },
  modalTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalClose: {
    // margin: -10,
    marginTop: '-10%',
    width: '100%',
    // alignItems: 'flex-end',
  },
  divider: {
    marginTop: 10,
    opacity: 0.4,
  },
});

export default ContractCheck;
