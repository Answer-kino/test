import React, {useEffect} from 'react';
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

const CommunityBoard = ({navigation}) => {
  useEffect(() => {
    const backAction = () => {
      navigation.pop();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container2}>
      <TopNav navigation={navigation} title="커뮤니티" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.descriptionTitle}>K5 vs K7</Text>
            <Text style={styles.commentLength}>3</Text>
          </View>
          <View style={styles.content}>
            <Text>
              요즘 차를 사려고 계속 알아보고 있습니다. K5 또는 K7를 사고 싶은데
              어떤게 좋은지 고민중입니다. 예산은 3500입니다.
            </Text>
          </View>
          <View style={styles.endLine}>
            <TouchableOpacity style={styles.modifyButton}>
              <Text style={styles.modifyButtonText}>수정</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.descriptionTitle}>댓글</Text>
          <View style={styles.commentContainer}>
            <View style={styles.commentFront}>
              <View style={styles.profileImg}>
                <Image source={require('../../../assets/comment1.png')} />
              </View>
              <Text style={styles.comment}>K5가 더 좋을것 같습니다</Text>
            </View>
            <Text style={styles.commentAt}>3시간 전</Text>
          </View>
          <View style={styles.commentContainer}>
            <View style={styles.commentFront}>
              <View style={styles.profileImg}>
                <Image source={require('../../../assets/comment2.png')} />
              </View>
              <Text style={styles.comment}>
                K5도 좋지만 K7가 더 좋을것 같네요
              </Text>
            </View>
            <Text style={styles.commentAt}>2022/11/24</Text>
          </View>
          <View style={styles.commentContainer}>
            <View style={styles.commentFront}>
              <View style={styles.profileImg}>
                <Image source={require('../../../assets/comment3.png')} />
              </View>
              <Text style={styles.comment}>
                K5가 곧 풀체인지 되서 K5로 강력 추천!!!
              </Text>
            </View>
            <Text style={styles.commentAt}>2022/11/13</Text>
          </View>
          <View style={styles.commentInputContainer}>
            <TextInput style={styles.registInput} />
            <TouchableOpacity style={styles.registButton}>
              <Text style={styles.registButtonText}>등록</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </KeyboardAvoidingView>
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
  },
  commentAt: {
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: -0.05,
    flex: 1.2,
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
    lineHeight: 22,
  },
  registInput: {
    backgroundColor: 'white',
    flex: 3,
    marginRight: 10,
    height: 42,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#DEDEDE',
  },
});

export default CommunityBoard;
