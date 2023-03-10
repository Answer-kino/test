import {useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Modal,
  Text,
  ActivityIndicator,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import API_INSURANCE_SERVICE from '../../../@api/insurance/insurance';
import _ from 'lodash';
import API_TOKEN_SERVICE from '../../../@api/token/token';
import {globalConfig} from '../../../@config/config';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import {insuranceImgStyles} from '../../../assets/css/contract/insurance';

const Insurance = ({navigation}: any) => {
  const TOKEN_SERVICE = new API_TOKEN_SERVICE();
  const INSURANCE_SERVICE = new API_INSURANCE_SERVICE();
  const {URL} = globalConfig;
  const [insuranceInfo, setInsuranceInfo] = useState<Array<any>>();
  const [insuranceImgUriArr, setInsuranceImgUriArr] = useState<Array<string>>();
  const [ratioArr, setRatioArr] = useState<Array<number>>();
  const [isImgModal, setIsImgModal] = useState(false);
  const [isImgViewItem, setIsImeViewItem] = useState<any>([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const showModalHandler = () => () => {
    setIsImgModal(false);
  };
  const tnoModalHandler = (index: number) => () => {
    setImgIndex(index);
    setIsImgModal(true);
  };

  const getInsuranceInfo = async () => {
    try {
      setIsLoading(true);
      const data = await INSURANCE_SERVICE.GET();
      setInsuranceInfo(data);
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
    getInsuranceInfo();
  }, []);

  useEffect(() => {
    if (!_.isUndefined(insuranceInfo)) {
      const imgUrlArr: Array<string> = [];
      const tmpArr: Array<object> = [];
      insuranceInfo.map(info => {
        const imgUrl = URL.IMG + info?.ImgName + `?type=${info?.Category}`;
        imgUrlArr.push(imgUrl);
        tmpArr.push({url: imgUrl});
      });
      setInsuranceImgUriArr(imgUrlArr);
      setIsImeViewItem(tmpArr);
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

  useEffect(() => {
    if (insuranceImgUriArr) {
      setRatioArrHandler(insuranceImgUriArr);
    }
  }, [insuranceImgUriArr]);

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
      <TopNav navigation={navigation} title="보험가입증명서" />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={globalStyles.ScrollViewNft}>
        <View style={globalStyles.MainWrap}>
          {insuranceImgUriArr &&
            ratioArr &&
            insuranceImgUriArr?.map((imgUri, index) => {
              return (
                <TouchableOpacity key={index} onPress={tnoModalHandler(index)}>
                  <Image
                    style={insuranceImgStyles(ratioArr[index])}
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

export default Insurance;
