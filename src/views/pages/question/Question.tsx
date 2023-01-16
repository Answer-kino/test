import {useEffect, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';
import API_Question from '../../../@api/question/question';

type dropDownType = {
  [key: number]: boolean;
};

const Question = ({navigation}: any) => {
  const [questionInfo, setQuestionInfo] = useState([]);
  const [dropDown, setDropDown] = useState<dropDownType>({});
  const [dropDown2, setDropDown2] = useState(false);
  const getQuestion = new API_Question();

  const dropDownHandler = (idx: any, bool: boolean) => {
    setDropDown({[idx]: bool});
  };

  const getQuestionInfo = async () => {
    try {
      const result = await getQuestion.QuestionInfo();
      console.log('QuestionawefawefF', result);
      setQuestionInfo(result.faqList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestionInfo();
  }, []);

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
    <View>
      <TopNav navigation={navigation} title="자주묻는 질문" />
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          <View>
            <View>
              {questionInfo.map((item: any, index: number) => {
                const title = item.Title;
                const content = item.Content;

                return (
                  <View key={index}>
                    <View>
                      <TouchableOpacity
                        style={{marginTop: '3%'}}
                        onPress={() => {
                          dropDownHandler(index, !dropDown2);
                          setDropDown2(!dropDown2);
                          console.log(dropDown);
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: '5%',
                          }}>
                          <Text style={styles.questionmark}>Q</Text>
                          <Text style={styles.questiontitle}>{title}</Text>

                          <Image
                            style={styles.dropdownimg}
                            source={require('./../../../assets/dropdown.png')}></Image>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View>
                      {dropDown[index] ? (
                        <Text style={styles.contenttext}>{content}</Text>
                      ) : null}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <View style={{marginTop: 110}}></View>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 80,
  },
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
