import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  BackHandler,
} from 'react-native';

import image1 from '../../../assets/monitoring.png';
import image2 from '../../../assets/scan.png';
import image3 from '../../../assets/DashBoard.png';
import image4 from '../../../assets/fuel.png';
import image5 from '../../../assets/drive_records.png';
import image6 from '../../../assets/daily.png';
import image7 from '../../../assets/HUD.png';
import image8 from '../../../assets/drive_style.png';
import image9 from '../../../assets/expendables_maintanence.png';
import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

interface ItemProps {
  title: string;
  img: string;
}

const Item = (props: ItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        {props.img === '1' && <Image source={image1} />}
        {props.img === '2' && <Image source={image2} />}
        {props.img === '3' && <Image source={image3} />}
        {props.img === '4' && <Image source={image4} />}
        {props.img === '5' && <Image source={image5} />}
        {props.img === '6' && <Image source={image6} />}
        {props.img === '7' && <Image source={image7} />}
        {props.img === '8' && <Image source={image8} />}
        {props.img === '9' && <Image source={image9} />}
      </View>
      <Text style={{color: 'black', fontSize: 14}}>{props.title}</Text>
    </View>
  );
};

const RaceInfo = ({navigation}) => {
  const DATA = [
    {title: '모니터링', img: '1'},
    {title: '차량진단', img: '2'},
    {title: '대시보드', img: '3'},
    {title: '연료', img: '4'},
    {title: '주행기록', img: '5'},
    {title: '주행일지', img: '6'},
    {title: 'HUD', img: '7'},
    {title: '운전스타일', img: '8'},
    {title: '소모품관리', img: '9'},
  ];

  return (
    <View>
      <TopNav navigation={navigation} title="내차 운행정보" />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}> */}
      <View style={styles.container}>
        <FlatList
          data={DATA}
          style={styles.flatList}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={({item}) => <Item title={item.title} img={item.img} />}
          numColumns={3}
        />
      </View>
      {/* </ScrollView> */}
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 80,
  },
  container: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  flatList: {
    padding: -20,
    marginVertical: -8,
  },
  titleCode: {
    fontSize: 22,
    color: '#292929',
    lineHeight: 35,
    letterSpacing: -0.05,
  },
  documentImage: {
    width: '100%',
  },
  itemContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: '1.5%',
    marginHorizontal: '1.5%',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3,
  },
  item: {
    height: 50,
    justifyContent: 'center',
    marginVertical: 8,
  },
});

export default RaceInfo;
