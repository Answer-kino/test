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
        style={styles.scrollView}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.documentMenu}
            onPress={() => {
              navigation.push('NFTDocument');
            }}>
            <Nft></Nft>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>NFT 보증서</Text>
              <Text style={styles.text}>
                나의 등록된 NFT 차량 보증서 확인하기
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <Divider color="#DBDBDB" width={0.7} style={{opacity: 0.6}}></Divider> */}
        <Dividers marginTop="10"></Dividers>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CarRegister');
            }}>
            <View style={styles.documentMenu}>
              <CarRegister></CarRegister>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>차량등록증</Text>
                <Text style={styles.text}>내 차량등록증 확인하기</Text>
              </View>
            </View>
            {/* <Divider style={{marginTop: 10, opacity: 0.4}}></Divider> */}
          </TouchableOpacity>
        </View>
        <Dividers marginTop="10"></Dividers>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Insurance');
            }}>
            <View style={styles.documentMenu}>
              <Insurance></Insurance>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>보험가입증명서</Text>
                <Text style={styles.text}>내 보험가입 증명서 확인하기</Text>
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

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 80,
  },
  container: {
    marginHorizontal: 30,
    marginTop: 10, // 15->10
  },
  documentMenu: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderColor: '#D8D8D8',
  },
  descriptionContainer: {
    marginLeft: 10,
    marginTop: -10,
  },
  descriptionTitle: {
    fontSize: 17,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
    fontWeight: '700',
  },
  text: {
    color: 'black',
  },
});

export default CarDocument;
