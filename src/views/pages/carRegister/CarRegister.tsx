import {useEffect, useState} from 'react';
import {ScrollView, Image, View} from 'react-native';
import _ from 'lodash';
import API_TOKEN_SERVICE from '../../../@api/token/token';
import API_VEHICLE_SERVICE from '../../../@api/vehicle/vehicle';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';
import {globalConfig} from '../../../@config/config';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import {vehicleImgStyles} from '../../../assets/css/contract/vehicle';

const CarRegister = ({navigation}: any) => {
  const TOKEN_SERVICE = new API_TOKEN_SERVICE();
  const VEHICLE_SERVICE = new API_VEHICLE_SERVICE();
  const {URL} = globalConfig;
  const [vehicleInfo, setVehicleInfo] = useState<Array<any>>();
  const [vehicleImgUriArr, setVehicleImgUriArr] = useState<Array<string>>();
  const [ratioArr, setRatioArr] = useState<Array<number>>();

  const getVehicleInfo = async () => {
    try {
      const data = await VEHICLE_SERVICE.GET();

      setVehicleInfo(data);
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

  const setRatioArrHandler = async (imgArr: Array<string>) => {
    const imgRatioArr: Array<number> = new Array();
    for (let uri of imgArr) {
      await Image.getSize(uri, (width, height) => {
        imgRatioArr.push(width / height);
      });
    }

    setRatioArr(imgRatioArr);
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

  useEffect(() => {
    if (vehicleImgUriArr) {
      setRatioArrHandler(vehicleImgUriArr);
    }
  }, [vehicleImgUriArr]);

  return (
    <View style={globalStyles.BodyWrap}>
      <TopNav navigation={navigation} title="차량등록증" />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={globalStyles.ScrollViewNft}>
        <View style={globalStyles.MainWrap}>
          {vehicleImgUriArr &&
            ratioArr &&
            vehicleImgUriArr?.map((imgUri, index) => {
              return (
                <Image
                  key={index}
                  style={vehicleImgStyles(ratioArr[index])}
                  source={{uri: imgUri}}
                />
              );
            })}
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default CarRegister;
