import {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  BackHandler,
} from 'react-native';
import TopNav from '../../../components/topNav/TopNav';
import BottomNav from '../../../components/bottomNav/BottomNav';

const Promotion = ({navigation}: any) => {
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
          <TopNav navigation={navigation} title="프로모션"></TopNav>
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
              <Text style={styles.text}>프로모션 정보의 이용목적</Text>
              <Text style={styles.text2}>
                에이치오토 제공하는 이벤트/혜택 등 다양한 정보를
                휴대전화(에이치오토 알림 또는 문자), 이메일로 받아 보실 수
                있습니다. 일부 서비스(별도 회원 체계로 운영하거나 에이치오토
                가입 이후 추가 가입하여 이용하는 서비스 등)의 경우, 개별
                서비스에 대해 별도 수신 동의를 받을 수 있으며, 이때에도 수신
                동의에 대해 별도로 안내하고 동의를 받습니다.
              </Text>
            </View>
          </View>
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
export default Promotion;
