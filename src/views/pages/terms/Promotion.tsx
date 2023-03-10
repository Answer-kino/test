import {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import TopNav from '../../../components/topNav/TopNav';
import TermsOfServiceStyles from '../../../assets/css/termsOfService/termsOfService';
import {Font} from '../../../assets/css/global/newFont';
import {globalStyles} from '../../../assets/css/global/styleSheet';

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
      <View style={TermsOfServiceStyles.Full}>
        <ScrollView>
          <TopNav navigation={navigation} title="프로모션"></TopNav>
          <View style={TermsOfServiceStyles.MainContainer}>
            <View style={TermsOfServiceStyles.ContentWrap}>
              <Text style={Font.TermsOfServiceTitle}>
                프로모션 정보의 이용목적
              </Text>
              <Text style={Font.TermsOfServiceContent}>
                에이치오토 제공하는 이벤트/혜택 등 다양한 정보를
                휴대전화(에이치오토 알림 또는 문자), 이메일로 받아 보실 수
                있습니다. 일부 서비스(별도 회원 체계로 운영하거나 에이치오토
                가입 이후 추가 가입하여 이용하는 서비스 등)의 경우, 개별
                서비스에 대해 별도 수신 동의를 받을 수 있으며, 이때에도 수신
                동의에 대해 별도로 안내하고 동의를 받습니다.
              </Text>
              <TouchableOpacity
                style={TermsOfServiceStyles.Button}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={globalStyles.ButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={{marginTop: '10%', backgroundColor: '#F2F6F8'}}></View>
      </View>
    </View>
  );
};

export default Promotion;
