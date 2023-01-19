import {useEffect, useState} from 'react';
import {
  BackHandler,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableOpacityComponent,
  Alert,
} from 'react-native';
import API_Inquiry_Service from '../../../@api/inquiry/inquiry';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const Inquiry = ({navigation}: any) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const API_Inquiry = new API_Inquiry_Service();

  const writeInquiry = async () => {
    if (title !== '' && content !== '') {
      try {
        const result = await API_Inquiry.POST_INQUIRY({title, content});
        navigation.replace('InquiryList');
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('문의 제목, 문의 내용을 확인해주세요.');
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
    <View style={styles.full}>
      <TopNav navigation={navigation} title="문의하기" />
      <Text style={styles.topTitle}>1:1문의하기</Text>
      <View style={{alignItems: 'center'}}>
        <TextInput
          style={styles.text1}
          placeholder="문의 제목"
          placeholderTextColor="#898989"
          multiline={true}
          onChangeText={text => {
            setTitle(text);
          }}></TextInput>
        <TextInput
          style={styles.text2}
          placeholder="문의 내용"
          placeholderTextColor="#898989"
          multiline={true}
          onChangeText={text => {
            setContent(text);
          }}></TextInput>

        <TouchableOpacity
          style={{width: '80%'}}
          onPress={() => {
            writeInquiry();
          }}>
          <View style={styles.button}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontWeight: '500',
                fontFamily: 'Noto Sans',
              }}>
              확인
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <BottomNav navigation={navigation} />
    </View>
  );
};
const styles = StyleSheet.create({
  full: {
    backgroundColor: '#F2F6F8',
    height: '100%',
  },
  topTitle: {
    marginLeft: '11%',
    marginTop: 20,
    fontWeight: '700',
    fontSize: 18,
  },
  text1: {
    color: 'black',

    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    paddingLeft: 10,
    textAlignVertical: 'top',
  },
  text2: {
    color: 'black',

    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    paddingLeft: 10,
    height: '40%',
    textAlignVertical: 'top',
  },
  button: {
    color: 'white',
    backgroundColor: '#6DADDB',
    width: '100%',
    borderRadius: 10,
    height: 60,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntext: {
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    fontSize: 17,
  },
});
export default Inquiry;
