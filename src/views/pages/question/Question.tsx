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
import {Divider} from '@rneui/base';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import {questionStyles} from '../../../assets/css/question/question';
import Dividers from '../../../components/divider/Dividers';
import {Font} from '../../../assets/css/global/newFont';
import {MarginLeft} from '../../../assets/css/global/margin';

type dropDownType = {
  [key: number]: boolean;
};

const Question = ({navigation}: any) => {
  const [questionInfo, setQuestionInfo] = useState([]);
  const [dropDown, setDropDown] = useState<dropDownType>({});
  const [dropDown2, setDropDown2] = useState(false);
  const getQuestion = new API_Question();

  const dropDownHandler = (idx: any) => {
    if (dropDown[idx]) {
      setDropDown({[idx]: false});
    } else {
      setDropDown({[idx]: true});
    }
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
    <View style={globalStyles.BodyWrap}>
      <TopNav navigation={navigation} title="자주묻는 질문" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={globalStyles.ScrollViewBorder}>
        <View style={globalStyles.FlexColumn}>
          <View>
            {questionInfo.map((item: any, index: number) => {
              const title = item.Title;
              const content = item.Content;

              return (
                <>
                  <View
                    key={index}
                    // style={{paddingVertical: 10}}
                    // style={{paddingVertical: 10}}
                  >
                    <View style={globalStyles.MainWrap}>
                      <TouchableOpacity
                        onPress={() => {
                          dropDownHandler(index);
                        }}>
                        <View style={questionStyles.QuestionTitleWrap}>
                          <View style={questionStyles.QuestionTitleLeft}>
                            <Text style={Font.QuestionQmark}>Q</Text>
                            <View style={MarginLeft(10)}>
                              <Text style={Font.QuestionTitle}>{title}</Text>
                            </View>
                          </View>
                          <View style={questionStyles.QuestionTitleRight}>
                            {dropDown[index] ? (
                              <Image
                                source={require('./../../../assets/dropUp.png')}></Image>
                            ) : (
                              <Image
                                source={require('./../../../assets/dropdown.png')}></Image>
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* <Divider
                      width={1.5}
                      color={'#DBDBDB'}
                      style={{paddingVertical: 10}}
                    /> */}
                    <Dividers marginTop="20" marginBottom="20" />
                    <View style={questionStyles.ContentTextWrap}>
                      <View style={globalStyles.MainWrap}>
                        {dropDown[index] ? (
                          <Text style={Font.QuestionContent}>{content}</Text>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </View>
  );
};

export default Question;
