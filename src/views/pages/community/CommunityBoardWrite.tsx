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
import CommunityWriteStyles from '../../../assets/css/community/communityWrite';
import {MarginTop} from '../../../assets/css/global/margin';
import {Font} from '../../../assets/css/global/newFont';
import {globalStyles} from '../../../assets/css/global/styleSheet';
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
      style={globalStyles.ScrollView}>
      <View>
        <TopNav navigation={navigation} title="커뮤니티" />
        <View style={CommunityWriteStyles.Container}>
          <Text style={Font.CommunityWriteTopTitle}>글쓰기</Text>
          <TextInput
            placeholder="제목"
            style={CommunityWriteStyles.TitleInput}
            placeholderTextColor="black"
            onChangeText={text => {
              setTitle(text);
            }}
          />
          <TextInput
            placeholder="내용"
            style={CommunityWriteStyles.ContentInput}
            multiline={true}
            numberOfLines={17}
            placeholderTextColor="black"
            onChangeText={text => {
              setContent(text);
            }}
          />
          <View style={MarginTop(10)}>
            <TouchableOpacity
              style={CommunityWriteStyles.WriteButton}
              onPress={() => {
                {
                  title !== '' && content !== ''
                    ? WriteBoard()
                    : Alert.alert('제목과 내용을 입력해주세요.');
                }
              }}>
              <Text style={Font.CommunityWriteBtn}>글쓰기</Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomNav navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default CommunityBoardWrite;
