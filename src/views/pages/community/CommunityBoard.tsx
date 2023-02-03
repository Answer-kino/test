import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
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
import API_BLOCK_SERVICE from '../../../@api/block/block';

const CommunityBoard = ({navigation, route}: any) => {
  const BBS_SERVICE = new API_BBS_SERVICE();
  const HOME_SERVICE = new API_HOME_SERVICE();
  const BLOCK_SERIVCE = new API_BLOCK_SERVICE();
  const [modalVisibleTop, setModalVisibleTop] = useState(false);
  const [modalVisibleBot, setModalVisibleBot] = useState(false);
  const [boardIdx, setBoardIdx] = useState();
  const [userIdx, setUserIdx] = useState({
    content: 0,
    comment: 0,
  });
  const [carNumberId, setCarNumberId] = useState('');
  const [targetType, setTargetType] = useState<number>();
  //댓글 Number넘겨주는 state 추후에 더 생각해볼것
  const [tempContentNum, setTempContentNum] = useState<string>();
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
        return <Icon1 style={CommunityStyles.UseImg} />;
      case 2:
        return <Icon2 style={CommunityStyles.UseImg} />;
      case 3:
        return <Icon3 style={CommunityStyles.UseImg} />;
      case 4:
        return <Icon4 style={CommunityStyles.UseImg} />;
      case 5:
        return <Icon5 style={CommunityStyles.UseImg} />;
      case 6:
        return <Icon6 style={CommunityStyles.UseImg} />;
      default:
        return <Icon0 style={CommunityStyles.UseImg} />;
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
      }
      setCommentInfo(commentInfo);
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
  //  게시글차단
  const blockBoardAxios = async () => {
    try {
      const result = await BLOCK_SERIVCE.Block_Board(boardIdx);
      console.log('게시글차단', result);
      navigation.replace('CommunityBoardList');
    } catch (error) {
      console.error(error);
    }
  };
  // 댓글차단
  const blockCommentAxios = async () => {
    const IDX_COMMENT = tempContentNum;
    try {
      console.log('tw', boardIdx);
      const result = await BLOCK_SERIVCE.Block_Comment(boardIdx, IDX_COMMENT);
      getComment();
      console.log('댓글', result);
    } catch (error) {
      console.error(error);
    }
  };
  //사용자신고
  const reportUserAxios = async (key: any) => {
    if (key === 'content') {
      const targetIdx = userIdx.content;
      const targetTypeIdx = boardIdx;
      try {
        const result = await BLOCK_SERIVCE.Report_User(
          targetIdx,
          targetType,
          targetTypeIdx
        );
        Alert.alert('신고되었습니다.');
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    } else if (key === 'comment') {
      const targetIdx = userIdx.comment;
      const targetTypeIdx = tempContentNum;
      try {
        // console.log('h2', targetIdx, targetType, targetTypeIdx);
        const result = await BLOCK_SERIVCE.Report_User(
          targetIdx,
          targetType,
          targetTypeIdx
        );
        Alert.alert('신고되었습니다.');
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert('잘못된 접근입니다.');
    }
  };
  //사용자 차단
  const blockUserAxios = async (key: any) => {
    if (key === 'content') {
      try {
        console.log('userIdx', userIdx);
        const result = await BLOCK_SERIVCE.Block_User(userIdx.content);
        console.log('차단err', result);
        navigation.replace('CommunityBoardList');
      } catch (error) {
        console.error(error);
      }
    } else if (key === 'comment') {
      try {
        console.log('userIdx', userIdx);
        const result = await BLOCK_SERIVCE.Block_User(userIdx.comment);
        console.log('차단err', result);
        navigation.replace('CommunityBoardList');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const BlockHandlerContent = (key: any) => {
    // error핸들링 필요
    if (key === 'ReportUser') {
      reportUserAxios('content');
      setModalVisibleTop(false);
    }
    if (key === 'BlockUser') {
      blockUserAxios('content');
      setModalVisibleTop(false);
    }
    if (key === 'BlockBoard') {
      blockBoardAxios();
      setModalVisibleTop(false);
    }
  };
  const BlockHandlerComment = (key: any) => {
    // error핸들링 필요
    if (key === 'ReportUser') {
      reportUserAxios('comment');
      setModalVisibleBot(false);
    }
    if (key === 'BlockUser') {
      blockUserAxios('comment');
      setModalVisibleBot(false);
    }
    if (key === 'BlockComment') {
      blockCommentAxios();
      setModalVisibleBot(false);
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
    // setUserIdx(route.params?.IDX_USER);
    setUserIdx(cur => ({...cur, content: route.params?.IDX_USER}));
    setCarNumberId(route.params?.carNumber);
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

      {/* Modal1 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleTop}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisibleTop(false);
        }}>
        <View style={modalStyles.ModalWrap}>
          <View style={CommunityStyles.CommunityModalContainer}>
            {/* 사용자신고 */}
            <View style={CommunityStyles.ModalBody1}>
              <TouchableOpacity
                onPress={() => {
                  BlockHandlerContent('ReportUser');
                }}>
                <Text style={Font.CommunityDetailModalText}>사용자 신고</Text>
              </TouchableOpacity>
            </View>
            {/* 사용자신고END */}
            {/* 사용자 차단 */}
            <View style={CommunityStyles.ModalBody1}>
              <TouchableOpacity
                onPress={() => {
                  BlockHandlerContent('BlockUser');
                }}>
                <Text style={Font.CommunityDetailModalText}>사용자 차단</Text>
              </TouchableOpacity>
            </View>
            {/* 게시글차단 */}
            <View>
              <TouchableOpacity
                style={CommunityStyles.ModalBody2}
                onPress={() => {
                  BlockHandlerContent('BlockBoard');
                }}>
                <Text style={Font.CommunityDetailModalText}>게시글 차단</Text>
              </TouchableOpacity>
            </View>
            {/* 게시글차단END */}
          </View>
          {/* 사용자차단END */}
          {/* 취소 */}
          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              alignItems: 'center',
              borderRadius: 10,
              height: 43,
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisibleTop(false);
              }}>
              <Text style={Font.CommunityDetailModalCancelText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modal1 End */}
      {/* Modal2 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleBot}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisibleBot(false);
        }}>
        <View style={modalStyles.ModalWrap}>
          <View style={CommunityStyles.CommunityModalContainer}>
            {/* 사용자신고 */}
            <View style={CommunityStyles.ModalBody1}>
              <TouchableOpacity
                onPress={() => {
                  BlockHandlerComment('ReportUser');
                }}>
                <Text style={Font.CommunityDetailModalText}>사용자 신고</Text>
              </TouchableOpacity>
            </View>
            {/* 사용자신고END */}
            {/* 사용자 차단 */}
            <View style={CommunityStyles.ModalBody1}>
              <TouchableOpacity
                onPress={() => {
                  BlockHandlerComment('BlockUser');
                }}>
                <Text style={Font.CommunityDetailModalText}>사용자 차단</Text>
              </TouchableOpacity>
            </View>
            {/* 댓글차단 */}
            <View>
              <TouchableOpacity
                style={CommunityStyles.ModalBody2}
                onPress={() => {
                  BlockHandlerComment('BlockComment');
                }}>
                <Text style={Font.CommunityDetailModalText}>댓글 차단</Text>
              </TouchableOpacity>
            </View>
            {/* 댓글차단END */}
          </View>
          {/* 사용자차단END */}
          {/* 취소 */}
          {/* Modal2End */}
          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              alignItems: 'center',
              borderRadius: 10,
              height: 43,
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisibleBot(false);
              }}>
              <Text style={Font.CommunityDetailModalCancelText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modal End */}
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
              {carNumberId === detailInfo?.userId ? null : (
                <Text
                  style={{color: 'black'}}
                  onPress={() => {
                    setModalVisibleTop(true);
                    setTargetType(1);
                  }}>
                  • • •
                </Text>
              )}
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
          const commentIdx = item.IDX_COMMENT;
          const IDX_USER = item.IDX_USER;
          // const imgNum = item.ProfileImg;
          const imgNum = item.imgNumber;
          const carNumber = item.CarNumber;
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
          return (
            <View key={index}>
              <View style={CommunityStyles.Container}>
                <View key={index} style={CommunityStyles.CommentContainer}>
                  <View style={CommunityStyles.CommentFront}>
                    <View style={CommunityStyles.ProfileImg}>
                      {myPageProfileMap(imgNum)}
                    </View>
                    <Text style={Font.CommunityDetailCarnumber}>
                      {carNumber}
                    </Text>
                  </View>
                  <Text style={Font.CommunityCommentTime}>
                    {diffHour > 24
                      ? CreateDay
                      : diffHour > 0
                      ? diffHour + '시간전'
                      : diffHour < 1 && diff2Minute > 0
                      ? diff2Minute + '분전'
                      : '방금전'}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={Font.CommunityComment}>{comment}</Text>
                  {carNumberId !== carNumber ? (
                    <Text
                      style={{color: 'black'}}
                      onPress={() => {
                        setModalVisibleBot(true);
                        setTempContentNum(commentIdx);
                        setUserIdx(cur => ({...cur, comment: IDX_USER}));
                        setTargetType(2);
                      }}>
                      • • •
                    </Text>
                  ) : null}
                </View>
              </View>
              <Dividers></Dividers>
            </View>
          );
        })}
        <View style={CommunityStyles.Container}>
          <View style={CommunityStyles.CommentInputContainer}>
            <TextInput
              style={CommunityStyles.RegistInput}
              value={registComment}
              onChangeText={text => {
                setRegistComment(text);
              }}
            />
            <TouchableOpacity
              style={CommunityStyles.RegistButton}
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

export default CommunityBoard;
