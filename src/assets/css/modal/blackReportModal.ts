import {StyleSheet} from 'react-native';

const blackReportModalStyles = StyleSheet.create({
  ModalBackGround: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
  },
  ModalWrap: {width: '100%', alignItems: 'center', bottom: 15},
  MainWrap: {
    width: '90%',
  },
  BtnWrap: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
  },
  Btn: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
  },
});

export {blackReportModalStyles};
