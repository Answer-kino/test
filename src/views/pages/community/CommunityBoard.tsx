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
  TouchableOpacityBase,
  Alert,
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
import {globalStyles} from '../../../assets/css/global/styleSheet';
import CommunityStyles from '../../../assets/css/community/community';
import {Font} from '../../../assets/css/global/newFont';
import Dividers from '../../../components/divider/Dividers';
import {modalStyles} from '../../../assets/css/modal/modal';
import {MarginTop} from '../../../assets/css/global/margin';

const CommunityBoard = ({navigation, route}: any) => {
  const BBS_SERVICE = new API_BBS_SERVICE();
  const HOME_SERVICE = new API_HOME_SERVICE();
  const [modalVisible, setModalVisible] = useState(false);
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
      // 이미지 number 랜덤으로 하는 부분
      for (let i = 0; i < commentInfo.length; i++) {
        commentInfo[i]['imgNumber'] = randomNumber__1__6();
        console.log('abc', commentInfo[i]);
      }
      setCommentInfo(commentInfo);
      console.log('abcd', commentInfo.length);
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
      style={{flex: 1}}>
      <Modal transparent={true} visible={isLoading}>
        <ActivityIndicator
          size={'large'}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={modalStyles.ModalWrap}>
          <View style={CommunityStyles.CommunityModalContainer}>
            {/* 사용자신고 */}
            <View style={CommunityStyles.ModalBody1}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={Font.CommunityDetailModalText}>사용자 신고</Text>
              </TouchableOpacity>
            </View>
            {/* 사용자 차단 */}
            <View>
              <TouchableOpacity
                style={CommunityStyles.ModalBody2}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={Font.CommunityDetailModalText}>사용자 차단</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* 취소 */}
          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              alignItems: 'center',
              borderRadius: 10,
              height: 63,
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={Font.CommunityDetailModalCancelText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TopNav navigation={navigation} title="커뮤니티" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={globalStyles.ScrollView}>
        <View style={CommunityStyles.Container}>
          <View style={CommunityStyles.CarnumberContainer}>
            <View style={CommunityStyles.TopImgContainer}>
              <View style={CommunityStyles.ProfileImg}>
                {myPageProfileMap(randomNumber__1__6())}
              </View>
              <Text style={Font.CommunityDetailCarnumber}>
                {detailInfo?.userId}
              </Text>
            </View>
            <View>
              <Text
                style={{color: 'black'}}
                onPress={() => {
                  setModalVisible(true);
                }}>
                • • •
              </Text>
            </View>
          </View>
          <View style={CommunityStyles.TitleContainer}>
            <Text style={Font.CommunityDetailTitle}>{detailInfo?.Title}</Text>
            <Text style={Font.CommunityDetailCommentCnt}>
              {detailInfo?.CommentCnt}
            </Text>
          </View>
          <View style={CommunityStyles.Content}>
            <Text style={Font.CommunityDetailContent}>
              {detailInfo?.Content}
            </Text>
          </View>

          <View>
            {loginId === detailInfo?.userId ? (
              <TouchableOpacity
                style={CommunityStyles.ModifyButton}
                onPress={() => {
                  navigation.navigate('CommunityEdit', {
                    content: detailInfo?.Content,
                    title: detailInfo?.Title,
                    boardIdx: boardIdx,
                  });
                }}>
                <Text style={Font.CommunityModifyBtn}>수정</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <Dividers marginTop="10"></Dividers>
        <View style={CommunityStyles.Container}>
          <Text style={Font.CommunityMiddleComment}>댓글</Text>
        </View>
        {commentInfo?.map((item, index) => {
          const comment = item.Comment;
          const temp = item.CreatedDay;
          // const imgNum = item.ProfileImg;
          const imgNum = item.imgNumber;

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
          const diff2Minute = Number(
            ((now.getTime() - new Date(temp).getTime()) / 1000 / 60).toFixed(0)
          );
          console.log(diff2Minute === 0);

          // console.log(
          //   // (now.getTime() - CreateDay.getTime()) / 60 / 60 / 1000,
          //   now,
          //   CreateDay
          // );

          return (
            <View>
              <View style={CommunityStyles.Container}>
                <View key={index} style={CommunityStyles.CommentContainer}>
                  <View style={CommunityStyles.CommentFront}>
                    <View style={CommunityStyles.ProfileImg}>
                      {myPageProfileMap(imgNum)}
                    </View>
                    <Text style={Font.CommunityDetailCarnumber}>
                      {detailInfo?.userId}
                    </Text>
                  </View>
                  <Text style={Font.CommunityCommentTime}>
                    {/* {diffHour > 24
                      ? CreateDay
                      : diffHour < 1
                      ? diff2Minute + '분전'
                      : diff2Minute === 0
                      ? '방금전'
                      : diffHour + '시간전'} */}
                    {diffHour > 24
                      ? CreateDay
                      : diffHour > 0
                      ? diffHour + '시간전'
                      : diffHour < 1 && diff2Minute > 0
                      ? diff2Minute + '분전'
                      : '방금전'}
                  </Text>
                </View>
                <View>
                  <Text style={Font.CommunityComment}>{comment}</Text>
                </View>
              </View>
              <Dividers></Dividers>
            </View>
          );
        })}
        <View style={CommunityStyles.Container}>
          <View style={CommunityStyles.CommentInputContainer}>
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
              <Text style={Font.CommunityCommentRegisterBtn}>등록</Text>
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
