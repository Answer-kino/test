import {StyleSheet} from 'react-native';
import {Colors, FontNotoSans, Weight} from '../global/font';

const changeStyles = StyleSheet.create({
  TextInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingLeft: 15,
    ...FontNotoSans.Android.Medium,
    ...Colors[292929],
    ...Weight.Normal,
  },
  TextInputThreeQuartersWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  TextInputThreeQuarters: {
    width: '75%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingLeft: 15,
    ...FontNotoSans.Android.Medium,
    ...Colors[292929],
    ...Weight.Normal,
  },
  TextInputWithBtnWithTimerWrap: {
    width: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  TextInputWithBtnWrap: {
    width: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  TextInputWithBtnWithTimer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextInputWithTimer: {
    paddingRight: 10,
  },
  TextInputWithTimerText: {
    ...FontNotoSans.Android.Medium,
    ...Colors[292929],
  },
  TextInputWithBtn: {
    width: 58,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#879BB9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInputWithBtnText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
    ...FontNotoSans.Android.Medium,
  },
  SubmitBtnWrap: {
    backgroundColor: '#6DADDB',
    borderRadius: 10,
    height: 51,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubmitBtnText: {
    ...FontNotoSans.Android.Medium,
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
  },
  ErrorText: {
    color: 'red',
    fontSize: 12,
    ...FontNotoSans.Android.Medium,
    paddingVertical: 7.5,
  },
  InformText: {
    color: '#2D9DB6',
    fontSize: 12,
    ...FontNotoSans.Android.Medium,
    paddingVertical: 7.5,
  },
  SuccessText: {
    color: '#292929',
    fontSize: 12,
    ...FontNotoSans.Android.Medium,
    paddingVertical: 7.5,
  },
});

export {changeStyles};
