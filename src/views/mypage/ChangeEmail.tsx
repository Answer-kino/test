import {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import API_Mypage from '../../@api/mypage/Mypage';
import TopNav from '../../components/topNav/TopNav';
import {regExp__email} from '../../@utility/reg';
import {changeStyles} from '../../assets/css/mypage/change';
import {globalStyles} from '../../assets/css/global/styleSheet';
import {MarginTop} from '../../assets/css/global/margin';
import {Font} from '../../assets/css/global/newFont';

const ChangeEmail = ({navigation, route}: any) => {
  const [newEmail, setNewEmail] = useState<string>('');
  const Mypage = new API_Mypage();
  const changeEmail = async () => {
    if (!regExp__email.test(newEmail)) {
      Alert.alert('올바른 이메일이 아닙니다.');
    } else {
      if (newEmail !== '') {
        const email = newEmail;
        try {
          const result = Mypage.changeEmail(email);
          navigation.replace('Mypage');
        } catch (error) {
          console.log(error);
        }
      } else {
        alert('이메일을 확인해주세요.');
      }
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
      <TopNav navigation={navigation} title="이메일 변경" />
      <View style={globalStyles.MainWrap}>
        <View style={MarginTop('5%')} />
        <TextInput
          style={changeStyles.TextInput}
          editable={false}
          value={route.params.email}
        />
        <View style={MarginTop(15)} />
        <TextInput
          style={changeStyles.TextInput}
          placeholder="새 이메일"
          placeholderTextColor="#898989"
          onChangeText={text => {
            setNewEmail(text);
          }}
        />
        <TouchableOpacity
          style={changeStyles.SubmitBtnWrap}
          onPress={changeEmail}>
          <Text style={Font.ChangePwdCheckBtn}>수정 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangeEmail;
