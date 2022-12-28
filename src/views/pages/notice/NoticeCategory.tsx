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

const NoticeCategory = ({navigation}: any) => {
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
      <TopNav navigation={navigation} title="공지사항" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() =>
              navigation.push('NoticeList', {title: '캐피탈 공지'})
            }
            style={styles.documentMenu}>
            <View style={styles.leftContainer}>
              <View style={styles.leftImg}>
                <Image source={require('../../../assets/notice.png')} />
              </View>
              <Text style={styles.descriptionTitle}>캐피탈 공지</Text>
            </View>
            <Image
              style={styles.rightArrow}
              source={require('../../../assets/NoticeArrow.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push('NoticeList', {title: 'NFT공지'})}
            style={styles.documentMenu}>
            <View style={styles.leftContainer}>
              <View style={styles.leftImg2}>
                <Image source={require('../../../assets/NFT.png')} />
              </View>
              <Text style={styles.descriptionTitle}>NFT공지</Text>
            </View>
            <Image
              style={styles.rightArrow}
              source={require('../../../assets/NoticeArrow.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push('NoticeList', {title: '리콜 공지'})}
            style={styles.documentMenu}>
            <View style={styles.leftContainer}>
              <View style={styles.leftImg3}>
                <Image source={require('../../../assets/re_call.png')} />
              </View>
              <Text style={styles.descriptionTitle}>리콜 공지</Text>
            </View>
            <Image
              style={styles.rightArrow}
              source={require('../../../assets/NoticeArrow.png')}
            />
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
    marginTop: 15,
  },
  documentMenu: {
    marginTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightArrow: {
    flexDirection: 'row',
  },
  descriptionTitle: {
    fontSize: 17,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
    marginLeft: 10,
  },
  leftImg: {
    backgroundColor: '#C8DFE7',
    width: 41,
    height: 41,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftImg2: {
    backgroundColor: '#ACDFDC',
    width: 41,
    height: 41,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftImg3: {
    backgroundColor: '#9DD6C8',
    width: 41,
    height: 41,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NoticeCategory;
