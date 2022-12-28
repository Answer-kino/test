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
  TextInput,
  BackHandler,
} from 'react-native';

import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const CommunityBoardWrite = ({navigation}: any) => {
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
      <TopNav navigation={navigation} title="커뮤니티" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.descriptionTitle}>글쓰기</Text>
          <TextInput placeholder="제목" style={styles.titleInput} />
          <TextInput
            placeholder="내용"
            style={styles.contentInput}
            multiline={true}
            numberOfLines={17}
          />
          <TouchableOpacity style={styles.writeButton}>
            <Text style={styles.writeButtonText}>글쓰기</Text>
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
  descriptionTitle: {
    fontSize: 17,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
  },
  titleInput: {
    marginTop: 10,
    backgroundColor: 'white',
    flex: 1,
    height: 54,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  contentInput: {
    marginTop: 10,
    paddingTop: 10,
    backgroundColor: 'white',
    flex: 1,
    minHeight: 54,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  writeButton: {
    marginTop: 10,
    backgroundColor: 'black',
    height: 57,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  writeButtonText: {
    fontSize: 17,
    color: 'white',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default CommunityBoardWrite;
