import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
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
import Dividers from '../../../components/divider/Dividers';
import {Font} from '../../../assets/css/global/newFont';
import {MarginTop} from '../../../assets/css/global/margin';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import {modalStyles} from '../../../assets/css/modal/modal';
import {ContractChecktyles} from '../../../assets/css/contractCheck/contractCheck';

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
        <View style={modalStyles.ModalWrap}>
          <View style={ContractChecktyles.ModalView}>
            <TouchableOpacity
              style={ContractChecktyles.ModalClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <ModalCloseBtn style={{marginLeft: '95%'}}></ModalCloseBtn>
            </TouchableOpacity>
            <Text style={Font.ContractCheckModalTop}>의무가입사항</Text>
            <View style={MarginTop(15)}>
              <Text style={Font.ContractCheckModalBottom}>
                {capitalInfo?.CompulsorySubscription}
              </Text>
            </View>
            <TouchableOpacity
              style={ContractChecktyles.ButtonClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={Font.ContractCheckModalCheckBtn}>확 인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TopNav navigation={navigation} title="계약확인" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={globalStyles.ScrollView}>
        <View style={ContractChecktyles.Container}>
          <View style={ContractChecktyles.DescriptionContainer}>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>이용자명</Text>
              <Text style={Font.ContractCheckRight}>{capitalInfo?.Name}</Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>사업자</Text>
              <Text style={Font.ContractCheckRight}>
                {capitalInfo?.Business}
              </Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
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
          <View style={ContractChecktyles.DescriptionContainer}>
            <Text style={Font.ContractCheckTitle}>이용차량의 표시</Text>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>개시일</Text>
              <Text style={Font.ContractCheckRight}>
                {convertTime(capitalInfo?.StartAt)}
              </Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>만기일</Text>
              <Text style={Font.ContractCheckRight}>
                {convertTime(capitalInfo?.DueAt)}
              </Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>차량번호</Text>
              <Text style={Font.ContractCheckRight}>
                {capitalInfo?.CarNumber}
              </Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>차대번호</Text>
              <Text style={Font.ContractCheckRight}>
                {capitalInfo?.VehicleId}
              </Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
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
          <View style={ContractChecktyles.DescriptionContainer}>
            <Text style={Font.ContractCheckTitle}>주요계약조건</Text>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>대여기간</Text>
              <Text style={Font.ContractCheckRight}>
                {convertTime(capitalInfo?.RentalPeriod)}
              </Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>약정 운행거리</Text>
              <Text style={Font.ContractCheckRight}>{`${addComma(
                capitalInfo?.ContractedMileage
              )} km`}</Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>보증금</Text>
              <Text style={Font.ContractCheckRight}>{`${addComma(
                capitalInfo?.Subsidy
              )} 원`}</Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>선수금</Text>
              <Text style={Font.ContractCheckRight}>{`${addComma(
                capitalInfo?.AdvancePay
              )} 원`}</Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
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
          <View style={ContractChecktyles.DescriptionContainer}>
            <Text style={Font.ContractCheckTitle}>결제정보</Text>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>정비 서비스</Text>
              <Text style={Font.ContractCheckRight}>{capitalInfo?.Repair}</Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>결제방법</Text>
              <Text style={Font.ContractCheckRight}>
                {capitalInfo?.PaymentMethod}
              </Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>결제은행</Text>
              <Text style={Font.ContractCheckRight}>
                {capitalInfo?.PaymentBank}
              </Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>결제일</Text>
              <Text
                style={
                  Font.ContractCheckRight
                }>{`매월 ${capitalInfo?.PaymentAt} 일`}</Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
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
          <View style={ContractChecktyles.DescriptionContainer2}>
            <Text style={Font.ContractCheckTitle}>보험내용</Text>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>운전자 연령</Text>
              <Text
                style={
                  Font.ContractCheckRight
                }>{`${capitalInfo?.DriverAge} 세이상`}</Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>자기부담금</Text>
              <Text style={Font.ContractCheckRight}>{`${cutOff__10000(
                capitalInfo?.Dedutible
              )} 만원`}</Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>
                차량반납시 차량훼손 면책금
              </Text>
              <Text style={Font.ContractCheckRight}>{`${cutOff__10000(
                capitalInfo?.IndemnityReturn
              )} 만원`}</Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>
                차량전손시 차량손해 면책금
              </Text>
              <Text style={Font.ContractCheckRight}>{`${cutOff__10000(
                capitalInfo?.IndemnityTotalLoss
              )} 만원`}</Text>
            </View>
            <View style={ContractChecktyles.DescriptionRow}>
              <Text style={Font.ContractCheckLeft}>의무가입사항</Text>
              <TouchableOpacity
                style={ContractChecktyles.Button}
                onPress={openModal}>
                <Text style={Font.ContractCheckCheckBtn}>확인하기</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/**----------- */}
        </View>
        <View style={ContractChecktyles.BottomDescription}>
          <Text style={Font.ContractCheckBottomText}>
            {`※상기 계약과 같이 ${capitalInfo?.Capital} 렌트카 계약이 체결되었음을 확인합니다.`}
          </Text>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default ContractCheck;
