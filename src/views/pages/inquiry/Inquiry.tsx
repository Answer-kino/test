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
import {MarginTop} from '../../../assets/css/global/margin';
import {globalStyles} from '../../../assets/css/global/styleSheet';
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
    <View style={globalStyles.BodyWrap}>
      <TopNav navigation={navigation} title="문의하기" />
      <View style={globalStyles.MainWrap}>
        <View style={MarginTop('5%')} />
        <Text
          style={{
            color: '#444444',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          1:1문의하기
        </Text>

        <View style={MarginTop(15)} />
        <TextInput
          style={{
            color: '#474747',
            backgroundColor: 'white',
            height: '10%',
            lineHeight: 35,
            borderRadius: 10,
            paddingLeft: 15,
          }}
          placeholder="문의 제목"
          placeholderTextColor="#898989"
          maxLength={50}
          onChangeText={text => {
            setTitle(text);
          }}
        />

        <View style={MarginTop(15)} />
        <TextInput
          style={{
            color: '#474747',
            backgroundColor: 'white',
            height: '50%',
            lineHeight: 35,
            borderRadius: 10,
            paddingLeft: 15,
            textAlignVertical: 'top',
          }}
          placeholder="문의 내용"
          placeholderTextColor="#898989"
          multiline={true}
          maxLength={2048}
          onChangeText={text => {
            setContent(text);
          }}
        />

        <TouchableOpacity
          onPress={() => {
            writeInquiry();
          }}>
          <View
            style={{
              backgroundColor: '#6DADDB',
              width: '100%',
              borderRadius: 10,
              height: 51,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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

export default Inquiry;
