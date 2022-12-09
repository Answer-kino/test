import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

const BottomNav = () => {
  return (
    <View style={styles.bottomNavContainer}>
      <View>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle} />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/nft보증서.png')} />
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/마이페이지.png')} />
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/설정.png')} />
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/홈.png')} />
          </View>
        </View>
      </View>
    </View>
  );
};
const bottomNavHeight = 100;

const styles = StyleSheet.create({
  bottomNavContainer: {
    width: '100%',
    position: 'absolute',
    top: Dimensions.get('window').height - bottomNavHeight,
    bottom: 0,
    left: 0,
    right: 0,
    height: bottomNavHeight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 47,
    height: 53,
  },
});

export default BottomNav;
