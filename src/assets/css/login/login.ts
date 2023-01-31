import {StyleSheet} from 'react-native';

const LoginStyles = StyleSheet.create({
  Full: {
    height: '100%',
    width: '100%',
    backgroundColor: '#DEDEDE',
  },
  TopText: {
    color: '#292929',
    marginLeft: '7%',
    marginTop: 50,
    width: 81,
    height: 30,
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Noto Sans',
  },
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
  LoginBtnText: {
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
  },
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
  BottomBtnText: {
    fontWeight: '500',
    fontFamily: 'Noto Sans',
    fontSize: 13,
    lineHeight: 18,
  },
  BottomBotContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  BottomBotBtn: {
    width: '80%',
    height: 53,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //   backgroundColor: 'white',
  },
  SignUpText: {
    fontFamily: 'Noto Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 19,
    lineHeight: 20,
    color: '#2D9DB6',
  },
});

export {LoginStyles};
