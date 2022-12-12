import {View, Text, Image, StyleSheet} from 'react-native';

const Mypage = () => {
  const styles = StyleSheet.create({
    full: {
      backgroundColor: '#F2F6F8',
      width: '100%',
      height: '100%',
    },
    image: {
      width: 32,
      height: 32,
    },
  });
  return (
    <View style={styles.full}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 22,
          marginRight: 20,
          marginTop: 21,
        }}>
        <Image
          source={require('./../../assets/back.png')}
          style={styles.image}></Image>
        <Text
          style={{
            fontFamily: 'Noto Sans',
            fontWeight: '700',
            fontSize: 21,
            lineHeight: 28,
          }}>
          마이페이지
        </Text>
        <Image
          source={require('./../../assets/list.png')}
          style={styles.image}></Image>
      </View>
    </View>
  );
};

export default Mypage;
