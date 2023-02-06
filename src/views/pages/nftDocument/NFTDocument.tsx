import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Touchable,
  Button,
  Pressable,
  BackHandler,
  Modal,
  ActivityIndicator,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import _ from 'lodash';
import API_NFT_SERVICE from '../../../@api/nft/nft';
import API_TOKEN_SERVICE from '../../../@api/token/token';
import {ENftInfo} from '../../../@entity/nft/entity';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';
import {globalConfig} from '../../../@config/config';
import API_Mypage from '../../../@api/mypage/Mypage';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import {MarginBottom, MarginTop} from '../../../assets/css/global/margin';
import {nftImgStyles, nftStyles} from '../../../assets/css/contract/nft';
import {Font} from '../../../assets/css/global/newFont';

interface CapitalInfo {
  Capital: any;
}

const NFTDocument = ({navigation}: any) => {
  const TOKEN_SERVICE = new API_TOKEN_SERVICE();
  const NFT_SERVICE = new API_NFT_SERVICE();
  const MYypage_SERVICE = new API_Mypage();
  const {URL} = globalConfig;
  const [nftInfo, setNftInfo] = useState<ENftInfo>();
  const [nftImgUri, setNftImgUri] = useState<string>();
  const [ratio, setRatio] = useState(1);
  const [metaInfo, setMetaInfo] = useState<any>();
  const [capital, setCapital] = useState<CapitalInfo>();
  const [isImgViewItem, setIsImeViewItem] = useState<any>([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isImgModal, setIsImgModal] = useState(false);
  const showModalHandler = () => () => {
    setIsImgModal(false);
  };
  const tnoModalHandler = () => () => {
    setIsImgModal(true);
  };

  const getCapitalInfo = async () => {
    try {
      setIsLoading(true);
      const data = await NFT_SERVICE.GET();
      setNftInfo(data);
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

  const getCapital = async () => {
    try {
      const data = await MYypage_SERVICE.getMyData();
      setCapital(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCapitalInfo();
    getCapital();
  }, []);
  useEffect(() => {
    if (!_.isUndefined(nftInfo)) {
      const imgUrl = URL.IMG + nftInfo?.ImgName + `?type=${nftInfo?.Category}`;
      setNftImgUri(imgUrl);
      setIsImeViewItem([{url: imgUrl}]);
      // const metaInfo = JSON.parse(nftInfo?.MetaInfo);
      // setMetaInfo(metaInfo);
    }
  }, [nftInfo]);

  useEffect(() => {
    if (nftImgUri) {
      Image.getSize(nftImgUri, (width, height) => {
        setRatio(width / height);
      });
    }
  }, [nftImgUri]);

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
      <TopNav navigation={navigation} title="NFT보증서" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={globalStyles.ScrollViewNft}>
        <View style={globalStyles.MainWrap}>
          <Text style={Font.NftTitle}>{nftInfo?.VehicleId}</Text>
          <TouchableOpacity onPress={tnoModalHandler()}>
            <Image style={nftImgStyles(ratio)} source={{uri: nftImgUri}} />
          </TouchableOpacity>
          <View style={globalStyles.FlexRow}>
            <Text style={Font.NftOwnedBy}>Owned by</Text>
            <Text> </Text>
            <Text style={Font.NftCreatedCapital}>
              {capital?.Capital !== '' ? capital?.Capital : null}
            </Text>
          </View>
          <View style={MarginTop(25)} />
          <View style={nftStyles.DescriptionWrap}>
            <View style={nftStyles.DescriptionTitleWrap}>
              <Text style={Font.NftMainDescriptionTitle}>Description</Text>
              <Text>　</Text>
              <Image source={require('../../../assets/logos_ethereum.png')} />
            </View>

            <Text style={Font.NftMainDescriptionText}>
              {/* {metaInfo?.description ||
                'Example : 차량은 캐피탈사의 공식 보증된차이며, 한국보증협회의 엄격한 품질' +
                  '검사와 검사를 198회 통과한 인증 중고차임을 증명합니다.'} */}
              차량은 캐피탈사의 공식 보증된차이며, 한국보증협회의 엄격한 품질
              검사와 검사를 198회 통과한 인증 중고차임을 증명합니다.
            </Text>
          </View>
          <View style={MarginTop(25)} />
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default NFTDocument;
