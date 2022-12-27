import {useEffect} from 'react';
import {View, Text, Image, StyleSheet, BackHandler} from 'react-native';

const Connect = ({navigation}) => {
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
  const styles = StyleSheet.create({
    full: {
      backgroundColor: '#b6d3f3',
      width: '100%',
      height: '100%',
    },
    text: {
      color: '#226EC8',
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 17,
      lineHeight: 23,
    },
    image: {
      width: 20,
      height: 20,
      marginLeft: 3,
      marginTop: 2,
    },
    line: {
      borderBottomColor: '#72ABEE',
      marginLeft: 21,
      marginRight: 21,
      borderWidth: 0.5,
      marginTop: 10,
    },
    text2: {
      marginLeft: 21,
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 15,
      lineHeight: 18,
      marginTop: 10,
    },
  });
  return (
    <View style={styles.full}>
      <>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Image
            source={require('./../assets/back.png')}
            style={{
              width: 26,
              height: 22,
              marginTop: 24,
              marginLeft: 21,
            }}></Image>
          <Text
            style={{
              marginTop: 19,
              fontFamily: 'Noto Sans',
              fontWeight: '700',
              fontSize: 21,
              lineHeight: 28,
            }}>
            연결
          </Text>
          <Image
            source={require('./../assets/reload.png')}
            style={{marginTop: 19, marginRight: 21}}></Image>
        </View>
        <View
          style={{
            marginLeft: 21,
            marginRight: 21,
            borderBottomColor: '#8D8D8D',
            borderWidth: 1,
            marginTop: 5,
          }}></View>
      </>
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <View
          style={{
            marginTop: 50,
            marginLeft: 21,
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Text style={styles.text}>연결 방식</Text>
          <Image
            source={require('./../assets/bx_link.png')}
            style={styles.image}></Image>
        </View>
        <View style={styles.line}></View>
        <Text style={styles.text2}>Bluetooth LE 4.0</Text>
        <View
          style={{
            marginLeft: 21,
            marginRight: 21,
            borderBottomColor: '#8D8D8D',
            borderWidth: 0.5,
            marginTop: 10,
          }}></View>
        <Text style={styles.text2}>Wi-Fi</Text>
      </View>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 21,
            marginTop: 50,
          }}>
          <Text style={styles.text}>연결 설정</Text>
          <Image
            source={require('./../assets/connect_setting.png')}
            style={styles.image}></Image>
        </View>
        <View style={styles.line}></View>
        <Text style={styles.text2}>프로토콜 & 데이터</Text>
      </View>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 50,
            marginLeft: 21,
          }}>
          <Text style={styles.text}>블루투스 목록</Text>
          <Image
            source={require('./../assets/bluetooth.png')}
            style={styles.image}></Image>
        </View>
        <View style={styles.line}></View>
        <Text style={styles.text2}>h-auto</Text>
      </View>
    </View>
  );
};

export default Connect;
