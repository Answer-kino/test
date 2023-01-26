import {Dimensions, StyleSheet} from 'react-native';

const topNavStyles = StyleSheet.create({
  TopNavWrap: {
    width: '90%',
    height: 70,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Title: {
    color: '#444444',
    fontSize: 22,
    lineHeight: 29,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
  },
});

export {topNavStyles};
