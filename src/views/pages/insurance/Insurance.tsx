import {View} from 'react-native';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const Insurance = ({navigation}: any) => {
  return (
    <View>
      <TopNav navigation={navigation} title="보험가입증명서" />
      <BottomNav navigation={navigation} />
    </View>
  );
};

export default Insurance;
