import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
interface noticeDetailType {
  Title: string;
  Content: string;
}
import API_BBS_SERVICE from '../../../@api/bbs/bbs';
import {Font} from '../../../assets/css/global/newFont';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import noticeDetailStyles from '../../../assets/css/notice/noticeDetail';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';
const BBS_SERVICE = new API_BBS_SERVICE();

const Notice = ({navigation, route}: any) => {
  const [boardIdx, setBoardIdx] = useState('');
  const [category, setCategory] = useState('');
  const [noticeDetail, setNoticeDetail] = useState<noticeDetailType>();

  // 공지사항 API
  const getNoticeDetail = async () => {
    try {
      const result = await BBS_SERVICE.BBS_Community_Detail(boardIdx);
      setNoticeDetail(result);
    } catch (error) {
      console.log(error);
    }
  };

  const setCategoryHandler = () => {
    let cateogryParam = '';
    switch (route.params.category) {
      case 'BBS_BC_200001':
        cateogryParam = 'capital';
        break;
      case 'BBS_BC_200002':
        cateogryParam = 'nft';
        break;
      case 'BBS_BC_200003':
        cateogryParam = 'recall';
        break;
      default:
        cateogryParam = route.params.category;
        break;
    }
    setCategory(cateogryParam);
  };
  // state 받는 부분, category받는 이유는 noteicelist 페이지로 다시 돌아갔을 때 에러를 잡기위해
  useEffect(() => {
    setBoardIdx(route.params.boardIdx);
    setCategoryHandler();
  }, []);

  // boardIdx가
  useEffect(() => {
    console.log('Notice boardIdx : ', boardIdx);
    getNoticeDetail();
  }, [boardIdx]);

  useEffect(() => {
    console.log('Notice category : ', category);
  }, [category]);
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
        <View style={noticeDetailStyles.Container}>
          <Text style={Font.NoticeDetailTitle}>{noticeDetail?.Title}</Text>
          {/* <RenderHtml source={content} /> */}
          <Text style={Font.NoticeDetailContent}>{noticeDetail?.Content}</Text>
          <TouchableOpacity
            style={noticeDetailStyles.Button}
            onPress={() => {
              navigation.replace('NoticeList', {category: category});
            }}>
            <Text style={Font.NoticeDetailCheckBtn}>확인</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default Notice;
