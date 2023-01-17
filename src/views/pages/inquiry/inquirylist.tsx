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
  const [dropDown2, setDropDown2] = useState(false);
  const [inquiryListInfo, setInquiryListInfo] = useState([]);
  const Inquiry_SerVice = new API_Inquiry_Service();

  const dropDownHandler = (idx: number, bool: boolean) => {
    setDropDown({[idx]: bool});
  };

  const getInquiryList = async () => {
    console.log('a');
    try {
      const result = await Inquiry_SerVice.GET_INQUIRY();
      setInquiryListInfo(result);

      console.log('tw', result.length);
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
            const answer = item.AdminAnswer;
            const number = item.IDX_ENQ;
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
                  {dropDown[index] === true ? (
                    <Text style={styles.contenttext}>
                      {answer !== null ? answer : '확인 중입니다.'}
                    </Text>
                  ) : null}
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
    marginLeft: '10%',
    backgroundColor: '#E9E9E9',
    width: '80%',
    height: 'auto',
    flexShrink: 1,
    padding: 10,
    marginTop: 10,
  },
});

export default InquiryList;
