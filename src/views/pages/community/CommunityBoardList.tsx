import {useIsFocused} from '@react-navigation/native';
import {Divider} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import API_BBS_SERVICE from '../../../@api/bbs/bbs';
import {timeForToday} from '../../../@utility/time';
import {Weight} from '../../../assets/css/global/font';
import {globalStyles} from '../../../assets/css/global/styleSheet';

import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const CommunityBoardList = ({navigation, route}: any) => {
  const BBS_SERVICE = new API_BBS_SERVICE();
  const [commnuityList, setCommnuityList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const setCommnuityListHandler = async () => {
    try {
      const obj: any = {category: 'BBS_BC_100003', limit: 10, offset: 0};
      const {result, totalCnt} = await BBS_SERVICE.BBS_Community_LIst(obj);

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
        style={styles.writeButtonFloat}
        onPress={() => {
          navigation.push('CommunityBoardWrite');
        }}>
        <View style={styles.writeContainer}>
          <Image source={require('../../../assets/write.png')} />
        </View>
      </TouchableOpacity>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={globalStyles.ScrollViewBorder}>
        <View style={globalStyles.MainWrap}>
          <Text
            style={{
              fontSize: 19,
              lineHeight: 35,
              ...Weight.Bold,
              ...Colors[292929],
            }}>
            자유게시판
          </Text>
        </View>
        <Divider width={1} style={{marginVertical: 15}} />
        {commnuityList.map((item, index) => {
          console.log(item);
          const {
            Title,
            View: itemView,
            CreatedDay: tempTime,
            IDX_BOARD,
          }: any = item;
          const CreatedDay = timeForToday(tempTime);

          return (
            <>
              <View key={index} style={globalStyles.MainWrap}>
                <TouchableOpacity onPress={boardLinkHandler(IDX_BOARD)}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 30,
                        ...Weight.Default,
                        ...Colors[525252],
                      }}>
                      {Title}{' '}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 30,
                        color: '#FF4C46',
                        ...Weight.Normal,
                        // ...Colors.Red,
                      }}>
                      {itemView}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View>
                  <Text
                    style={{
                      fontSize: 13,
                      ...Weight.Normal,
                      ...Colors[666666],
                    }}>
                    {CreatedDay}
                  </Text>
                </View>
              </View>
              <Divider width={1} style={{marginVertical: 15}} />
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

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 30,
    marginTop: 15,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  documentMenu: {
    marginTop: 15,
    paddingBottom: 15,

    flexGrow: 1,
  },
  descriptionTopTitle: {
    fontSize: 17,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
    marginLeft: 15,
    fontWeight: '700',
  },
  descriptionTitle: {
    fontSize: 17,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
    marginLeft: 15,
  },
  comment: {
    fontSize: 17,
    color: '#FF4C46',
    lineHeight: 35,
    letterSpacing: -0.05,
    marginLeft: 10,
  },
  writeButtonFloat: {
    backgroundColor: 'black',
    width: 53,
    height: 53,
    zIndex: 1,
    position: 'absolute',
    top: Dimensions.get('window').height - 170,
    bottom: 0,
    // left: 0,
    right: '5%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  writeContainer: {
    borderBottomColor: 'white',
    paddingBottom: 4,
    borderBottomWidth: 3,
  },
  commentAt: {
    color: '#666666',
    marginLeft: 15,
  },
});

export default CommunityBoardList;
