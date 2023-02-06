import {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import API_BBS_SERVICE from '../../../@api/bbs/bbs';
import CommunityEditStyles from '../../../assets/css/community/communityEdit';
import {Font} from '../../../assets/css/global/newFont';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const CommunityEdit = ({navigation, route}: any) => {
  const BBS_SERVICE = new API_BBS_SERVICE();
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  useEffect(() => {
    console.log(route.params);
  }, [route]);
  const modifyBoard = async () => {
    Alert.alert('정말로 수정하시겠습니까?', '게시글을 수정하시겠습니까?', [
      {
        text: '예',
        onPress: async () => {
          const boardIdx = route.params.boardIdx;
          try {
            const result = await BBS_SERVICE.BBS_Board_Modify({
              newTitle,
              newContent,
              boardIdx,
            });
            Alert.alert('수정되었습니다.');
            navigation.replace('CommunityBoardList');
            console.log('수정', result);
          } catch (error) {
            console.log(error);
          }
        },
      },
      {
        text: '아니오',
      },
    ]);
  };
  useEffect(() => {
    console.log('IDX', route.params.boardIdx);
  }, []);

  useEffect(() => {
    if (route.params.title) {
      setNewTitle(route.params.title);
    }
    if (route.params.content) {
      setNewContent(route.params.content);
    }
  }, [route.params]);
  return (
    <View>
      <TopNav navigation={navigation} title="게시글 수정" />
      <View style={CommunityEditStyles.Container}>
        <Text style={Font.CommunityWriteTopTitle}>게시글 수정</Text>
        <TextInput
          value={newTitle}
          style={CommunityEditStyles.TitleInput}
          placeholderTextColor="black"
          multiline={true}
          onChangeText={text => {
            setNewTitle(text);
          }}
        />
        <TextInput
          value={newContent}
          style={CommunityEditStyles.ContentInput}
          multiline={true}
          numberOfLines={17}
          placeholderTextColor="black"
          onChangeText={text => {
            setNewContent(text);
          }}
        />
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={CommunityEditStyles.ModifyBtn}
            onPress={() => {
              {
                newTitle !== '' || newContent !== ''
                  ? modifyBoard()
                  : Alert.alert('제목과 내용을 확인해주세요.');
              }
            }}>
            <Text style={Font.CommunityWriteBtn}>수정</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  modifyButtonText: {
    fontSize: 17,
    color: 'white',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default CommunityEdit;
