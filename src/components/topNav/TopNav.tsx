import {Divider} from '@rneui/base';
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
    <View>
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
            <Image source={require('../../assets/Vector.png')} />
          </TouchableOpacity>
          <View style={styles.topNavSection2}>
            <Text style={styles.topTitle}>{props.title}</Text>
          </View>
          <TouchableOpacity style={styles.topNavSection3} onPress={toggleOpen}>
            <Image source={require('../../assets/hamburger2.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <Divider width={0.5} style={{marginBottom: 21}} />
    </View>
  );
};

const styles = StyleSheet.create({
  topNavContainer: {
    width: '100%',
    height: 47,
    paddingHorizontal: 28,
    marginTop: 21,
    marginBottom: 13,
  },
  topNavSubContainer: {
    paddingVertical: 13,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    color: '#444444',
    fontSize: 22,
    lineHeight: 29,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
  },
  line: {
    borderBottomColor: '#8D8D8D',
    borderWidth: 0.19,
    marginTop: 10,
    width: '100%',
    opacity: 0.4,
  },
});

export default TopNav;
