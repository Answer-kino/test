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

import CapitalNotice from '../../../assets/img/noticeCategory/capitalNotice.svg';
import NftNotice from '../../../assets/img/noticeCategory/nftNotice.svg';
import RecallNotice from '../../../assets/img/noticeCategory/recallNotice.svg';
import Dividers from '../../../components/divider/Dividers';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import NoticeCategoryListStyles from '../../../assets/css/notice/noticeCategory';
import {Font} from '../../../assets/css/global/newFont';
const NoticeCategory = ({navigation}: any) => {
  const naviHander = (category: string) => {
    navigation.push('NoticeList', {category});
  };

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
        style={globalStyles.ScrollView}>
        <View style={NoticeCategoryListStyles.Container}>
          <TouchableOpacity
            // onPress={() =>
            //   navigation.push('NoticeList', {title: '캐피탈 공지'})
            // }
            onPress={() => naviHander('capital')}
            style={NoticeCategoryListStyles.DocumentMenu}>
            <View style={NoticeCategoryListStyles.LeftContainer}>
              <View style={NoticeCategoryListStyles.LeftImg}>
                <CapitalNotice />
              </View>
              <Text style={Font.NoticeCategoryText}>캐피탈 공지</Text>
            </View>
            <Image
              style={NoticeCategoryListStyles.RightArrow}
              source={require('../../../assets/NoticeArrow.png')}
            />
          </TouchableOpacity>
        </View>
        <Dividers />
        <View style={NoticeCategoryListStyles.Container}>
          <TouchableOpacity
            // onPress={() => navigation.push('NoticeList', {title: 'NFT공지'})}
            onPress={() => naviHander('nft')}
            style={NoticeCategoryListStyles.DocumentMenu}>
            <View style={NoticeCategoryListStyles.LeftContainer}>
              <View style={NoticeCategoryListStyles.LeftImg2}>
                <NftNotice></NftNotice>
              </View>
              <Text style={Font.NoticeCategoryText}>NFT공지</Text>
            </View>
            <Image
              style={NoticeCategoryListStyles.RightArrow}
              source={require('../../../assets/NoticeArrow.png')}
            />
          </TouchableOpacity>
        </View>
        <Dividers />
        <View style={NoticeCategoryListStyles.Container}>
          <TouchableOpacity
            // onPress={() => navigation.push('NoticeList', {title: '리콜 공지'})}
            onPress={() => naviHander('recall')}
            style={NoticeCategoryListStyles.DocumentMenu}>
            <View style={NoticeCategoryListStyles.LeftContainer}>
              <View style={NoticeCategoryListStyles.LeftImg3}>
                <RecallNotice></RecallNotice>
              </View>
              <Text style={Font.NoticeCategoryText}>리콜 공지</Text>
            </View>
            <Image
              style={NoticeCategoryListStyles.RightArrow}
              source={require('../../../assets/NoticeArrow.png')}
            />
          </TouchableOpacity>
        </View>
        <Dividers />
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default NoticeCategory;
