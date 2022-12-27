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
        alert('로그인 재시도');
        navigation.push('ContractCheck');
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
              <Image source={require('../../../assets/blackX.png')} />
            </TouchableOpacity>
            <Text style={styles.modalText}>의무가입사항</Text>
            <Text style={styles.modalText}>
              {capitalInfo?.CompulsorySubscription}
            </Text>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>확 인</Text>
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
              <Text>이용자명</Text>
              <Text>{capitalInfo?.Name}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>사업자</Text>
              <Text>{capitalInfo?.Business}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>대상구분</Text>
              <Text>{capitalInfo?.Division}</Text>
            </View>
          </View>
          {/**----------- */}
          {/**----------- */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>이용차량의 표시</Text>
            <View style={styles.descriptionRow}>
              <Text>개시일</Text>
              <Text>{convertTime(capitalInfo?.StartAt)}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>만기일</Text>
              <Text>{convertTime(capitalInfo?.DueAt)}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>차량번호</Text>
              <Text>{capitalInfo?.CarNumber}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>차대번호</Text>
              <Text>{capitalInfo?.VehicleId}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>차량명</Text>
              <Text>{capitalInfo?.VehicleName}</Text>
            </View>
          </View>
          {/**----------- */}

          {/**----------- */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>주요계약조건</Text>
            <View style={styles.descriptionRow}>
              <Text>대여기간</Text>
              <Text>{convertTime(capitalInfo?.RentalPeriod)}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>약정 운행거리</Text>
              <Text>{`${addComma(capitalInfo?.ContractedMileage)} km`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>보증금</Text>
              <Text>{`${addComma(capitalInfo?.Subsidy)} 원`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>선수금</Text>
              <Text>{`${addComma(capitalInfo?.AdvancePay)} 원`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>계약해지시</Text>
              <Text>{capitalInfo?.AcquisitionOrReturn}</Text>
            </View>
          </View>
          {/**----------- */}
          {/**----------- */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>결제정보</Text>
            <View style={styles.descriptionRow}>
              <Text>정비 서비스</Text>
              <Text>{capitalInfo?.Repair}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>결제방법</Text>
              <Text>{capitalInfo?.PaymentMethod}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>결제은행</Text>
              <Text>{capitalInfo?.PaymentBank}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>결제일</Text>
              <Text>{`매월 ${capitalInfo?.PaymentAt} 일`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>예금주</Text>
              <Text>{capitalInfo?.AccountHolder}</Text>
            </View>
          </View>
          {/**----------- */}
          {/**----------- */}
          <View style={styles.descriptionContainer2}>
            <Text style={styles.descriptionTitle}>보험내용</Text>
            <View style={styles.descriptionRow}>
              <Text>운전자 연령</Text>
              <Text>{`${capitalInfo?.DriverAge} 세이상`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>자기부담금</Text>
              <Text>{`${cutOff__10000(capitalInfo?.Dedutible)} 만원`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>차량반납시 차량훼손 면책금</Text>
              <Text>{`${cutOff__10000(
                capitalInfo?.IndemnityReturn
              )} 만원`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>차량전손시 차량손해 면책금</Text>
              <Text>{`${cutOff__10000(
                capitalInfo?.IndemnityTotalLoss
              )} 만원`}</Text>
            </View>
            <View style={styles.descriptionRow}>
              <Text>의무가입사항</Text>
              <TouchableOpacity style={styles.button} onPress={openModal}>
                <Text style={styles.buttonText}>확인하기</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/**----------- */}
        </View>
        <View style={styles.bottomDescription}>
          <Text>
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
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: -15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
  },
  descriptionContainer2: {
    marginHorizontal: 30,
    marginTop: 30,
    paddingBottom: 20,
  },
  descriptionTitle: {
    fontSize: 17,
    marginVertical: 3,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
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
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalClose: {
    margin: -10,
    width: '100%',
    alignItems: 'flex-end',
  },
});

export default ContractCheck;
