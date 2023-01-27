import {Dimensions, StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  // Home
  ScrollView: {
    height: Dimensions.get('window').height - 90,
  },
  // NoticeList, Question
  ScrollViewBorder: {
    height: Dimensions.get('window').height - 190,
    marginTop: 21,
  },
  // CarRegister, Insurance, NFTDocument, NFTWallet
  ScrollViewNft: {
    height: Dimensions.get('window').height - 190,
    marginTop: 21,
  },
  BodyWrap: {
    width: '100%',
  },
  MainWrap: {
    width: '90%',
    alignSelf: 'center',
  },
  FlexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  FlexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  Button: {
    backgroundColor: '#6DADDB',
    width: '100%',
    borderRadius: 10,
    height: 51,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    fontFamily: 'Noto Sans',
  },
});

export {globalStyles};
