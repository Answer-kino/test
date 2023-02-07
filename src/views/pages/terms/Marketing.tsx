import {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import TermsOfServiceStyles from '../../../assets/css/termsOfService/termsOfService';
import TopNav from '../../../components/topNav/TopNav';

const Marketing = ({navigation}: any) => {
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
      <View style={styles.full}>
        <ScrollView>
          <TopNav navigation={navigation} title="마케팅"></TopNav>
          <View style={{height: '100%'}}>
            <View
              style={{
                backgroundColor: 'white',
                marginLeft: '9%',
                marginRight: '9%',
                width: '85%',
                height: '100%',
                marginTop: 22,
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Text style={styles.text}>마케팅정보 수신동의</Text>
              <Text style={styles.text2}>
                개인정보보호법 제22조 제4항에 의해 선택정보 사항에 대해서는
                기재하지 않으셔도 서비스를 이용하실 수 있습니다.
              </Text>
              <Text style={styles.text3}>
                1. 마케팅 및 광고에의 활용신규 서비스(제품) 개발 및 맞춤 서비스
                제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 인구통계학적
                특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인,
                접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로
                개인정보를 처리합니다.
              </Text>
              <Text style={styles.text3}>
                2. 에이치오토는 서비스를 운용함에 있어 각종 정보를 서비스 화면,
                전화, e-mail, SMS, 우편물, 앱푸시 등의 방법으로 에이치오토
                회원에게 제공할 수 있으며, 에이치오토 모바일 쿠폰의 수신 등,
                의무적으로 안내되어야 하는 정보성 내용은 수신동의 여부와
                무관하게 제공됩니다.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={TermsOfServiceStyles.Button}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={globalStyles.ButtonText}>확인</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={{marginTop: '10%', backgroundColor: '#F2F6F8'}}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  full: {
    backgroundColor: '#F2F6F8',
    width: '100%',
    height: '100%',
  },

  text: {
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 35,
    marginLeft: '5%',
    color: '#292929',
  },
  text2: {
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
    marginLeft: '5%',
    marginTop: 8,
  },
  text3: {
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
    marginLeft: '8%',
    marginTop: 8,
  },
});
export default Marketing;
