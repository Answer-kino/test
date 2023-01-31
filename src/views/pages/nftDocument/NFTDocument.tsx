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
} from 'react-native';
import _ from 'lodash';
import API_NFT_SERVICE from '../../../@api/nft/nft';
import API_TOKEN_SERVICE from '../../../@api/token/token';
import {ENftInfo} from '../../../@entity/nft/entity';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';
import {globalConfig} from '../../../@config/config';
import API_Mypage from '../../../@api/mypage/Mypage';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import {Weight} from '../../../assets/css/global/font';
import {Colors} from 'react-native/Libraries/NewAppScreen';
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

  const getCapitalInfo = async () => {
    try {
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
      <TopNav navigation={navigation} title="NFT보증서" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={globalStyles.ScrollViewNft}>
        <View style={globalStyles.MainWrap}>
          <Text style={Font.NftTitle}>{nftInfo?.VehicleId}</Text>

          <Image style={nftImgStyles(ratio)} source={{uri: nftImgUri}} />

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
