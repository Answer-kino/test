import {useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const Question = ({navigation}: any) => {
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

  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  return (
    <View>
      <TopNav navigation={navigation} title="자주묻는 질문" />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <View>
          <View>
            <TouchableOpacity
              style={{marginTop: '3%'}}
              onPress={() => {
                setDropdown1(!dropdown1);
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '5%',
                }}>
                <Text style={styles.questionmark}>Q</Text>
                <Text style={styles.questiontitle}>
                  자동 실행 설정 방법이 궁금합니다.
                </Text>

                <Image
                  style={styles.dropdownimg}
                  source={require('./../../../assets/dropdown.png')}></Image>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            {dropdown1 === true ? (
              <Text style={styles.contenttext}>
                자동실행설정방법이 궁금합니다1. 자동실행설정방법이 궁금합니다1.
                자동실행설정방법이 궁금합니다1. 자동실행설정방법이 궁금합니다1.
                자동실행설정방법이 궁금합니다1. 자동실행설정방법이 궁금합니다1.
                자동실행설정방법이 궁금합니다1. 자동실행설정방법이 궁금합니다1.
                자동실행설정방법이 궁금합니다1. 자동실행설정방법이 궁금합니다1.
                자동실행설정방법이 궁금합니다1. 자동실행설정방법이 궁금합니다1.
                자동실행설정방법이 궁금합니다1. 자동실행설정방법이 궁금합니다1.
              </Text>
            ) : null}
          </View>
        </View>
        <View>
          <View>
            <TouchableOpacity
              style={{marginTop: '3%'}}
              onPress={() => {
                setDropdown2(!dropdown2);
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '5%',
                }}>
                <Text style={styles.questionmark}>Q</Text>
                <Text style={styles.questiontitle}>
                  자동 실행 설정 방법이 궁금합니다2.
                </Text>

                <Image
                  style={styles.dropdownimg}
                  source={require('./../../../assets/dropdown.png')}></Image>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            {dropdown2 === true ? (
              <Text style={styles.contenttext}>
                자동실행설정방법이 궁금합니다2.
              </Text>
            ) : null}
          </View>
        </View>
      </View>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  questiontitle: {
    color: 'black',
    marginLeft: '3%',
    fontStyle: 'normal',
    fontSize: 16,
    fontWeight: '500',
    marginTop: '1%',
    width: '72%',
  },
  questionmark: {
    color: '#2262AD',
    marginLeft: '7%',
    fontFamily: 'Noto Sans',
    fontWeight: '700',
    fontSize: 18,
  },
  dropdownimg: {marginTop: '3%'},
  contenttext: {
    fontFamily: 'Noto Sans',
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    marginLeft: '10%',
    backgroundColor: '#E9E9E9',
    width: '80%',
    height: 'auto',
    flexShrink: 1,
    padding: 10,
    marginTop: 10,
  },
});

export default Question;
