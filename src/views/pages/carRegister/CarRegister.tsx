import axios from 'axios';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import API_VEHICLE_SERVICE from '../../../@api/vehicle/vehicle';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

const CarRegister = ({navigation}: any) => {
  const VEHICLE_SERVICE = new API_VEHICLE_SERVICE();
  const [vehicleInfo, setVehicleInfo] = useState('');
  const getCapitalInfo = async () => {
    try {
      const data = await VEHICLE_SERVICE.GET();

      setVehicleInfo(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCapitalInfo();
  }, []);
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
