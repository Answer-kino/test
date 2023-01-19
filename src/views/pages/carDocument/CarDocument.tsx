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
import TopNav from '../../../components/topNav/TopNav';

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
            <Image source={require('../../../assets/document2.png')} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>NFT 보증서</Text>
              <Text style={styles.text}>
                나의 등록된 NFT 차량 보증서 확인하기
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Divider style={{marginTop: 10, opacity: 0.4}}></Divider>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CarRegister');
            }}>
            <View style={styles.documentMenu}>
              <Image source={require('../../../assets/document1.png')} />
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>차량등록증</Text>
                <Text style={styles.text}>내 차량등록증 확인하기</Text>
              </View>
            </View>
            <Divider style={{marginTop: 10, opacity: 0.4}}></Divider>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Insurance');
            }}>
            <View style={styles.documentMenu}>
              <Image source={require('../../../assets/insurance.png')} />
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>보험가입증명서</Text>
                <Text style={styles.text}>내 보험가입 증명서 확인하기</Text>
              </View>
            </View>
          </TouchableOpacity>
          <Divider style={{marginTop: 10, opacity: 0.4}}></Divider>
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
  },
  documentMenu: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 15,
    paddingBottom: 15,
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
  },
  text: {
    color: 'black',
  },
});

export default CarDocument;
