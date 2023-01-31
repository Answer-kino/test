import {Divider} from '@rneui/base';
import React, {useEffect} from 'react';
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
  BackHandler,
} from 'react-native';

import BottomNav from '../../../components/bottomNav/BottomNav';
import Dividers from '../../../components/divider/Dividers';
import TopNav from '../../../components/topNav/TopNav';
import Insurance from '../../../assets/img/carDocument/insurance.svg';
import CarRegister from '../../../assets/img/carDocument/carregister.svg';
import Nft from '../../../assets/img/carDocument/nft.svg';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import {CarDocumentStyles} from '../../../assets/css/carDocument/carDocument';
import {Font} from '../../../assets/css/global/newFont';
const CarDocument = ({navigation}: any) => {
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
      <TopNav navigation={navigation} title="내차 NFT 증빙서류" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={globalStyles.ScrollView}>
        <View style={CarDocumentStyles.Container}>
          <TouchableOpacity
            style={CarDocumentStyles.DocumentMenu}
            onPress={() => {
              navigation.push('NFTDocument');
            }}>
            <Nft></Nft>
            <View style={CarDocumentStyles.DescriptionContainer}>
              <Text style={Font.MyCarDocumentTitle}>NFT 보증서</Text>
              <Text style={Font.MyCarDocumentContent}>
                나의 등록된 NFT 차량 보증서 확인하기
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <Divider color="#DBDBDB" width={0.7} style={{opacity: 0.6}}></Divider> */}
        <Dividers marginTop="10"></Dividers>
        <View style={CarDocumentStyles.Container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CarRegister');
            }}>
            <View style={CarDocumentStyles.DocumentMenu}>
              <CarRegister></CarRegister>
              <View style={CarDocumentStyles.DescriptionContainer}>
                <Text style={Font.MyCarDocumentTitle}>차량등록증</Text>
                <Text style={Font.MyCarDocumentContent}>
                  내 차량등록증 확인하기
                </Text>
              </View>
            </View>
            {/* <Divider style={{marginTop: 10, opacity: 0.4}}></Divider> */}
          </TouchableOpacity>
        </View>
        <Dividers marginTop="10"></Dividers>
        <View style={CarDocumentStyles.Container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Insurance');
            }}>
            <View style={CarDocumentStyles.DocumentMenu}>
              <Insurance></Insurance>
              <View style={CarDocumentStyles.DescriptionContainer}>
                <Text style={Font.MyCarDocumentTitle}>보험가입증명서</Text>
                <Text style={Font.MyCarDocumentContent}>
                  내 보험가입 증명서 확인하기
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* <Divider style={{marginTop: 10, opacity: 0.4}}></Divider> */}
        </View>
        <Dividers></Dividers>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default CarDocument;
