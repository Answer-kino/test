import {Dimensions, StyleSheet} from 'react-native';

const topNavStyles = StyleSheet.create({
  TopNavWrap: {
    display: 'flex',
    width: '100%',
    height: 70,
    marginHorizontal: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
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
