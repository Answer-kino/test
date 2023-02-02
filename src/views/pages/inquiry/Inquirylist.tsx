import {useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import API_Inquiry_Service from '../../../@api/inquiry/inquiry';
import {Font} from '../../../assets/css/global/newFont';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import {InquiryListStyles} from '../../../assets/css/inquiry/inquiryList';
import BottomNav from '../../../components/bottomNav/BottomNav';
import Dividers from '../../../components/divider/Dividers';
import TopNav from '../../../components/topNav/TopNav';

type dropDownType = {
  [key: number]: boolean;
};

const InquiryList = ({navigation}: any) => {
  const [dropDown, setDropDown] = useState<dropDownType>({});
  const [inquiryListInfo, setInquiryListInfo] = useState([]);
  const Inquiry_SerVice = new API_Inquiry_Service();

  const dropDownHandler = (idx: number) => {
    // setDropDown()
    if (dropDown[idx]) {
      setDropDown({[idx]: false});
    } else {
      setDropDown({[idx]: true});
    }
  };

  const getInquiryList = async () => {
    try {
      const result = await Inquiry_SerVice.GET_INQUIRY();
      setInquiryListInfo(result);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteInquiryList = (number: number) => async () => {
    Alert.alert('정말로 삭제하시겠습니까?', '문의 사항을 삭제하시겠습니까?', [
      {
        text: '네',
        onPress: async () => {
          try {
            const result = await Inquiry_SerVice.DELETE_INQUIRY(number);
            console.log(result);
            getInquiryList();
          } catch (error) {
            console.log(error);
          }
        },
      },
      {
        text: '아니요',
      },
    ]);
  };

  useEffect(() => {
    getInquiryList();
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
      <TopNav navigation={navigation} title="문의 목록" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={globalStyles.ScrollViewBorder}>
        <View style={globalStyles.FlexColumn}>
          <View>
            {inquiryListInfo.map((item: any, index: number) => {
              const title = item.Title;
              const content = item.Content;

              const answer = item.AdminAnswer;
              const number = item.IDX_ENQ;
              return (
                <>
                  <View key={index} style={{paddingVertical: 10}}>
                    <View style={globalStyles.MainWrap}>
                      <TouchableOpacity
                        onPress={() => {
                          dropDownHandler(index);
                        }}>
                        <View style={InquiryListStyles.InquiryTitleWrap}>
                          <View style={InquiryListStyles.InquiryTitleLeft}>
                            <Text style={Font.InquiryListMark}>Q</Text>
                            <Text style={Font.InquiryListTitle}>{title}</Text>
                          </View>
                          <View style={InquiryListStyles.InquiryTitleRight}>
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

                    {/* Content Section Start */}
                    <View>
                      <View style={InquiryListStyles.ContentWrap}>
                        {dropDown[index] ? (
                          <View>
                            <View style={InquiryListStyles.ContentTextWrap}>
                              <Text style={Font.InquiryListContent}>
                                {content}
                              </Text>
                            </View>
                            {/* Centent Section End */}
                            {/* Answer Section Start */}
                            <View>
                              <View>
                                <View style={InquiryListStyles.AnswerWrap}>
                                  <View style={InquiryListStyles.AnswerTop}>
                                    <Text style={Font.InquiryListMark}>A</Text>
                                    <Text style={Font.InquiryListTitle}>
                                      답변
                                    </Text>
                                  </View>
                                  {answer ? (
                                    <View
                                      style={InquiryListStyles.ContentTextWrap}>
                                      <Text style={Font.InquiryListContent}>
                                        {answer}
                                      </Text>
                                    </View>
                                  ) : (
                                    <View
                                      style={InquiryListStyles.ContentTextWrap}>
                                      <View>
                                        <Text style={Font.InquiryListContent}>
                                          확인중입니다.
                                        </Text>
                                      </View>
                                      <View style={InquiryListStyles.BtnWrap}>
                                        <TouchableOpacity
                                          onPress={() => {
                                            navigation.navigate('InquiryEdit', {
                                              IDX_ENQ: number,
                                              title: title,
                                              content: content,
                                            });
                                          }}>
                                          <View
                                            style={InquiryListStyles.ModifyBtn}>
                                            <Text style={Font.InquiryListBtn}>
                                              수정
                                            </Text>
                                          </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                          onPress={deleteInquiryList(number)}>
                                          <View
                                            style={InquiryListStyles.DeleteBtn}>
                                            <Text style={Font.InquiryListBtn}>
                                              삭제
                                            </Text>
                                          </View>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  )}
                                </View>
                              </View>
                            </View>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                  {/* <Divider
                    style={{marginVertical: '3%'}}
                    color="#DBDBDB"
                    width={1}></Divider> */}
                  <Dividers marginTop="11" marginBottom="11"></Dividers>
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

export default InquiryList;
