import AsyncStorage from '@react-native-async-storage/async-storage';
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
import API_Inquiry_Service from '../../../@api/inquiry/inquiry';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const InquiryEdit = ({navigation, route}: any) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const Inquiry_Service = new API_Inquiry_Service();
  const editInquiry = async () => {
    const Content = content;
    const Title = title;
    const IDX_ENQ = route.params.IDX_ENQ;
    try {
      const result = await Inquiry_Service.MODIFY_INQUIRY({
        IDX_ENQ,
        Title,
        Content,
      });
      navigation.replace('InquiryList');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <TopNav navigation={navigation} title="문의하기" />
      <View style={styles.container}>
        <Text style={styles.descriptionTitle}>1:1문의하기</Text>
        <TextInput
          style={styles.titleInput}
          placeholderTextColor="black"
          multiline={true}
          onChangeText={text => {
            setTitle(text);
          }}
        />
        <TextInput
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
            style={styles.modifyBtn}
            onPress={() => {
              editInquiry();
            }}>
            <Text style={styles.modifyButtonText}>확인</Text>
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
    backgroundColor: '#6DADDB',
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

export default InquiryEdit;
