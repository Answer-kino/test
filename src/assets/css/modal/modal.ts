import {StyleSheet} from 'react-native';

const modalStyles = StyleSheet.create({
  ModalWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
  },
  MainWrap: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  HeaderWrap: {
    position: 'relative',
    width: '100%',
  },
  HeaderText: {
    color: '#4A607A',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ModalCloseWrap: {
    position: 'absolute',
    right: 0,
  },
  ModalCloseText: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  ImgBoxWrap: {
    display: 'flex',
    alignSelf: 'center',
  },
  ImgBox: {
    width: '33%',
    alignItems: 'center',
  },
});

export {modalStyles};
