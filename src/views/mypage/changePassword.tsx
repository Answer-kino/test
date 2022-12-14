import {Image, StyleSheet, Text, TextInput, View} from 'react-native';

const ChangePassword = () => {
  const styles = StyleSheet.create({
    full: {
      backgroundColor: '#F2F6F8',
      width: '100%',
      height: '100%',
    },
    inputbox: {
      backgroundColor: 'white',
      color: '#898989',
      //   color: 'black',
      fontFamily: 'Noto Sans',
      fontWeight: '400',
      fontSize: 15,
      marginLeft: '9%',
      borderRadius: 10,
      width: '82%',
      paddingLeft: 15,
      marginTop: '10%',
    },
    inputbox2: {
      backgroundColor: 'white',
      color: '#898989',
      //   color: 'black',
      fontFamily: 'Noto Sans',
      fontWeight: '400',
      fontSize: 15,
      marginLeft: '9%',
      borderRadius: 10,
      width: '82%',
      paddingLeft: 15,

      marginTop: '3%',
    },
    image: {
      width: '12%',
      height: '100%',
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
            marginLeft: '9%',
            marginRight: '9%',
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
              color: 'black',
            }}>
            마이페이지
          </Text>
          <Image
            source={require('./../../assets/list.png')}
            style={styles.image}></Image>
        </View>
        <View
          style={{
            borderBottomColor: '#8D8D8D',
            borderWidth: 0.4,
            marginTop: '5%',
            marginLeft: '9%',
            marginRight: '9%',
          }}></View>
      </>
      <TextInput
        style={styles.inputbox}
        placeholder="비밀번호"
        placeholderTextColor="#898989"></TextInput>
      <TextInput
        style={styles.inputbox2}
        placeholder="새 비밀번호"
        placeholderTextColor="#898989"></TextInput>
      <TextInput
        style={styles.inputbox2}
        placeholder="새 비밀번호 확인"
        placeholderTextColor="#898989"></TextInput>
    </View>
  );
};

export default ChangePassword;
