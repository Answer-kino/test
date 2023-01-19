import {useEffect, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import API_INSURANCE_SERVICE from '../../../@api/insurance/insurance';
import _ from 'lodash';
import API_TOKEN_SERVICE from '../../../@api/token/token';
import {globalConfig} from '../../../@config/config';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const Insurance = ({navigation}: any) => {
  const TOKEN_SERVICE = new API_TOKEN_SERVICE();
  const INSURANCE_SERVICE = new API_INSURANCE_SERVICE();
  const {URL} = globalConfig;
  const [insuranceInfo, setInsuranceInfo] = useState<Array<any>>();
  const [insuranceImgUriArr, setInsuranceImgUriArr] = useState<Array<string>>();
  const getInsuranceInfo = async () => {
    try {
      const data = await INSURANCE_SERVICE.GET();
      setInsuranceInfo(data);
      console.log('data:', data);
    } catch (error) {
      const success = await TOKEN_SERVICE.REFRESH__TOKEN();

      if (success) {
        alert('관리자에게 문의해주세요.');
      } else {
        alert('로그인을 다시 시도해주세요.');
        navigation.push('Login2');
      }
    }
  };
  useEffect(() => {
    getInsuranceInfo();
  }, []);

  useEffect(() => {
    if (!_.isUndefined(insuranceInfo)) {
      const imgUrlArr: Array<string> = [];
      insuranceInfo.map(info => {
        const imgUrl = URL.IMG + info?.ImgName + `?type=${info?.Category}`;
        imgUrlArr.push(imgUrl);
      });
      setInsuranceImgUriArr(imgUrlArr);
    }
  }, [insuranceInfo]);

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
      <TopNav navigation={navigation} title="보험가입증명서" />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.container}>
          {insuranceImgUriArr &&
            insuranceImgUriArr?.map((imgUri, index) => {
              return (
                <Image style={styles.documentImage} source={{uri: imgUri}} />
              );
            })}
        </View>
        <View style={{marginBottom: 100}} />
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: '7%',
    color: 'black',
    marginTop: '5%',
    fontWeight: '500',
    fontSize: 18,
  },
  scrollView: {
    height: Dimensions.get('window').height - 80,
  },
  container: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  titleCode: {
    fontSize: 22,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
  },
  documentImage: {
    height: 400,
    marginVertical: 10,
    resizeMode: 'contain',
  },
});
export default Insurance;
