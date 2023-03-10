import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import _ from 'lodash';
import API_BBS_SERVICE from '../../../@api/bbs/bbs';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import Dividers from '../../../components/divider/Dividers';
import {Font} from '../../../assets/css/global/newFont';

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
  console.log(route.params);
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

      // console.log('0106', result);
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
    <View style={globalStyles.BodyWrap}>
      <TopNav navigation={navigation} title="공지사항" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={globalStyles.ScrollViewBorder}>
        <View style={globalStyles.MainWrap}>
          <Text style={Font.NoticeTopTitle}>{noticeTitle}</Text>
        </View>
        {/* <Divider width={1} style={{marginVertical: 15}} /> */}
        <Dividers marginTop="15" marginBottom="15"></Dividers>
        {noticeInfo.map((item: any, index: any) => {
          const Title = item.Title;
          const temp = item.CreatedDay;
          const boardIdx = item.IDX_BOARD;
          const CreateDay =
            temp.split('T')[0] + ' ' + temp.split('T')[1].split('.')[0];
          return (
            <>
              <View style={globalStyles.MainWrap} key={index}>
                {/* TODO: 공지사항 추가 작업 필 */}
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.push('Notice', {
                      boardIdx: boardIdx,
                      category: category,
                    })
                  }>
                  <Text style={Font.NoticeTitle}>{Title}</Text>
                  <Text style={Font.NoticeTimeCategory}>
                    {CreateDay} | {category2}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <Divider width={1} style={{marginVertical: 15}} /> */}
              <Dividers marginTop="15" marginBottom="15" />
            </>
          );
        })}
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default NoticeList;
