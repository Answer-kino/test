import {Dimensions, StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  ScrollView: {
    height: Dimensions.get('window').height - 120,
    position: 'relative',
  },
  BodyWrap: {
    width: '100%',
  },
  MainWrap: {
    width: '90%',
    alignSelf: 'center',
  },
});

export {globalStyles};
