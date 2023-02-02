import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import API_BBS_SERVICE from '../../../@api/bbs/bbs';
import {timeForToday} from '../../../@utility/time';
import CommunityListStyles from '../../../assets/css/community/communityList';
import {Font} from '../../../assets/css/global/newFont';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import BottomNav from '../../../components/bottomNav/BottomNav';
import Dividers from '../../../components/divider/Dividers';
import TopNav from '../../../components/topNav/TopNav';

const CommunityBoardList = ({navigation, route}: any) => {
  const BBS_SERVICE = new API_BBS_SERVICE();
  const [commnuityList, setCommnuityList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const setCommnuityListHandler = async () => {
    try {
      console.log('asdfsadf');
      const obj: any = {category: 'BBS_BC_100003', limit: 10, offset: 0};
      const {result, totalCnt} = await BBS_SERVICE.BBS_Community_LIst(obj);
      console.log('result', result);
      setCommnuityList(result);
    } catch (error) {
      alert('리스트 항목을 불러오는데 실패 했습니다.');
    }
  };

  const boardLinkHandler = (IDX_BOARD: number) => () => {
    navigation.navigate('CommunityBoard', {IDX_BOARD});
  };

  useEffect(() => {
    setCommnuityListHandler();
  }, []);

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
      <Modal transparent={true} visible={isLoading}>
        <ActivityIndicator
          size={'large'}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
      </Modal>
      <TopNav navigation={navigation} title="커뮤니티" />
      <TouchableOpacity
        style={CommunityListStyles.WriteButtonFloat}
        onPress={() => {
          navigation.push('CommunityBoardWrite');
        }}>
        <View style={CommunityListStyles.WriteContainer}>
          <Image source={require('../../../assets/write.png')} />
        </View>
      </TouchableOpacity>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={globalStyles.ScrollViewBorder}>
        <View style={globalStyles.MainWrap}>
          <Text style={Font.CommunityListTopTitle}>자유게시판</Text>
        </View>
        {/* <Divider width={1} style={{marginVertical: 15}} /> */}
        <Dividers marginTop="15" marginBottom="15" />
        {commnuityList.map((item, index) => {
          console.log(item);
          const {
            Title,
            CommentCnt: CommentCnt,
            CreatedDay: tempTime,
            IDX_BOARD,
          }: any = item;
          const CreatedDay = timeForToday(tempTime);

          return (
            <>
              <View key={index} style={globalStyles.MainWrap}>
                <TouchableOpacity onPress={boardLinkHandler(IDX_BOARD)}>
                  <View style={CommunityListStyles.MiddleTopWrap}>
                    <Text style={Font.CommunityListTitle}>{Title} </Text>
                    <Text style={Font.CommunityListCommentCountText}>
                      {CommentCnt}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View>
                  <Text style={Font.CommunityListCreatedTime}>
                    {CreatedDay}
                  </Text>
                </View>
              </View>
              {/* <Divider width={1} style={{marginVertical: 15}} /> */}
              <Dividers marginTop="15" marginBottom="15" />
            </>
          );
        })}
        {/* <View>
            <FlatList
              renderItem={renderItem}
              data={scrollInfo}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.4}
              // ListFooterComponent={loading && <ActivityIndicator />}
            />
          </View> */}
        {/* {totalCnt < 7 ? null : <View style={{marginTop: -200}}></View>} */}
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default CommunityBoardList;
