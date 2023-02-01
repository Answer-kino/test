import {StyleSheet} from 'react-native';

const FindCarNumStyles = StyleSheet.create({
  Full: {
    height: '100%',
    width: '100%',
    paddingTop: 50,
    paddingHorizontal: 30,
    backgroundColor: '#DEDEDE',
  },
  FlexRowWithBtn: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    height: 48,
    paddingLeft: 12,
    borderRadius: 10,
  },
  FlexRowText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',

    paddingRight: 10,
    marginBottom: 10,
  },
});

export default FindCarNumStyles;
