import {useEffect, useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import API_Inquiry_Service from '../../../@api/inquiry/inquiry';
import {Font} from '../../../assets/css/global/newFont';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import InquiryEditStyles from '../../../assets/css/inquiry/inquiryEdit';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const InquiryEdit = ({navigation, route}: any) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const Inquiry_Service = new API_Inquiry_Service();

  const editInquiry = async () => {
    Alert.alert('정말로 수정하시겠습니까?', '문의 사항을 수정하시겠습니까?', [
      {
        text: '네',
        onPress: async () => {
          const Content = content;
          const Title = title;
          const IDX_ENQ = route.params?.IDX_ENQ;
          try {
            const result = await Inquiry_Service.MODIFY_INQUIRY({
              IDX_ENQ,
              Title,
              Content,
            });
            Alert.alert('수정되었습니다.');
            navigation.replace('InquiryList');
          } catch (error) {
            console.log(error);
          }
        },
      },
      {
        text: '아니오',
        //   onPress:
      },
    ]);
  };
  useEffect(() => {
    if (route.params.title) {
      setTitle(route.params.title);
    }
    if (route.params.content) {
      setContent(route.params.content);
    }
  }, [route.params]);
  return (
    <View>
      <TopNav navigation={navigation} title="문의하기" />
      <View style={InquiryEditStyles.Container}>
        <Text style={Font.InquiryTop}>1:1문의하기</Text>
        <TextInput
          value={title}
          style={InquiryEditStyles.TitleInput}
          placeholderTextColor="black"
          multiline={true}
          onChangeText={text => {
            setTitle(text);
          }}
        />
        <TextInput
          value={content}
          style={InquiryEditStyles.ContentInput}
          multiline={true}
          numberOfLines={17}
          placeholderTextColor="black"
          onChangeText={text => {
            setContent(text);
          }}
        />
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={InquiryEditStyles.ModifyBtn}
            onPress={() => {
              editInquiry();
            }}>
            <Text style={globalStyles.ButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default InquiryEdit;
