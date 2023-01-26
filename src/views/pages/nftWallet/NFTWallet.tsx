import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';
import _ from 'lodash';
import {AxiosError} from 'axios';
import API_NFT_SERVICE from '../../../@api/nft/nft';
import API_TOKEN_SERVICE from '../../../@api/token/token';
import {globalConfig} from '../../../@config/config';
import {ENftInfo} from '../../../@entity/nft/entity';

import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import {nftImgStyles, nftStyles} from '../../../assets/css/contract/nft';
import {MarginBottom, MarginTop} from '../../../assets/css/global/margin';

const NFTWallet = ({navigation}: any) => {
  const TOKEN_SERVICE = new API_TOKEN_SERVICE();
  const NFT_SERVICE = new API_NFT_SERVICE();
  const {URL} = globalConfig;
  const [nftInfo, setNftInfo] = useState<ENftInfo>();
  const [nftImgUri, setNftImgUri] = useState<string>();
  const [ratio, setRatio] = useState(1);

  const getNftInfo = async () => {
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

  useEffect(() => {
    getNftInfo();
  }, []);

  useEffect(() => {
    if (!_.isUndefined(nftInfo)) {
      const imgUrl = URL.IMG + nftInfo?.ImgName + `?type=${nftInfo?.Category}`;
      setNftImgUri(imgUrl);
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
      <TopNav navigation={navigation} title="NFT 전자지갑" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={globalStyles.ScrollViewNft}>
        <View style={globalStyles.MainWrap}>
          <Text style={nftStyles.Title}>{nftInfo?.VehicleId}</Text>
          <Image style={nftImgStyles(ratio)} source={{uri: nftImgUri}} />
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default NFTWallet;
