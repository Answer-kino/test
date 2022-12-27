import {StyleSheet, Text, View} from 'react-native';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const CarRegister = ({navigation}: any) => {
  return (
    <View>
      <View>
        <TopNav navigation={navigation} title="차량등록증" />
      </View>
      <View>
        <Text style={styles.text}>M캐피탈</Text>
      </View>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: '7%',
    color: 'black',
    marginTop: '5%',
    fontWeight: '500',
    fontSize: 18,
  },
});
export default CarRegister;
