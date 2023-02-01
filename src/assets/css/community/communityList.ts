import {Dimensions, StyleSheet} from 'react-native';

const CommunityListStyles = StyleSheet.create({
  WriteButtonFloat: {
    backgroundColor: 'black',
    width: 53,
    height: 53,
    zIndex: 1,
    position: 'absolute',
    top: Dimensions.get('window').height - 170,
    bottom: 0,
    // left: 0,
    right: '5%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  WriteContainer: {
    borderBottomColor: 'white',
    paddingBottom: 4,
    borderBottomWidth: 3,
  },
  MiddleTopWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CommunityListStyles;
