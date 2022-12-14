import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
interface SideMenuProps {
  open: boolean;
  toggleOpen: Function;
}

const SideMenu = (props: SideMenuProps) => {
  return (
    <MenuDrawer
      open={props.open}
      position={'right'}
      drawerContent={
        <View style={styles.container}>
          <View style={styles.box}>
            <View style={styles.boxTop}>
              <View style={styles.carInfo}>
                <View style={styles.carIconContainer}>
                  <View style={styles.carIconWrap}>
                    <Image
                      source={require('../../assets/fa-solid_car-alt.png')}
                    />
                  </View>
                  <Text style={styles.carNumber}>차량번호 : 123가1234</Text>
                </View>
                <TouchableOpacity onPress={() => props.toggleOpen()}>
                  <Image
                    style={styles.closeButton}
                    source={require('../../assets/x.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.sideMenuContainer}>
                <TouchableOpacity style={styles.sideMenuSection}>
                  <View style={styles.sideMenuSectionLeft}>
                    <Image source={require('../../assets/question.png')} />
                    <Text style={styles.menuText}>자주묻는질문</Text>
                  </View>
                  <Image source={require('../../assets/sideArrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sideMenuSection}>
                  <View style={styles.sideMenuSectionLeft}>
                    <Image source={require('../../assets/inquiry.png')} />
                    <Text style={styles.menuText}>문의하기</Text>
                  </View>
                  <Image source={require('../../assets/sideArrow.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      }
      drawerPercentage={100}
      animationTime={50}
      overlay={true}>
      <></>
    </MenuDrawer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba( 0, 0, 0, 0.4 )',
    alignItems: 'flex-end',
  },
  box: {
    flex: 1,
    width: 270,
    backgroundColor: 'white',
  },
  boxTop: {
    height: 202,
  },
  carInfo: {
    height: 97,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  carIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carIconWrap: {
    width: 23,
    height: 23,
    backgroundColor: '#A7C1CF',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  carNumber: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: -0.02,
    color: '#2262AD',
  },
  closeButton: {
    marginTop: 20,
    color: '#707070',
  },
  sideMenuContainer: {
    marginHorizontal: 25,
  },
  sideMenuSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: '#DBDBDB',
    borderBottomWidth: 1,
  },
  sideMenuSectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 15,
    lineHeight: 32,
    letterSpacing: -0.05,
    marginLeft: 10,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812',
  },
});

export default SideMenu;
