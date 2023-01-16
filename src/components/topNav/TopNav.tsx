import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import SideMenu from '../sideMenu/SideMenu';

interface TopNavProps {
  title: string;
  navigation: any;
}

const TopNav = (props: TopNavProps) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  return (
    <View style={styles.topNavContainer}>
      <SideMenu
        navigation={props.navigation}
        open={open}
        toggleOpen={toggleOpen}
      />
      <View style={styles.topNavSubContainer}>
        <TouchableOpacity
          style={styles.topNavSection}
          onPress={() => props.navigation.goBack()}>
          <Image source={require('../../assets/BackArrow.png')} />
        </TouchableOpacity>
        <View style={styles.topNavSection2}>
          <Text style={styles.topTitle}>{props.title}</Text>
        </View>
        <TouchableOpacity style={styles.topNavSection3} onPress={toggleOpen}>
          <Image source={require('../../assets/hamburger2.png')} />
        </TouchableOpacity>
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
    marginTop: '3%',
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
    color: 'black',
    fontSize: 21,
    lineHeight: 29,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default TopNav;
