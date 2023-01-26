import {Dimensions, StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  ScrollView: {
    height: Dimensions.get('window').height - 120,
  },
  ScrollViewBorder: {
    height: Dimensions.get('window').height - 190,
    marginTop: 21,
  },
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
});

export {globalStyles};
