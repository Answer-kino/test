import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  BackHandler,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import ImageViewer from 'react-native-image-zoom-viewer';
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
  const getNftInfo = async () => {
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

  useEffect(() => {
    getNftInfo();
  }, []);

  useEffect(() => {
    if (!_.isUndefined(nftInfo)) {
      const imgUrl = URL.IMG + nftInfo?.ImgName + `?type=${nftInfo?.Category}`;
      setNftImgUri(imgUrl);
      setIsImeViewItem([{url: imgUrl}]);
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
      <TopNav navigation={navigation} title="NFT 전자지갑" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={globalStyles.ScrollViewNft}>
        <View style={globalStyles.MainWrap}>
          <Text style={nftStyles.Title}>{nftInfo?.VehicleId}</Text>
          <TouchableOpacity onPress={tnoModalHandler()}>
            <Image style={nftImgStyles(ratio)} source={{uri: nftImgUri}} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default NFTWallet;
