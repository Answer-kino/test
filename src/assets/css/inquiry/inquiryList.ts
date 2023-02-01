import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts, Weight} from '../global/font';

const InquiryListStyles = StyleSheet.create({
  InquiryTitleWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  InquiryTitleLeft: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  InquiryTitleRight: {
    width: '10%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  InquiryTitle: {
    ...Fonts.Android.normal,
    fontSize: 16,
    paddingHorizontal: 10,
    color: 'black',
    ...Weight.Default,
  },
  InquiryMark: {
    fontFamily: 'Noto Sans',
    fontSize: 18,
    color: '#2262AD',
    ...Weight.Bold,
  },
  ContentWrap: {
    width: '90%',
    alignSelf: 'center',
  },
  ContentTextWrap: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#E9E9E9',
    // marginTop: 0.5,
    marginTop: 10,
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
  AnswerWrap: {
    marginTop: 20,
  },
  AnswerTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  TopTitle: {
    color: '#444444',
    fontWeight: 'bold',
    fontSize: 18,
  },
  TitleTextInput: {
    color: '#474747',
    backgroundColor: 'white',
    // height: '10%', 터치하면 줄어드는 부분
    lineHeight: 35,
    borderRadius: 10,
    paddingLeft: 15,
  },
  ContentTextInput: {
    color: '#474747',
    backgroundColor: 'white',
    height: '50%',
    lineHeight: 35,
    borderRadius: 10,
    paddingLeft: 15,
    textAlignVertical: 'top',
  },
  BtnWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  ModifyBtn: {
    backgroundColor: '#4C79BC',
    borderRadius: 5,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  DeleteBtn: {
    backgroundColor: '#898989',
    borderRadius: 5,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  BtnText: {
    color: 'white',
  },
});

export {InquiryListStyles};
