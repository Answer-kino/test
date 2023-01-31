import {Dimensions, StyleSheet} from 'react-native';

const MyPageStyles = StyleSheet.create({
  TopImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    marginTop: '12.5%',
    marginBottom: '12.5%',
  },
  TopImageBackgroud: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainContainerWrap: {
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 14,
    width: '100%',
  },
  MainContainerRowTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  MainContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  MainContainerRowRightTextWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  MainContainerRowBtnWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  MainContainerRowBtn: {
    display: 'flex',
    width: 40,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#879BB9',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  MainContainerRowBot: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  FooterContainerWrap: {
    paddingTop: 20,
    paddingBottom: 80,
  },
  FooterContainerBtn: {
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: '#6DADDB',
    borderRadius: 8,
    width: '100%',
    paddingTop: 7.5,
    paddingBottom: 7.5,
  },
  FooterContainerBtnText: {
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 40,
    fontWeight: '500',
    color: '#ffffff',
  },
});

export {MyPageStyles};
