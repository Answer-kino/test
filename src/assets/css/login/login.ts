import {StyleSheet} from 'react-native';
import {Font} from '../global/newFont';
const LoginStyles = StyleSheet.create({
  Full: {
    height: '100%',
    width: '100%',
    backgroundColor: '#DEDEDE',
  },
  TopTitleContainer: {width: '80%', alignSelf: 'center', marginTop: 50},
  TopText: Font.SignInTitle,

  MiddleContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  Inputbox: {
    backgroundColor: 'white',
    width: '80%',
    height: 48,
    marginTop: 15,
    borderRadius: 10,
    paddingLeft: 15,
    color: 'black',
  },
  LoginBtn: {
    width: '80%',
    height: 51,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#6DADDB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginBtnText: Font.SignInSubmitBtnText,
  BottomTopContainer: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    marginLeft: '9%',
    justifyContent: 'space-between',
  },
  BottomTopBtn: {
    width: '48%',
    height: 53,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  BottomBtnText: Font.SignInHalfBtnText,
  BottomBotContainer: {
    marginTop: 15,
    alignItems: 'center',
    // height: 300,
  },
  BottomBotBtn: {
    width: '80%',
    height: 53,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,

    //   backgroundColor: 'white',
  },
  FullBtnLeftText: Font.SignInFullBtnLeftText,
  FullBtnRightText: Font.SignInFullBtnRightText,
});

export {LoginStyles};
