import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
interface noticeDetailType {
  Title: string;
  Content: string;
}
import RenderHtml from 'react-native-render-html';
import API_BBS_SERVICE from '../../../@api/bbs/bbs';
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
        style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.descriptionTitle}>{noticeDetail?.Title}</Text>
          {/* <RenderHtml source={content} /> */}
          <Text style={styles.content}>{noticeDetail?.Content}</Text>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              navigation.replace('NoticeList', {category: category});
            }}>
            <Text style={styles.ButtonText}>확인</Text>
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
  titleContainer: {
    flexDirection: 'row',
  },
  content: {
    marginTop: 10,
    minHeight: 400,
    color: 'black',
  },
  commentContainer: {
    marginTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionTitle: {
    fontSize: 17,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
  },
  Button: {
    backgroundColor: 'white',
    height: 57,
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  ButtonText: {
    fontSize: 17,
    lineHeight: 18,
    color: '#2C2C2C',
  },
});

export default Notice;
