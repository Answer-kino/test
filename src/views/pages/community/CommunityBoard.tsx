import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from 'react-native';

import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';
import API_BBS_SERVICE from '../../../@api/bbs/bbs';
import Icon0 from '../../../assets/icon0.svg';
import Icon1 from '../../../assets/icon1.svg';
import Icon2 from '../../../assets/icon2.svg';
import Icon3 from '../../../assets/icon3.svg';
import Icon4 from '../../../assets/icon4.svg';
import Icon5 from '../../../assets/icon5.svg';
import Icon6 from '../../../assets/icon6.svg';
import {ICommentInfo, IDetailInfo} from '../../../@interface/community';
import API_HOME_SERVICE from '../../../@api/home/home';
import {randomNumber__1__6} from '../../../@utility/number';

const CommunityBoard = ({navigation, route}: any) => {
  const BBS_SERVICE = new API_BBS_SERVICE();
  const HOME_SERVICE = new API_HOME_SERVICE();

  const [boardIdx, setBoardIdx] = useState();
  const [loginId, setLoginId] = useState();
  const [detailInfo, setDetailInfo] = useState<IDetailInfo>();
  const [commentInfo, setCommentInfo] = useState<ICommentInfo[]>();
  const [registComment, setRegistComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const getMyInfo = async () => {
    try {
      const userInfo = await HOME_SERVICE.INFO();
      setLoginId(userInfo);
    } catch (error) {}
  };

  const myPageProfileMap = (num: any) => {
    switch (num) {
      case 1:
        return <Icon1 style={styles.useImg} />;
      case 2:
        return <Icon2 style={styles.useImg} />;
      case 3:
        return <Icon3 style={styles.useImg} />;
      case 4:
        return <Icon4 style={styles.useImg} />;
      case 5:
        return <Icon5 style={styles.useImg} />;
      case 6:
        return <Icon6 style={styles.useImg} />;
      default:
        return <Icon0 style={styles.useImg} />;
    }
  };

  const getCommunityBoardDetail = async () => {
    try {
      const detailInfo: any = await BBS_SERVICE.BBS_Community_Detail(boardIdx);

      setDetailInfo(detailInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const getComment = async () => {
    try {
      const commentInfo: any = await BBS_SERVICE.BBS_Comment(boardIdx);

      setCommentInfo(commentInfo);
      console.log(commentInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const registCommentAxios = async () => {
    try {
      const registCommentData = {
        boardIdx: boardIdx,
        comment: registComment,
      };

      await BBS_SERVICE.BBS_Regist_Comment(registCommentData);

      initBoardPage();
    } catch (error) {
      console.error(error);
    }
  };

  const enrollBtnHandler = () => {
    if (registComment !== '') {
      registCommentAxios();
      setRegistComment('');
      getCommunityBoardDetail();
    }
  };

  const initBoardPage = () => {
    if (boardIdx) {
      setIsLoading(true);
      getComment();
      getCommunityBoardDetail();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyInfo();
  }, []);
  useEffect(() => {
    setBoardIdx(route.params?.IDX_BOARD);
  }, [route.params]);

  useEffect(() => {
    initBoardPage();
  }, [boardIdx]);

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

  useEffect(() => {
    console.log(new Date());
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'position' : 'padding'}
      style={styles.container2}>
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
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.descriptionTitle}>{detailInfo?.Title}</Text>
            <Text style={styles.commentLength}>{detailInfo?.CommentCnt}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>{detailInfo?.Content}</Text>
          </View>
          <View style={styles.endLine}>
            {loginId === detailInfo?.userId ? (
              <TouchableOpacity
                style={styles.modifyButton}
                onPress={() => {
                  navigation.navigate('CommunityEdit', {
                    content: detailInfo?.Content,
                    title: detailInfo?.Title,
                    boardIdx: boardIdx,
                  });
                }}>
                <Text style={styles.modifyButtonText}>수정</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <Text style={styles.descriptionTitle}>댓글</Text>

          {commentInfo?.map((item, index) => {
            const comment = item.Comment;
            const temp = item.CreatedDay;
            // const imgNum = item.ProfileImg;
            const imgNum = randomNumber__1__6();

            const now = new Date();
            const CreateDay = temp.split('T')[0] + ' ';
            const diffHour = Number(
              (
                (now.getTime() - new Date(temp).getTime()) /
                1000 /
                60 /
                60
              ).toFixed(0)
            );
            const diff2Minute = (
              (now.getTime() - new Date(temp).getTime()) /
              1000 /
              60
            ).toFixed(0);

            // console.log(
            //   // (now.getTime() - CreateDay.getTime()) / 60 / 60 / 1000,
            //   now,
            //   CreateDay
            // );

            return (
              <View key={index} style={styles.commentContainer}>
                <View style={styles.commentFront}>
                  <View style={styles.profileImg}>
                    {myPageProfileMap(imgNum)}
                  </View>
                  <Text style={styles.comment}>{comment}</Text>
                </View>
                <Text style={styles.commentAt}>
                  {diffHour > 24
                    ? CreateDay
                    : diffHour < 1
                    ? diff2Minute + '분전'
                    : diffHour + '시간전'}
                </Text>
              </View>
            );
          })}

          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.registInput}
              value={registComment}
              onChangeText={text => {
                setRegistComment(text);
              }}
            />
            <TouchableOpacity
              style={styles.registButton}
              onPress={() => enrollBtnHandler()}>
              <Text style={styles.registButtonText}>등록</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 100, width: 360}}></View>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  scrollView: {
    height: Dimensions.get('window').height - 80,
  },
  container: {
    marginHorizontal: 30,
    marginTop: 15,
  },
  container2: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  content: {
    marginTop: 10,
    minHeight: 200,
  },
  commentContainer: {
    marginTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flex: 1,
  },
  descriptionTitle: {
    fontSize: 17,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
  },
  commentLength: {
    fontSize: 17,
    color: '#FF4C46',
    lineHeight: 35,
    letterSpacing: -0.05,
    marginLeft: 10,
  },
  comment: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.05,
    paddingRight: 10,
    color: 'black',
    marginLeft: '3%',
  },
  commentAt: {
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: -0.05,
    flex: 1.2,
    color: 'black',
  },
  commentFront: {
    flexDirection: 'row',
    flex: 4,
    alignItems: 'center',
  },
  modifyButton: {
    backgroundColor: '#6DADDB',
    width: 50,
    height: 27,
    borderRadius: 50,
    alignItems: 'center',
  },
  modifyButtonText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 22,
  },
  endLine: {
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    paddingBottom: 7,
  },
  profileImg: {
    backgroundColor: '#A7C1CF',
    width: 10,
    height: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  commentInputContainer: {
    marginTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  registButton: {
    backgroundColor: '#6DADDB',
    width: 47,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registButtonText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 32,
    flex: 1,
  },
  registInput: {
    backgroundColor: 'white',
    flex: 3,
    marginRight: 10,
    height: 42,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    color: 'black',
    borderColor: '#DEDEDE',
  },
  useImg: {
    height: 10,
    width: 10,
    marginLeft: '3%',
  },
});

export default CommunityBoard;
