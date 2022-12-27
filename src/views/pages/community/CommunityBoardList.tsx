import React, {useEffect} from 'react';
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

import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const CommunityBoardList = ({navigation}) => {
  useEffect(() => {
    const backAction = () => {
      navigation.pop();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View>
      <TopNav navigation={navigation} title="커뮤니티" />
      <TouchableOpacity
        style={styles.writeButtonFloat}
        onPress={() => {
          navigation.push('CommunityBoardWrite');
        }}>
        <View style={styles.writeContainer}>
          <Image source={require('../../../assets/write.png')} />
        </View>
      </TouchableOpacity>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.descriptionTitle}>자유게시판</Text>
          <TouchableOpacity
            onPress={() => navigation.push('CommunityBoard')}
            style={styles.documentMenu}>
            <View style={styles.titleContainer}>
              <Text style={styles.descriptionTitle}>K5 vs K7</Text>
              <Text style={styles.comment}>3</Text>
            </View>
            <Text>3시간 전</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push('CommunityBoard')}
            style={styles.documentMenu}>
            <View style={styles.titleContainer}>
              <Text style={styles.descriptionTitle}>
                예산에 맞는 차량 추천해주세요
              </Text>
              <Text style={styles.comment}>5</Text>
            </View>
            <Text>12시간 전</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push('CommunityBoard')}
            style={styles.documentMenu}>
            <View style={styles.titleContainer}>
              <Text style={styles.descriptionTitle}>
                20대 초반 수입차 고민입니다
              </Text>
              <Text style={styles.comment}>{''}</Text>
            </View>
            <Text>2022.11.10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push('CommunityBoard')}
            style={styles.documentMenu}>
            <View style={styles.titleContainer}>
              <Text style={styles.descriptionTitle}>
                이번에 새로나온 투싼 어떤가요?
              </Text>
              <Text style={styles.comment}>{''}</Text>
            </View>
            <Text>2022.11.09</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push('CommunityBoard')}
            style={styles.documentMenu}>
            <View style={styles.titleContainer}>
              <Text style={styles.descriptionTitle}>
                BMW5시리즈 고민됩니다. 여러분이라면...
              </Text>
              <Text style={styles.comment}>2</Text>
            </View>
            <Text>2022.11.09</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push('CommunityBoard')}
            style={styles.documentMenu}>
            <View style={styles.titleContainer}>
              <Text style={styles.descriptionTitle}>
                리스 렌트 차량을 알아보고 있는데 좋은 업...
              </Text>
              <Text style={styles.comment}>8</Text>
            </View>
            <Text>2022.11.08</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push('CommunityBoard')}
            style={styles.documentMenu}>
            <View style={styles.titleContainer}>
              <Text style={styles.descriptionTitle}>
                NFT보증된 차량을 구매 원합니다
              </Text>
              <Text style={styles.comment}>6</Text>
            </View>
            <Text>2022.11.08</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 80,
  },
  container: {
    marginHorizontal: 30,
    marginTop: 15,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  documentMenu: {
    marginTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
  },
  descriptionTitle: {
    fontSize: 17,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
  },
  comment: {
    fontSize: 17,
    color: '#FF4C46',
    lineHeight: 35,
    letterSpacing: -0.05,
    marginLeft: 10,
  },
  writeButtonFloat: {
    backgroundColor: 'black',
    width: 53,
    height: 53,
    zIndex: 1,
    position: 'absolute',
    top: Dimensions.get('window').height - 170,
    bottom: 0,
    // left: 0,
    right: '5%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  writeContainer: {
    borderBottomColor: 'white',
    paddingBottom: 4,
    borderBottomWidth: 3,
  },
});

export default CommunityBoardList;
