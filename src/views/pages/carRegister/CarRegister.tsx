import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import _ from 'lodash';

import API_TOKEN_SERVICE from '../../../@api/token/token';
import API_VEHICLE_SERVICE from '../../../@api/vehicle/vehicle';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';
import {globalConfig} from '../../../@config/config';

const CarRegister = ({navigation}: any) => {
  const TOKEN_SERVICE = new API_TOKEN_SERVICE();
  const VEHICLE_SERVICE = new API_VEHICLE_SERVICE();
  const {URL} = globalConfig;
  const [vehicleInfo, setVehicleInfo] = useState<Array<any>>();
  const [vehicleImgUriArr, setVehicleImgUriArr] = useState<Array<string>>();
  const getVehicleInfo = async () => {
    try {
      const data = await VEHICLE_SERVICE.GET();

      setVehicleInfo(data);
      console.log(data);
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
    getVehicleInfo();
  }, []);
  useEffect(() => {
    if (!_.isUndefined(vehicleInfo)) {
      const imgUrlArr: Array<string> = [];
      vehicleInfo.map(info => {
        const imgUrl = URL.IMG + info?.ImgName + `?type=${info?.Category}`;
        imgUrlArr.push(imgUrl);
      });
      setVehicleImgUriArr(imgUrlArr);
    }
  }, [vehicleInfo]);

  return (
    <View>
      <TopNav navigation={navigation} title="차량등록증" />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.container}>
          {vehicleImgUriArr &&
            vehicleImgUriArr?.map((imgUri, index) => {
              return (
                <Image style={styles.documentImage} source={{uri: imgUri}} />
              );
            })}
        </View>
        <View style={{marginBottom: 100}}></View>
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
export default CarRegister;
