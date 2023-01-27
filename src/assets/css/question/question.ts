import {StyleSheet} from 'react-native';
import {Colors, Fonts, Weight} from '../global/font';

const questionStyles = StyleSheet.create({
  QuestionTitleWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  QuestionTitleLeft: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
  },
  QuestionTitleRight: {
    width: '10%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  QuestionTitle: {
    ...Fonts.Android.normal,
    fontSize: 16,
    paddingHorizontal: 10,
    color: 'black',
    ...Weight.Default,
  },
  QuestionMark: {
    fontFamily: 'Noto Sans',
    fontSize: 18,
    color: '#2262AD',
    ...Weight.Bold,
  },
  ContentTextWrap: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#E9E9E9',
    marginTop: 0.5,
  },
  ContentText: {
    width: '90%',
    alignSelf: 'center',
    fontFamily: 'Noto Sans',
    paddingVertical: 17,
    fontSize: 15,
    ...Weight.Default,
    color: 'black',
    // flexShrink: 1,
  },
});

export {questionStyles};
