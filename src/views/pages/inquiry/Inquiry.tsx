import {useEffect} from 'react';
import {
  BackHandler,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import BottomNav from '../../../components/bottomNav/BottomNav';

import TopNav from '../../../components/topNav/TopNav';

const Inquiry = ({navigation}: any) => {
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
      <View>
        <TextInput
          style={styles.text1}
          placeholder="받을 이메일"
          placeholderTextColor="#898989"></TextInput>
        <TextInput
          style={styles.text1}
          placeholder="문의 제목"
          placeholderTextColor="#898989"></TextInput>
        <TextInput
          style={styles.text2}
          placeholder="문의 내용"
          placeholderTextColor="#898989"></TextInput>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            navigation.push('Home');
          }}>
          <View style={styles.button}>
            <Text style={{}}>확인</Text>
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
  text1: {
    color: 'black',
    marginLeft: '7%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    paddingLeft: 10,
  },
  text2: {
    color: 'black',
    marginLeft: '7%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    paddingLeft: 10,
    height: '40%',
  },
  button: {
    color: 'white',
    backgroundColor: '#6DADDB',
    width: '80%',
    borderRadius: 10,
    height: 60,
    marginTop: 20,
    marginLeft: '7%',
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
