import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Mypage from '../../views/mypage/mypage';

const BottomNav = ({navigation}: any) => {
  return (
    <View style={styles.bottomNavContainer}>
      <View>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={styles.imageContainer}>
            <Image source={require('../../assets/home.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.push('NFTDocument');
            }}
            style={styles.imageContainer}>
            <Image source={require('../../assets/nft_document2.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.push('Mypage');
            }}
            style={styles.imageContainer}>
            <Image source={require('../../assets/mypage.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // navigation.push('');
            }}
            style={styles.imageContainer}>
            <Image source={require('../../assets/setting.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const bottomNavHeight = 100;

const styles = StyleSheet.create({
  bottomNavContainer: {
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    top: Dimensions.get('window').height - bottomNavHeight,
    bottom: 0,
    left: 0,
    right: 0,
    height: bottomNavHeight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 100,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  rectangleContainer: {
    width: '100%',
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    backgroundColor: '#E0E0E0',
    width: 37,
    height: 7,
    marginTop: 5,
    borderRadius: 20,
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    justifyContent: 'space-around',
  },
  imageContainer: {
    width: 47,
    height: 53,
  },
});

export default BottomNav;
