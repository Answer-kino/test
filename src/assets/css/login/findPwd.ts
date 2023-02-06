import {StyleSheet} from 'react-native';

const FindPwdStyles = StyleSheet.create({
  Full: {
    height: '100%',
    width: '100%',
    paddingTop: 50,
    paddingHorizontal: 30,
    backgroundColor: '#DEDEDE',
  },
  Inputbox1: {
    backgroundColor: 'white',
    width: '100%',
    height: 48,
    marginTop: 15,
    borderRadius: 10,
    paddingLeft: 15,
    color: 'black',
  },
  InputBoxWithBtn: {
    display: 'flex',
    flex: 1,
    color: 'black',
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
  InputBtn: {
    width: 58,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#879BB9',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  FlexRowText: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    width: '100%',
    paddingRight: 10,
  },
  LastBtn: {
    width: '100%',
    height: 51,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#6DADDB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FindPwdStyles;
