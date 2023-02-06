import {useEffect, useState} from 'react';
import {
  ScrollView,
  Image,
  Modal,
  Text,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
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
  const [isImgModal, setIsImgModal] = useState(false);
  const [isImgViewItem, setIsImgViewItem] = useState<any>([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const showModalHandler = () => () => {
    setIsImgModal(false);
  };
  const tnoModalHandler = (index: number) => () => {
    setImgIndex(index);
    setIsImgModal(true);
  };
  const getVehicleInfo = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
      const tmpArr: Array<object> = [];
      vehicleInfo.map(info => {
        const imgUrl = URL.IMG + info?.ImgName + `?type=${info?.Category}`;
        imgUrlArr.push(imgUrl);
        tmpArr.push({url: imgUrl});
      });
      setVehicleImgUriArr(imgUrlArr);
      setIsImgViewItem(tmpArr);
    }
  }, [vehicleInfo]);

  useEffect(() => {
    if (vehicleImgUriArr) {
      setRatioArrHandler(vehicleImgUriArr);
    }
  }, [vehicleImgUriArr]);

  return (
    <View style={globalStyles.BodyWrap}>
      {/* spinner */}
      <Modal transparent={true} visible={isLoading}>
        <ActivityIndicator
          size={'large'}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
      </Modal>
      {/* react-native-image-zoom-viewer */}
      <Modal
        visible={isImgModal}
        transparent={false}
        style={{backgroundColor: 'black'}}>
        <View>
          <TouchableOpacity
            onPress={showModalHandler()}
            style={{
              backgroundColor: 'black',
              display: 'flex',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                width: '10%',
                paddingTop: 10,
                textAlign: 'center',
              }}>
              X
            </Text>
          </TouchableOpacity>
        </View>

        <ImageViewer
          style={{}}
          index={imgIndex}
          imageUrls={isImgViewItem}
          onSwipeDown={() => {
            showModalHandler();
          }}
        />
      </Modal>
      <TopNav navigation={navigation} title="차량등록증" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={globalStyles.ScrollViewNft}>
        <View style={globalStyles.MainWrap}>
          {vehicleImgUriArr &&
            ratioArr &&
            vehicleImgUriArr?.map((imgUri, index) => {
              return (
                <TouchableOpacity key={index} onPress={tnoModalHandler(index)}>
                  <Image
                    key={index}
                    style={vehicleImgStyles(ratioArr[index])}
                    source={{uri: imgUri}}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default CarRegister;
