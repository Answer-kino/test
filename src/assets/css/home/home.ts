import {Dimensions, Platform, StyleSheet} from 'react-native';
import {Colors, FontNotoSans, Fonts, Weight} from '../global/font';

const mainStyles = StyleSheet.create({
  Background: {
    height: 326,
    overflow: 'visible',
    marginBottom: 60,
  },
  TopStyle: {
    width: '100%',
    height: 56,
    marginHorizontal: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },

  // 로그인버튼
  LoginWrap: {
    width: '100%',
    display: 'flex',
    height: 60,
    alignItems: 'center',
    marginVertical: 25,
  },
  LoginBtn: {
    display: 'flex',
    width: 100,
    height: 31,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
  },
  LoginBtnText: {
    fontSize: 18,
    color: 'white',
    lineHeight: 24.5,
    textAlign: 'center',
    ...FontNotoSans.Android.Medium,
    ...Weight.SemiBold,
  },
  LoginContentsWrap: {
    display: 'flex',
    marginVertical: 15,
    justifyContent: 'center',
  },
  LoginContentsText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
    textAlign: 'center',
    ...FontNotoSans.Android.Medium,
    ...Weight.SemiBold,
  },

  // 차량번호 & 바코드
  CarNumberWrap: {
    width: '100%',
    display: 'flex',
    alignSelf: 'center',
    marginBottom: 5,
  },
  CarNumberBorder: {
    width: '100%',
    height: 50,
    marginVertical: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    ...Platform.select({android: {elevation: 10}}),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  CarNumberBorderTextWarp: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 27.5,
  },
  CarNumberBorderText: {
    fontSize: 17,
    ...FontNotoSans.Android.Medium,
    ...Colors.PrimaryColor,
    ...Weight.Bold,
  },

  // 중앙 네비게이션
  MainNavigationWrap: {
    width: '100%',
    display: 'flex',
    alignSelf: 'center',
  },
  MainNavigationBorderWrap: {
    width: '100%',
    alignSelf: 'center',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    borderBottomRightRadius: 40,
    ...Platform.select({android: {elevation: 10}}),
  },
  MainNavigationBorder: {
    height: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  MainNavigationBorderBtnWrap: {
    width: '33%',
    display: 'flex',
    alignItems: 'center',
  },
  MainNavigationBorderBtn: {
    height: '40%',
    display: 'flex',
    justifyContent: 'center',
  },
  MainNavigationBorderBtnText: {
    textAlign: 'center',
    fontSize: 12,
    ...FontNotoSans.Android.Medium,
    ...Colors.PrimaryColor,
    ...Weight.Bold,
  },
  MainNavigationBorderBtnImgWrap: {
    height: '50%',
    justifyContent: 'center',
  },

  // 공지사항, 콜센터
  DescriptionWrap: {
    width: '90%',
    alignSelf: 'center',
  },
  DescriptionTitle: {
    fontSize: 18,
    ...FontNotoSans.Android.Medium,
    ...Colors[292929],
    ...Weight.Bold,
  },
  DescriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DescriptionText: {
    fontSize: 16,
    lineHeight: 25,
    ...FontNotoSans.Android.Medium,
    ...Colors[292929],
    ...Weight.Normal,
  },

  // 푸터
  FooterWrap: {
    width: '100%',
    display: 'flex',
    alignSelf: 'center',
  },
  FooterTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 25,
  },
  FooterTopText: {
    fontSize: 14,
    ...FontNotoSans.Android.Medium,
    ...Colors[292929],
    ...Weight.Normal,
  },
  FooterBottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  FooterBottomText: {
    fontSize: 13,
    textAlign: 'center',
    ...FontNotoSans.Android.Medium,
    ...Colors[666666],
    ...Weight.Normal,
  },
});

export {mainStyles};
