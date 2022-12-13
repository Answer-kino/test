import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Touchable,
  Button,
  Pressable,
  FlatList,
} from 'react-native';

import BottomNav from '../../../components/bottomNav/BottomNav';
import TopNav from '../../../components/topNav/TopNav';

interface ItemProps {
  title: string;
}

const Item = (props: ItemProps) => (
  <View
    style={{
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    }}>
    <Text style={{color: 'black', fontSize: 14}}>{props.title}</Text>
  </View>
);

const RaceInfo = () => {
  const DATA = [
    {title: '모니터링'},
    {title: '차량진단'},
    {title: '대시보드'},
    {title: '연료'},
    {title: '주행기록'},
    {title: '주행일지'},
    {title: 'HUD'},
    {title: '운전스타일'},
    {title: '소모품관리'},
  ];

  return (
    <View>
      <TopNav title="내차 운행정보" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.container}>
          <FlatList
            data={DATA}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            // onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
            renderItem={({item}) => <Item title={item.title} />}
            numColumns={3}
          />
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 160,
  },
  container: {
    marginHorizontal: 30,
    marginVertical: 15,
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
});

export default RaceInfo;
