import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import API_TOKEN_SERVICE from '../../@api/token/token';

const Intro = ({navigation}: any) => {
  const TOKEN_SERVICE = new API_TOKEN_SERVICE();

  const tokenValidation = async () => {
    let replaceRef = 'Home';
    try {
      await TOKEN_SERVICE.REISSUE_ACT();
    } catch (error) {
      replaceRef = 'Login2';
    }

    setTimeout(async () => {
      navigation.replace(replaceRef);
    }, 700);
  };

  useEffect(() => {
    tokenValidation();
  }, []);

  return (
    <View style={styles.app}>
      <Image style={styles.app} source={require('../../assets/loading.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Intro;
