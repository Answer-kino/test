import React from 'react';
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
} from 'react-native';

import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const NFTDocument = ({navigation}) => {
  return (
    <View>
      <TopNav navigation={navigation} title="NFT보증서" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.titleCode}>KMHDL4DP8A23456798</Text>
          <Image
            style={styles.documentImage}
            source={require('../../../assets/nft_document1.png')}
            resizeMode="stretch"
          />
          <Text>Owned by mynftcar</Text>

          <View style={styles.descriptionBox}>
            <View style={styles.descriptionTitleContainer}>
              <Text>Description</Text>
              <Image source={require('../../../assets/logos_ethereum.png')} />
            </View>

            <Text>
              차량은 캐피탈사의 공식 보증된차이며, 한국보증협회의 엄격한 품질
              검사와 검사를 198회 통과한 인증 중고차임을 증명합니다.
            </Text>
            <TouchableOpacity style={styles.offerButton}>
              <Text style={styles.offerButtonText}>Make offer</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.detailBox}>
            <View style={styles.detailBoxLeft}>
              <Image source={require('../../../assets/Group.png')} />
              <Text style={styles.detailText}>Details</Text>
            </View>
            <Image source={require('../../../assets/bottomArrow.png')} />
          </TouchableOpacity>
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
    marginVertical: 15,
  },
  titleCode: {
    fontSize: 22,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
  },
  documentImage: {
    width: '100%',
    marginVertical: 10,
  },
  descriptionTitleContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  descriptionBox: {
    marginTop: 20,
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
  },
  detailBox: {
    marginTop: 20,
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailBoxLeft: {
    flexDirection: 'row',
  },
  detailText: {
    marginLeft: 10,
    fontSize: 15,
    letterSpacing: -0.05,
    color: '#444444',
  },
  offerButton: {
    marginTop: 20,
    height: 51,
    backgroundColor: '#DDE6F0',
    borderRadius: 10,
    padding: 15,
    margint: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerButtonText: {
    color: '#226EC8',
    fontSize: 18,
    lineHeight: 18,
  },
});

export default NFTDocument;
