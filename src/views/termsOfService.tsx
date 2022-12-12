import {View, Text, Image, StyleSheet} from 'react-native';

const TermsOfService = () => {
  const styles = StyleSheet.create({
    full: {
      backgroundColor: '#b6d3f3',
      width: '100%',
      height: '100%',
    },
    image: {
      width: 32,
      height: 32,
    },
    text: {
      fontFamily: 'Noto Sans',
      fontWeight: '500',
      fontSize: 18,
      lineHeight: 35,
      marginLeft: 15,
      color: '#292929',
    },
    text2: {
      fontFamily: 'Noto Sans',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 22,
      color: '#666666',
      marginLeft: 15,
      marginTop: 8,
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
          marginTop: 21,
          marginRight: 20,
        }}>
        <Image
          source={require('./../assets/back.png')}
          style={styles.image}></Image>
        <Text
          style={{
            fontFamily: 'Noto Sans',
            fontWeight: '700',
            fontSize: 21,
            lineHeight: 28,
          }}>
          이용약관
        </Text>
        <Image
          source={require('./../assets/list.png')}
          style={styles.image}></Image>
      </View>
      <View
        style={{
          borderBottomColor: '#8D8D8D',
          marginLeft: 22,
          marginRight: 20,
          borderWidth: 0.6,
          marginTop: 30,
        }}></View>
      <View>
        <View
          style={{
            backgroundColor: 'white',
            marginLeft: 25,
            marginRight: 21,
            width: 344,
            height: 934,
            marginTop: 22,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Text style={styles.text}>제1조(목적)</Text>
          <Text style={styles.text2}>
            이 약관은 (주)에이치오토(전자상거래 사업자)가 운영하는 사이버
            몰(이하 "몰"이라 한다)에서 제공하는 인터넷 관련 서비스(이하
            "서비스"라 한다)를 이용함에 있어 사이버 몰과 이용자의 권리?의무 및
            책임사항을 규정함을 목적으로 합니다.
          </Text>
          <Text style={styles.text2}>
            ※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지
            않는 한 이 약관을 준용합니다」
          </Text>
          <View style={{marginTop: 20}}>
            <Text style={styles.text}>제2조(정의)</Text>
            <View style={{display: 'flex', flexDirection: 'column'}}>
              <Text style={styles.text2}>
                ①"몰" 이란 (주)에이치오토가 재화 또는 용역(이하 "재화등"이라
                함)을 이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를
                이용하여 재화등을 거래할 수 있도록 설정한 가상의 영업장을
                말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
              </Text>
              <Text style={styles.text2}>
                ②"이용자"란 "몰"에 접속하여 이 약관에 따라 "몰"이 제공하는
                서비스를 받는 회원 및 비회원을 말합니다.
              </Text>
              <Text style={styles.text2}>
                ③ '회원'이라 함은 "몰"에 개인정보를 제공하여 회원등록을 한
                자로서, "몰"의 정보를 지속적으로 제공받으며, "몰"이 제공하는
                서비스를 계속적으로 이용할 수 있는 자를 말합니다.
              </Text>
              <Text style={styles.text2}>
                ④ '비회원'이라 함은 회원에 가입하지 않고 "몰"이 제공하는
                서비스를 이용하는 자를 말합니다.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TermsOfService;
