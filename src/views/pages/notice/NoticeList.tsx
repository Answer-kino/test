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
import API_BBS_SERVICE from '../../../@api/bbs/bbs';

import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const NoticeList = ({navigation, route}: any) => {
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
  const BBS_SERVICE = new API_BBS_SERVICE();
  const NoticeList = async () => {
    try {
      const result = await BBS_SERVICE.BBS_Main_Notice();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    NoticeList();
  }, []);
  return (
    <View>
      <TopNav navigation={navigation} title="공지사항" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.descriptionTitle}>{route.params.title}</Text>
          <TouchableOpacity
            onPress={() => navigation.push('Notice')}
            style={styles.documentMenu}>
            <Text style={styles.descriptionTitle}>캐피탈 서비스 점검 안내</Text>
            <Text style={{color: 'black'}}>2022.11.28 | 캐피탈공지</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push('Notice')}
            style={styles.documentMenu}>
            <Text style={styles.descriptionTitle}>
              신분증 진위확인 일시중단 안내
            </Text>
            <Text style={{color: 'black'}}>2022.11.26 | 캐피탈공지</Text>
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
  },
  descriptionTitle: {
    fontSize: 17,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
  },
});

export default NoticeList;
