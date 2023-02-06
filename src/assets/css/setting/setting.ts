import {StyleSheet} from 'react-native';

const SettingStyles = StyleSheet.create({
  Full: {
    backgroundColor: '#DEDEDE',
    width: '100%',
    height: '100%',
  },
  Title: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  BodyTopContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  BodyTopLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  BodyBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SecondBodyTitle: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
  },
});

export {SettingStyles};
