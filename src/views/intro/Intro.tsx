import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';

const Intro = ({navigation}) => {
  const styles = StyleSheet.create({
    app: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const accessToken = () => {
    setTimeout(async () => {
      navigation.replace('Home');
    }, 700);
  };

  useEffect(() => {
    accessToken();
  }, []);

  return (
    <View style={styles.app}>
      <Image style={styles.app} source={require('../../assets/loading.png')} />
    </View>
  );
};
export default Intro;
