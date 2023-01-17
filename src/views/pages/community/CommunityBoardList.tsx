import {useIsFocused} from '@react-navigation/native';
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

import API_BBS_SERVICE from '../../../@api/bbs/bbs';

import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const CommunityBoardList = ({navigation, route}: any) => {
  const BBS_SERVICE = new API_BBS_SERVICE();
  const [communityInfo, setCommunityInfo] = useState([]);
  const [scrollInfo, setScrollInfo] = useState([]);
  const [infoCnt, setInfoCnt] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false);
  const getCommunity = async () => {
    try {
      const obj: any = {
        category: 'BBS_BC_100003',
        limit: 10,
        offset: 0,
      };

      const result: any = await BBS_SERVICE.BBS_Community_LIst(obj);

      setCommunityInfo(result);
      setTotalCnt(result.totalCnt.TotalCnt);
    } catch (error) {
      console.error('getNotice :', error);
    }
  };
  const ScrollGetData = async () => {
    if (totalCnt > infoCnt) {
      try {
        setLoading(true);
        const obj: any = {
          category: 'BBS_BC_100003',
          limit: 10,
          offset: 0 + infoCnt,
        };
        const result: any = await BBS_SERVICE.BBS_Category_Notice(obj);
        let copy: any = [...scrollInfo, ...result];
        setScrollInfo(copy);

        setLoading(false);
        setInfoCnt(infoCnt + 10);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onEndReached = () => {
    if (!isLoading) {
      ScrollGetData();
    }
  };
  const renderItem = ({item}: any) => {
    const temp = item.CreatedDay;
    const CreateDay =
      temp.split('T')[0] + ' ' + temp.split('T')[1].split('.')[0];

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.push('CommunityBoard', {
            IDX_BOARD: item.IDX_BOARD,
          });
        }}
        style={styles.documentMenu}>
        <View style={styles.titleContainer}>
          <Text style={styles.descriptionTitle}>{item.Title}</Text>
          <Text style={styles.comment}>{item.CommentCnt}</Text>
        </View>
        <Text style={styles.commentAt}>{CreateDay}</Text>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    getCommunity();
  }, [isFocused]);
  useEffect(() => {
    ScrollGetData();
  }, [totalCnt]);

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
    <View style={{flex: 1}}>
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

      <View style={styles.container}>
        <Text style={styles.descriptionTitle}>자유게시판</Text>
        <View>
          <FlatList
            renderItem={renderItem}
            data={scrollInfo}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.4}
            // ListFooterComponent={loading && <ActivityIndicator />}
          />
        </View>
        <View style={{marginTop: -270}}></View>
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 15,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  documentMenu: {
    marginTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
    flexGrow: 1,
  },
  descriptionTitle: {
    fontSize: 17,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
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
  },
});

export default CommunityBoardList;
