import {StyleSheet} from 'react-native';

const SideMenuStyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'rgba( 0, 0, 0, 0.4 )',
    alignItems: 'flex-end',
  },
  Box: {
    flex: 1,
    width: 270,
    backgroundColor: 'white',
  },
  BoxTop: {
    height: 202,
  },
  CloseBtn: {
    display: 'flex',
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 20,
  },
  CarInfo: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 23,
    marginBottom: 10,
  },
  CarIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CarIconWrap: {
    width: 23,
    height: 23,
    backgroundColor: '#A7C1CF',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
  SideMenuContainer: {
    marginHorizontal: 25,
  },
  SideMenuSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  SideMenuSectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SideMenuStyles;
