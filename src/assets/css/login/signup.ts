import {Dimensions, StyleSheet} from 'react-native';

const SignUpStyles = StyleSheet.create({
  Full: {
    height: '100%',
    width: '100%',
    backgroundColor: '#DEDEDE',
  },
  ScrollView: {
    height: Dimensions.get('window').height,
  },
  SignUpModalWrap: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
  },
  SignUpModalView: {
    width: '80%',
    height: 200,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 15,
  },

  SignUpModalTop: {height: '75%'},
  SignUpModalTopHead: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  SignUpModalTopHeadBtn: {
    backgroundColor: 'black',
    width: 33,
    height: 33,
    borderRadius: 100,
    marginTop: 10,
    marginRight: 10,
  },
  SignUpModalTopHeadText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 33,
    textAlign: 'center',
  },
  SignUpModalTopBody: {
    display: 'flex',
    alignItems: 'center',
  },
  SignUpModalTopBodyTitle: {
    color: '#292929',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 35,
    marginBottom: 10,
  },
  SignUpModalTopBodyContent: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  SignUpModalTopBodyCarNumber: {
    color: '#226EC8',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  SignUpModalBottom: {
    display: 'flex',
    height: '25%',
    backgroundColor: '#73A2D9',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  SignUpModalBottomBtn: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignUpModalBottomText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 20,
  },
  TopText: {
    color: '#292929',
    marginLeft: '7%',
    marginTop: 50,
    height: 30,
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Noto Sans',
  },

  ViewWrap: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '85%',
  },
  FlexRowText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  FlexRowinputBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    backgroundColor: 'white',
    height: 48,
    borderRadius: 10,
    marginBottom: 10,
  },
  FlexRowinput: {
    display: 'flex',
    flex: 1,
    color: 'black',
    marginLeft: 5,
  },
  FlexRowWithBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    backgroundColor: 'white',
    height: 48,
    borderRadius: 10,
    marginBottom: 10,
  },
  InputBoxWithBtn: {
    display: 'flex',
    flex: 1,
    color: 'black',
    marginLeft: 5,
  },
  InputBtn: {
    width: 58,
    height: 33,
    borderRadius: 6,
    backgroundColor: '#879BB9',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  InputTimer: {
    width: 58,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
    color: '#898989',
  },
  InputText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 28,
    color: '#FFFFFF',
  },
  CheckBoxWrap: {
    width: '85%',
  },
  CheckBoxView: {
    display: 'flex',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  CheckBoxLabelWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  RequirementsMsg: {
    fontFamily: 'Noto Sans',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20,
    color: '#226EC8',
    marginRight: 5,
  },
  SelectionMsg: {
    fontFamily: 'Noto Sans',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20,
    color: '#000000',
    marginRight: 5,
  },
  SuccessMsg: {
    width: '100%',
    textAlign: 'left',
    color: 'black',
    fontSize: 12,
    marginBottom: 10,
  },
  WarringMsg: {
    width: '100%',
    textAlign: 'left',
    color: '#2D0DB6',
    fontSize: 12,
    marginBottom: 10,
  },
  ErrorMsg: {
    width: '100%',
    textAlign: 'left',
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  LastBtn: {
    flex: 1,
    width: '80%',
    height: 51,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#6DADDB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {SignUpStyles};
