import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const Mypage = ({navigation}) => {
  const styles = StyleSheet.create({
    full: {
      backgroundColor: '#F2F6F8',
      width: '100%',
      height: '100%',
    },
    image: {
      width: '12%',
      height: '100%',
    },
    text1: {
      color: 'black',
      font: 'Noto Sans',
      fontWeight: '500',
      fontSize: 15,
      lineHeight: 40,
      marginLeft: '5%',
    },
    text2: {
      display: 'flex',
      color: 'black',
      font: 'Noto Sans',
      fontWeight: '500',
      fontSize: 15,
      lineHeight: 40,
      marginRight: '5%',
    },
    text3: {
      color: 'white',
      font: 'Noto Sans',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 28,
    },
    btn: {
      backgroundColor: '#879BB9',
      borderRadius: 6,
      width: '30%',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '2%',
      height: '38%',
      marginTop: '2%',
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
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/mypageIMG.png')}
          style={{marginTop: '20%'}}></Image>
      </View>

      <View>
        <View
          style={{
            marginLeft: '9%',
            backgroundColor: 'white',
            borderRadius: 14,
            width: '83%',
            marginTop: '20%',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.text1}>차량번호</Text>
            <Text style={styles.text2}>123가1234</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '1%',
            }}>
            <Text style={styles.text1}>현재비밀번호</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  navigation.navigate('ChangePassword');
                }}>
                <Text style={styles.text3}>수정하기</Text>
              </TouchableOpacity>
              <Text style={styles.text2}>***********</Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '-12%',
            }}>
            <Text style={styles.text1}>신규비밀번호</Text>
            <Text style={styles.text2}>************</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '1%',
            }}>
            <Text style={styles.text1}>휴대폰번호</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: '1%',
              }}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.text3}>재인증하기</Text>
              </TouchableOpacity>
              <Text style={styles.text2}>010-1234-4567</Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '-12%',
            }}>
            <Text style={styles.text1}>마케팅 정보 수신동의</Text>
            <Text style={styles.text2}>Y</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '1%',
            }}>
            <Text style={styles.text1}>메일수신동의</Text>
            <Text style={styles.text2}>N</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '1%',
            }}>
            <Text style={styles.text1}>SNS수신동의</Text>
            <Text style={styles.text2}>N</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Mypage;
