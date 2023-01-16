import {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import API_BBS_SERVICE from '../../../@api/bbs/bbs';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const CommunityEdit = ({navigation, route}: any) => {
  const BBS_SERVICE = new API_BBS_SERVICE();
  const [newTitle, setNewTitle] = useState(route.params.title);
  const [newContent, setNewContent] = useState(route.params.content);
  const modifyBoard = async () => {
    const boardIdx = route.params.boardIdx;
    try {
      const result = await BBS_SERVICE.BBS_Board_Modify({
        newTitle,
        newContent,
        boardIdx,
      });
      Alert.alert('수정되었습니다.');
      navigation.navigate('CommunityBoardList');
      console.log('수정', result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log('IDX', route.params.boardIdx);
  }, []);
  return (
    <View>
      <TopNav navigation={navigation} title="게시글 수정" />
      <View style={styles.container}>
        <Text style={styles.descriptionTitle}>게시글 수정</Text>
        <TextInput
          placeholder={route.params.title}
          style={styles.titleInput}
          placeholderTextColor="black"
          multiline={true}
          onChangeText={text => {
            setNewTitle(text);
            console.log('텍스트', text);
          }}
        />
        <TextInput
          placeholder={route.params.content}
          style={styles.contentInput}
          multiline={true}
          numberOfLines={17}
          placeholderTextColor="black"
          onChangeText={text => {
            setNewContent(text);
          }}
        />
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.modifyBtn}
            onPress={() => {
              {
                newTitle !== '' || newContent !== ''
                  ? modifyBoard()
                  : Alert.alert('제목과 내용을 확인해주세요.');
              }
            }}>
            <Text style={styles.modifyButtonText}>수정</Text>
          </TouchableOpacity>
        </View>
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
    minHeight: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: 'black',
  },
  contentInput: {
    marginTop: 10,
    paddingTop: 10,
    backgroundColor: 'white',
    flex: 1,
    minHeight: 200,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    color: 'black',
  },
  modifyBtn: {
    marginTop: 10,
    backgroundColor: 'black',
    height: 57,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  modifyButtonText: {
    fontSize: 17,
    color: 'white',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default CommunityEdit;
