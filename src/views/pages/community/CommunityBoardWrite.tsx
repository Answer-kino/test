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
  Alert,
} from 'react-native';
import API_BBS_SERVICE from '../../../@api/bbs/bbs';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const CommunityBoardWrite = ({navigation}: any) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const BBS_SERVICE = new API_BBS_SERVICE();
  const WriteBoard = async () => {
    const data = {
      title: title,
      content: content,
      category: 'BBS_BC_100003',
    };

    try {
      const result = BBS_SERVICE.BBS_Board_Regist(data);
      console.log(result);
      setTimeout(() => {
        navigation.replace('CommunityBoardList');
      }, 200);
    } catch (error) {
      console.log(error);
    }
  };

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
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <View>
        <TopNav navigation={navigation} title="커뮤니티" />
        <View style={styles.container}>
          <Text style={styles.descriptionTitle}>글쓰기</Text>
          <TextInput
            placeholder="제목"
            style={styles.titleInput}
            placeholderTextColor="black"
            onChangeText={text => {
              setTitle(text);
            }}
          />
          <TextInput
            placeholder="내용"
            style={styles.contentInput}
            multiline={true}
            numberOfLines={17}
            placeholderTextColor="black"
            onChangeText={text => {
              setContent(text);
            }}
          />
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.writeButton}
              onPress={() => {
                {
                  title !== '' && content !== ''
                    ? WriteBoard()
                    : Alert.alert('제목과 내용을 입력해주세요.');
                }
              }}>
              <Text style={styles.writeButtonText}>글쓰기</Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomNav navigation={navigation} />
      </View>
    </ScrollView>
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
  descriptionTitle: {
    fontSize: 17,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
  },
  titleInput: {
    marginTop: 10,
    backgroundColor: 'white',
    flex: 1,
    height: 54,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: 'black',
  },
  contentInput: {
    marginTop: 10,
    paddingTop: 10,
    backgroundColor: 'white',
    flex: 1,
    minHeight: 54,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    color: 'black',
  },
  writeButton: {
    marginTop: 10,
    backgroundColor: 'black',
    height: 51,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  writeButtonText: {
    fontSize: 16,
    color: 'white',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: '500',
  },
  container2: {
    flex: 1,
  },
});

export default CommunityBoardWrite;
