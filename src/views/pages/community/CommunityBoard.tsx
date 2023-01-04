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
  TextInput,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';
import API_BBS_SERVICE from '../../../@api/bbs/bbs';

const CommunityBoard = ({navigation, route}: any) => {
  const boardIdx = route.params.boardIdx;
  const BBS_SERVICE = new API_BBS_SERVICE();
  const [detailInfo, setDetailInfo] = useState<Array<any>>();
  const [commentInfo, setCommentInfo] = useState([]);
  const [registComment, setRegistComment] = useState('');
  const getCommunityBoardDetail = async () => {
    try {
      const result: any = await BBS_SERVICE.BBS_Community_Detail(boardIdx);
      console.log('tw123', result);
      setDetailInfo(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getComment = async () => {
    try {
      const result: any = await BBS_SERVICE.BBS_Comment(boardIdx);
      console.log('tw123', result);
      setCommentInfo(result);
    } catch (error) {
      console.log(error);
    }
  };

  const registCommentAxios = async () => {
    const data = {
      boardIdx: boardIdx,
      comment: registComment,
    };
    // console.log(data);
    try {
      const result: any = await BBS_SERVICE.BBS_Regist_Comment(data);
      console.log('tw123', result);
      getComment();
    } catch (error) {
      console.log(error);
    }
  };

  const enrollBtnHandler = () => {
    if (registComment !== '') {
      registCommentAxios();
      setRegistComment('');
    }
  };
  useEffect(() => {
    getCommunityBoardDetail();
    getComment();
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'position' : 'padding'}
      style={styles.container2}>
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
            <TouchableOpacity style={styles.modifyButton}>
              <Text style={styles.modifyButtonText}>수정</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.descriptionTitle}>댓글</Text>

          {commentInfo?.map(item => {
            const comment = item.Comment;
            const temp = item.CreatedDay;
            const CreateDay =
              // temp.split('T')[0] + ' ' + temp.split('T')[1].split('.')[0];
              temp.split('T')[0];
            return (
              <View style={styles.commentContainer}>
                <View style={styles.commentFront}>
                  <View style={styles.profileImg}>
                    <Image source={require('../../../assets/comment3.png')} />
                  </View>
                  <Text style={styles.comment}>{comment}</Text>
                </View>
                <Text style={styles.commentAt}>{CreateDay}</Text>
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
    width: 24,
    height: 24,
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
});

export default CommunityBoard;
