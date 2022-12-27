import {useEffect} from 'react';
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
import Questionlist from '../../../dummy/Questionlist';

const Question = ({navigation}: any) => {
  useEffect(() => {
    const backAction = () => {
      navigation.pop();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View>
      <TopNav navigation={navigation} title="자주묻는 질문" />
      {Questionlist.map((item, index): any => {
        const {title, content} = item;

        return (
          <View
            key={index}
            style={{display: 'flex', flexDirection: 'row', marginTop: '5%'}}>
            <Text style={styles.questionmark}>Q</Text>
            <Text style={styles.questiontitle}>{title}</Text>
            <TouchableOpacity style={{marginTop: '3%'}} onPress={() => {}}>
              <Image
                style={styles.dropdownimg}
                source={require('./../../../assets/dropdown.png')}></Image>
            </TouchableOpacity>
          </View>
        );
      })}
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
  dropdownimg: {},
});

export default Question;
