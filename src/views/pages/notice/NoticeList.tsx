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
  BackHandler,
} from 'react-native';
import _ from 'lodash';
import API_BBS_SERVICE from '../../../@api/bbs/bbs';

import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const tmpObj: {[key: string]: any} = {
  capital: {
    title: '캐피탈 공지',
    key: 'BBS_BC_200001',
    bottomTitle: '캐피탈공지',
  },
  nft: {title: 'NFT 공지', key: 'BBS_BC_200002', bottomTitle: 'NFT공지'},
  recall: {title: '리콜 공지', key: 'BBS_BC_200003', bottomTitle: '리콜공지'},
};

const NoticeList = ({navigation, route}: any) => {
  const BBS_SERVICE = new API_BBS_SERVICE();
  const [noticeTitle, setNoticeTitle] = useState<string>();
  const [category, setCategory] = useState<any>();
  const [categoryKey, setCategoryKey] = useState<string>();
  const [category2, setCategory2] = useState('');
  const [noticeInfo, setNoticeInfo] = useState([]);

  const setCategoryHandler = (category: string) => {
    setCategory(category);
  };

  const setHandler = () => {
    try {
      const {title, key, bottomTitle} = tmpObj[category];
      setNoticeTitle(title);
      setCategoryKey(key);
      setCategory2(bottomTitle);
    } catch (error: any) {
      console.error(error);
    }
  };

  const getNotice = async () => {
    try {
      const obj: any = {category: categoryKey, limit: 10, offset: 0};
      const result: any = await BBS_SERVICE.BBS_Category_Notice(obj);
      setNoticeInfo(result);
    } catch (error) {
      // console.log('getNotice :', error);
    }
  };

  useEffect(() => {
    const {category} = route.params;
    /**
     * Error 핸들링
     */
    setCategoryHandler(category);
  }, [route]);

  useEffect(() => {
    if (!_.isUndefined(category)) {
      // console.log('category : ', category);
      setHandler();
    }
  }, [category]);

  useEffect(() => {
    if (!_.isUndefined(categoryKey)) {
      getNotice();
      // console.log('taewon1', noticeInfo);
    }
  }, [categoryKey]);

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
          <Text style={styles.descriptionTitle}>{noticeTitle}</Text>
          {noticeInfo.map((item, index): any => {
            const Title = item.Title;
            const temp = item.CreatedDay;
            const CreateDay =
              temp.split('T')[0] + ' ' + temp.split('T')[1].split('.')[0];
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.push('Notice')}
                style={styles.documentMenu}>
                <Text style={styles.descriptionTitle}>{Title}</Text>
                <Text style={{color: 'black'}}>
                  {CreateDay} | {category2}
                </Text>
              </TouchableOpacity>
            );
          })}
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
