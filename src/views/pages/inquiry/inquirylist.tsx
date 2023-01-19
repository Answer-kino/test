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
  ActivityIndicator,
} from 'react-native';
import API_Inquiry_Service from '../../../@api/inquiry/inquiry';
import BottomNav from '../../../components/bottomNav/BottomNav';

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
    // console.log('number', number);
    try {
      const result = await Inquiry_SerVice.DELETE_INQUIRY(number);
      console.log(result);
      getInquiryList();
    } catch (error) {
      console.log(error);
    }
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
    <View>
      <TopNav navigation={navigation} title="문의 목록" />
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          {inquiryListInfo.map((item: any, index: number) => {
            const title = item.Title;
            const content = item.Content;
            const answer = item.AdminAnswer;
            const number = item.IDX_ENQ;
            return (
              <View key={index}>
                <View>
                  <TouchableOpacity
                    style={{marginTop: '3%'}}
                    onPress={() => {
                      dropDownHandler(index);
                      // setDropDown2(!dropDown2);
                      // console.log(dropDown);
                      // console.log(index);
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '5%',
                      }}>
                      <Text style={styles.questionmark}>Q</Text>
                      <Text style={styles.questiontitle}>{title}</Text>

                      {dropDown[index] ? (
                        <Image
                          style={styles.dropdownimg}
                          source={require('./../../../assets/dropUp.png')}></Image>
                      ) : (
                        <Image
                          style={styles.dropdownimg}
                          source={require('./../../../assets/dropdown.png')}></Image>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <View>
                    {dropDown[index] === true ? (
                      <>
                        <View
                          style={{
                            backgroundColor: '#E9E9E9',
                            width: '80%',
                            marginLeft: '7%',
                            marginTop: 10,
                          }}>
                          <Text style={styles.contenttext}>{content}</Text>
                          {answer === null ? (
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginRight: 10,
                                marginBottom: 5,
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate('InquiryEdit', {
                                    IDX_ENQ: number,
                                    title: title,
                                    content: content,
                                  });
                                }}>
                                <View style={styles.modifyBtn}>
                                  <Text>수정</Text>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={deleteInquiryList(number)}>
                                <View style={styles.deleteBtn}>
                                  <Text>삭제</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          ) : null}
                        </View>
                        <View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              marginTop: 10,
                            }}>
                            <Text style={styles.questionmark}>A</Text>
                            <Text style={styles.questiontitle}>답변</Text>
                          </View>
                          <View
                            style={{
                              backgroundColor: '#E9E9E9',
                              width: '80%',
                              marginLeft: '7%',
                              marginTop: 10,
                            }}>
                            <Text style={styles.contenttext}>
                              {answer === null ? '확인 중입니다.' : answer}
                            </Text>
                          </View>
                        </View>
                      </>
                    ) : null}
                  </View>
                </View>
              </View>
            );
          })}
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

    height: 'auto',
    flexShrink: 1,
    padding: 10,
  },
  modifyBtn: {
    backgroundColor: '#4C79BC',
    borderRadius: 5,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    backgroundColor: '#898989',
    borderRadius: 5,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
});

export default InquiryList;
