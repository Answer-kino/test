import {Divider} from '@rneui/base';
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
  Alert,
} from 'react-native';
import API_Inquiry_Service from '../../../@api/inquiry/inquiry';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import {inquiryStyle} from '../../../assets/css/inquiry/inquiry';

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
    <View>
      <TopNav navigation={navigation} title="문의 목록" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
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
                      <Text style={styles.Inquirymark}>Q</Text>
                      <Text style={styles.Inquirytitle}>{title}</Text>

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
                                  <Text style={{color: 'white'}}>수정</Text>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={deleteInquiryList(number)}>
                                <View style={styles.deleteBtn}>
                                  <Text style={{color: 'white'}}>삭제</Text>
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
                            <Text style={styles.Inquirymark}>A</Text>
                            <Text style={styles.Inquirytitle}>답변</Text>
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
  // return (
  //   <View style={globalStyles.BodyWrap}>
  //     <TopNav navigation={navigation} title="문의 목록" />
  //     <ScrollView
  //       contentInsetAdjustmentBehavior="automatic"
  //       style={globalStyles.ScrollViewBorder}>
  //       <View style={globalStyles.FlexColumn}>
  //         <View>
  //           {inquiryListInfo.map((item: any, index: number) => {
  //             const title = item.Title;
  //             const content = item.Content;
  //             const answer = item.AdminAnswer;
  //             const number = item.IDX_ENQ;
  //             return (
  //               <>
  //                 <View
  //                   key={index}
  //                   style={{paddingVertical: 10}}
  //                   // style={{paddingVertical: 10}}
  //                 >
  //                   <View style={globalStyles.MainWrap}>
  //                     <TouchableOpacity
  //                       onPress={() => {
  //                         dropDownHandler(index);
  //                       }}>
  //                       <View style={inquiryStyle.InquiryTitleWrap}>
  //                         <View style={inquiryStyle.InquiryTitleLeft}>
  //                           <Text style={inquiryStyle.InquiryMark}>Q</Text>
  //                           <Text style={inquiryStyle.InquiryTitle}>
  //                             {title}
  //                           </Text>
  //                         </View>
  //                         <View style={inquiryStyle.InquiryTitleRight}>
  //                           {dropDown[index] ? (
  //                             <Image
  //                               source={require('./../../../assets/dropUp.png')}></Image>
  //                           ) : (
  //                             <Image
  //                               source={require('./../../../assets/dropdown.png')}></Image>
  //                           )}
  //                         </View>
  //                       </View>
  //                     </TouchableOpacity>
  //                   </View>

  //                   <Divider
  //                     width={1.5}
  //                     color={'#DBDBDB'}
  //                     style={{paddingVertical: 10}}
  //                   />
  //                   <View>
  //                     <View style={globalStyles.MainWrap}>
  //                       {dropDown[index] ? (
  //                         <View>
  //                           <View style={inquiryStyle.ContentTextWrap}>
  //                             <Text style={inquiryStyle.ContentText}>
  //                               {content}
  //                             </Text>
  //                           </View>
  //                           <View>
  //                             <View>
  //                               <View>
  //                                 <Text>A.</Text>
  //                                 {answer ? (
  //                                   <View>
  //                                     <Text>{answer}</Text>
  //                                   </View>
  //                                 ) : (
  //                                   <View>
  //                                     <Text>확인중입니다.</Text>
  //                                   </View>
  //                                 )}
  //                               </View>
  //                             </View>
  //                           </View>
  //                         </View>
  //                       ) : null}
  //                     </View>
  //                   </View>
  //                 </View>
  //               </>
  //             );
  //           })}
  //         </View>
  //       </View>
  //     </ScrollView>

  //     <BottomNav navigation={navigation} />
  //   </View>
  // );
};

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 80,
  },
  Inquirytitle: {
    color: 'black',
    marginLeft: '3%',
    fontStyle: 'normal',
    fontSize: 16,
    fontWeight: '500',
    marginTop: '1%',
    width: '72%',
  },
  Inquirymark: {
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
