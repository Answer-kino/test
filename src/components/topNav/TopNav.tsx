import {Divider} from '@rneui/base';
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import SideMenu from '../sideMenu/SideMenu';
import BackArrow from '../../assets/BackArrow.svg';
import Hamburger from '../../assets/hamburger2.svg';
import {globalStyles} from '../../assets/css/global/styleSheet';
import {topNavStyles} from '../../assets/css/global/topNav';

interface TopNavProps {
  title: string;
  navigation: any;
}

const TopNav = (props: TopNavProps) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  return (
    <View style={globalStyles.BodyWrap}>
      <SideMenu
        navigation={props.navigation}
        open={open}
        toggleOpen={toggleOpen}
      />
      <View style={globalStyles.MainWrap}>
        <View style={topNavStyles.TopNavWrap}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <BackArrow />
          </TouchableOpacity>

          <Text style={topNavStyles.Title}>{props.title}</Text>

          <TouchableOpacity onPress={toggleOpen}>
            <Hamburger />
          </TouchableOpacity>
        </View>
      </View>
      <Divider width={1} />
    </View>
  );
};

export default TopNav;
