import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

interface TopNavProps {
  title: string;
}

const TopNav = (props: TopNavProps) => {
  return (
    <View style={styles.topNavContainer}>
      <View style={styles.topNavSubContainer}>
        <View style={styles.topNavSection}>
          <Image source={require('../../assets/BackArrow.png')} />
        </View>
        <View style={styles.topNavSection2}>
          <Text style={styles.topTitle}>{props.title}</Text>
        </View>
        <View style={styles.topNavSection3}>
          <Image source={require('../../assets/햄버거2.png')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topNavContainer: {
    width: '100%',
    height: 47,
    marginBottom: 13,
    paddingHorizontal: 28,
  },
  topNavSubContainer: {
    paddingVertical: 13,
    borderBottomWidth: 1,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topNavSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  topNavSection2: {
    flex: 4,
    alignItems: 'center',
  },
  topNavSection3: {
    flex: 1,
    alignItems: 'flex-end',
  },
  topTitle: {
    fontSize: 21,
    lineHeight: 29,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default TopNav;
