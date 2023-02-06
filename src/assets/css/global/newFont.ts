import {StyleSheet, TextStyle} from 'react-native';

// Color
type BlackColor =
  | 'Black'
  | 'Black2'
  | 'Nero'
  | 'Charcoal'
  | 'Matterhorn'
  | 'DimGray'
  | 'SuvaGrey'
  | 'Grey'
  | 'NightRider';
type BlueColor =
  | 'DarkCerulean'
  | 'SummerSky'
  | 'Denim'
  | 'Denim2'
  | 'Pelorous'
  | 'Chambray';
type RedColor = 'SunsetOrange' | 'Scarlet';
type WhiteColor = 'White';

// FontWeight
type NotoSansKRWeight = 100 | 300 | 400 | 500 | 700 | 900;
type PoppinsWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type NotoSansKR = {[key in NotoSansKRWeight]: TextStyle};
type Poppins = {[key in PoppinsWeight]: TextStyle};

// FontStyleGuide
interface IFontsStyleGuide {
  Color: {
    CBlack: {[key in BlackColor]: TextStyle};
    CBlue: {[key in BlueColor]: TextStyle};
    CRed: {[key in RedColor]: TextStyle};
    CWhite: {[key in WhiteColor]: TextStyle};
  };
  Weight: {
    NotoSansKR: {
      (num: NotoSansKRWeight): TextStyle;
    };
    Poppins: {
      (num: PoppinsWeight): TextStyle;
    };
  };
  Size: {(num: number): TextStyle};
  LineHeight: {(num: number): TextStyle};
}

const NotoSansKR: NotoSansKR = {
  900: {fontFamily: 'NotoSansKR-Black'},
  700: {fontFamily: 'NotoSansKR-Bold'},
  500: {fontFamily: 'NotoSansKR-Medium'},
  400: {fontFamily: 'NotoSansKR-Regular'},
  300: {fontFamily: 'NotoSansKR-Light'},
  100: {fontFamily: 'NotoSansKR-Thin'},
};

const Poppins: Poppins = {
  900: {fontFamily: 'Poppins-Black'},
  800: {fontFamily: 'Poppins-ExtraBold'},
  700: {fontFamily: 'Poppins-Bold'},
  600: {fontFamily: 'Poppins-SemiBold'},
  500: {fontFamily: 'Poppins-Medium'},
  400: {fontFamily: 'Poppins-Regular'},
  300: {fontFamily: 'Poppins-Light'},
  200: {fontFamily: 'Poppins-ExtraLight'},
  100: {fontFamily: 'Poppins-Thin'},
};

const fontsStyleGuide: IFontsStyleGuide = {
  Color: {
    CBlack: {
      Black: {color: '#000000'},
      Black2: {color: '#101010'},
      Nero: {color: '#292929'},
      Charcoal: {color: '#444444'},
      Matterhorn: {color: '#525252'},
      DimGray: {color: '#666666'},
      SuvaGrey: {color: '#898989'},
      Grey: {color: '#797979'},
      NightRider: {color: '#2C2C2C'},
    },
    CBlue: {
      DarkCerulean: {color: '#123D70'},
      SummerSky: {color: '#34ABD0'},
      Denim: {color: '#226EC8'},
      Denim2: {color: '#2262AD'},
      Pelorous: {color: '#2D9DB6'},
      Chambray: {color: '#4A607A'},
    },
    CRed: {
      SunsetOrange: {color: '#FF4C46'},
      Scarlet: {color: '#F31414'},
    },
    CWhite: {White: {color: '#FFFFFF'}},
  },

  Weight: {
    NotoSansKR: (weight: NotoSansKRWeight) => {
      return {
        ...NotoSansKR[weight],
      };
    },
    Poppins: (weight: PoppinsWeight) => {
      return {
        ...Poppins[weight],
      };
    },
  },
  Size: (num: number) => {
    return {fontSize: num};
  },
  LineHeight: (num: number) => {
    return {lineHeight: num};
  },
};
/**
 * @Black #000000
 * @Black2 #101010
 * @Nero #292929
 * @Charcoal #444444
 * @Matterhorn #525252
 * @DimGray #666666
 * @SuvaGrey #898989
 * @Grey #797979
 * @NightRider #2C2C2C
 */
const NotoSansKRBlackText = (
  color: BlackColor,
  weight: NotoSansKRWeight,
  size: number
) => {
  const style = StyleSheet.create({
    Text: {
      ...fontsStyleGuide.Color.CBlack[color],
      ...fontsStyleGuide.Weight.NotoSansKR(weight),
      ...fontsStyleGuide.Size(size),
      letterSpacing: -0.5,
      lineHeight: 23.5,
    },
  });

  return style.Text;
};
/**
 * @Black #000000
 * @Black2 #101010
 * @Nero #292929
 * @Charcoal #444444
 * @Matterhorn #525252
 * @DimGray #666666
 * @SuvaGrey #898989
 * @Grey #797979
 * @NightRider #2C2C2C
 */
const PoppinsBlackText = (
  color: BlackColor,
  weight: PoppinsWeight,
  size: number
) => {
  const style = StyleSheet.create({
    Text: {
      ...fontsStyleGuide.Color.CBlack[color],
      ...fontsStyleGuide.Weight.Poppins(weight),
      ...fontsStyleGuide.Size(size),
      letterSpacing: -0.5,
      lineHeight: 23.5,
    },
  });

  return style.Text;
};
/**
 * @DarkCerulean #123D70
 * @SummerSky #34ABD0
 * @Denim #226EC8
 * @Denim2 #2262AD
 * @Pelorous #2D9DB6
 * @Chambray #4A607A
 */
const NotoSansKRBlueText = (
  color: BlueColor,
  weight: NotoSansKRWeight,
  size: number
) => {
  const style = StyleSheet.create({
    Text: {
      ...fontsStyleGuide.Color.CBlue[color],
      ...fontsStyleGuide.Weight.NotoSansKR(weight),
      ...fontsStyleGuide.Size(size),
      letterSpacing: -0.5,
      lineHeight: 23.5,
    },
  });

  return style.Text;
};
/**
 * @DarkCerulean #123D70'
 * @SummerSky #34ABD0'
 * @Denim #226EC8
 * @Denim2 #2262AD
 * @Pelorous #2D9DB6
 * @Chambray #4A607A
 */
const PoppinsBlueText = (
  color: BlueColor,
  weight: PoppinsWeight,
  size: number
) => {
  const style = StyleSheet.create({
    Text: {
      ...fontsStyleGuide.Color.CBlue[color],
      ...fontsStyleGuide.Weight.Poppins(weight),
      ...fontsStyleGuide.Size(size),
      letterSpacing: -0.5,
      lineHeight: 23.5,
    },
  });

  return style.Text;
};
/**
 * @White #FFFFFF
 *
 */
const NotoSansKRWhiteText = (
  color: WhiteColor,
  weight: NotoSansKRWeight,
  size: number
) => {
  const style = StyleSheet.create({
    Text: {
      ...fontsStyleGuide.Color.CWhite[color],
      ...fontsStyleGuide.Weight.NotoSansKR(weight),
      ...fontsStyleGuide.Size(size),
      letterSpacing: -0.5,
      lineHeight: 23.5,
    },
  });

  return style.Text;
};
/**
 * @White #FFFFFF
 *
 */
const PoppinsWhiteText = (
  color: WhiteColor,
  weight: PoppinsWeight,
  size: number
) => {
  const style = StyleSheet.create({
    Text: {
      ...fontsStyleGuide.Color.CWhite[color],
      ...fontsStyleGuide.Weight.Poppins(weight),
      ...fontsStyleGuide.Size(size),
      letterSpacing: -0.5,
      lineHeight: 23.5,
    },
  });

  return style.Text;
};

/**
 * @SunsetOrange #FF4C46
 * @Scarlet #F31414
 */
const NotoSansKRRedText = (
  color: RedColor,
  weight: NotoSansKRWeight,
  size: number
) => {
  const style = StyleSheet.create({
    Text: {
      ...fontsStyleGuide.Color.CRed[color],
      ...fontsStyleGuide.Weight.NotoSansKR(weight),
      ...fontsStyleGuide.Size(size),
      letterSpacing: -0.5,
      lineHeight: 23.5,
    },
  });

  return style.Text;
};

export const Font = StyleSheet.create({
  // TopNav
  TopNavTitle: {...NotoSansKRBlackText('Charcoal', 700, 22), lineHeight: 28},

  // Home
  MainLoginBtnText: {
    ...NotoSansKRWhiteText('White', 500, 18),
    textAlign: 'center',
  },
  MainLoginBottomText: {
    ...NotoSansKRWhiteText('White', 500, 16),
    textAlign: 'center',
  },
  MainCarNumberText: {...NotoSansKRBlueText('DarkCerulean', 700, 17)},
  MainNoticeTitleText: {...NotoSansKRBlackText('Nero', 700, 17)},
  MainNoticeLeftText: {...NotoSansKRBlackText('Nero', 500, 15)},
  MainNoticeRightText: {...NotoSansKRBlackText('Nero', 400, 15)},
  MainBottomTitle: {...NotoSansKRBlackText('Nero', 700, 17)},
  MainBottomLeft: {...NotoSansKRBlackText('Nero', 500, 15)},
  MainBottomRight: {...NotoSansKRBlackText('Nero', 500, 16)},
  MainFooterTop: {...NotoSansKRBlackText('Nero', 400, 14)},
  MainFooterBottom: {
    ...NotoSansKRBlackText('DimGray', 400, 13),
    textAlign: 'center',
  },

  //계약확인
  ContractCheckTitle: {...NotoSansKRBlackText('Nero', 700, 16), lineHeight: 35},
  ContractCheckLeft: {...NotoSansKRBlackText('Nero', 500, 16)},
  ContractCheckRight: {...NotoSansKRBlackText('DimGray', 500, 15)},
  ContractCheckCheckBtn: {...NotoSansKRWhiteText('White', 500, 14)},
  ContractCheckBottomText: {...NotoSansKRBlackText('Nero', 400, 15)},
  //계약확인 Modal
  ContractCheckModalTop: {
    ...NotoSansKRBlackText('Nero', 700, 20),
    lineHeight: 35,
  },
  ContractCheckModalBottom: {
    ...NotoSansKRBlackText('DimGray', 500, 15),
    lineHeight: 20,
  },
  ContractCheckModalCheckBtn: {
    ...NotoSansKRWhiteText('White', 700, 17),
    textAlign: 'center',
  },
  //내차 NFT 증빙서류
  MyCarDocumentTitle: {
    ...NotoSansKRBlackText('DimGray', 700, 17),
  },
  MyCarDocumentContent: {
    ...NotoSansKRBlackText('Nero', 500, 14),
  },
  // NFT 전자지갑 == NFT 보증서
  // 내차운행정보 Modal
  CarOperationInformationModalTitle: {...NotoSansKRBlackText('Nero', 700, 20)},
  CarOperationInformationModalText: {
    ...NotoSansKRBlackText('DimGray', 500, 14),
  },
  CarOperationInformationModalBtnText: {
    ...NotoSansKRWhiteText('White', 500, 17),
  },
  // CommunityList
  CommunityListTopTitle: {...NotoSansKRBlackText('Nero', 700, 19)},
  CommunityListTitle: {...NotoSansKRBlackText('Nero', 500, 16)},
  CommunityListCommentCountText: {
    ...NotoSansKRRedText('SunsetOrange', 500, 16),
  },
  CommunityListCreatedTime: {...NotoSansKRBlackText('DimGray', 400, 13)},
  // NoticeCategory
  NoticeCategoryText: {
    ...NotoSansKRBlackText('Nero', 500, 16),
    paddingLeft: 10,
  },
  // MyPage
  MypageModalText: {...NotoSansKRBlueText('Chambray', 700, 20)},
  MypageLeftText: {...NotoSansKRBlackText('Nero', 500, 15)},
  MypageRightText: {...NotoSansKRBlackText('DimGray', 500, 15)},
  MyPageBtnText: {...NotoSansKRWhiteText('White', 500, 15)},
  // NFT 보증서
  NftTitle: {...PoppinsBlackText('Nero', 500, 22), lineHeight: 35},
  NftOwnedBy: {...PoppinsBlackText('Nero', 400, 16), lineHeight: 35},
  NftCreatedCapital: {...PoppinsBlueText('SummerSky', 400, 16), lineHeight: 35},
  NftMainDescriptionTitle: {
    ...PoppinsBlackText('DimGray', 400, 16),
  },
  NftMainDescriptionText: {
    ...NotoSansKRBlackText('DimGray', 400, 14),
    lineHeight: 22,
  },
  // 설정
  SettingTitle: {...PoppinsBlueText('Denim', 700, 17)},
  SettingLeftText: {...NotoSansKRBlackText('DimGray', 500, 15)},
  SettingRightText: {...NotoSansKRBlackText('DimGray', 500, 15)},
  //회원가입
  SignUpTop: {...NotoSansKRBlackText('Nero', 700, 22), lineHeight: 30},
  SignUpCheckBtn: {...NotoSansKRWhiteText('White', 500, 13)},
  SignUpMsg: {
    ...NotoSansKRBlackText('Nero', 400, 13),
    textAlign: 'left',
    paddingLeft: 10,
    paddingRight: 10,
  },
  SignUpTimer: {
    ...NotoSansKRBlackText('SuvaGrey', 400, 14),
    paddingRight: 10,
  },

  SignUpWarningMsg: {
    ...NotoSansKRRedText('SunsetOrange', 400, 13),
    textAlign: 'left',
    lineHeight: 15,
    // paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  SignUpAllAgree: {...NotoSansKRBlackText('Grey', 400, 16)},
  SignUpEssential: {...NotoSansKRBlueText('Denim', 400, 15), lineHeight: 20},
  SignUpNotEssential: {
    ...NotoSansKRBlackText('Charcoal', 400, 15),
    lineHeight: 20,
  },
  SignUpCheckBoxRightText: {
    ...NotoSansKRBlackText('Grey', 400, 15),
    lineHeight: 20,
  },
  SignUpCheckBoxWarningText: {...NotoSansKRRedText('Scarlet', 400, 14)},
  SignUpSendValidNumText: {
    ...NotoSansKRBlueText('Pelorous', 400, 13),
    lineHeight: 18,
    paddingLeft: 10,
    paddingRight: 10,
  },
  SignUpValidComplete: {
    ...NotoSansKRBlackText('SuvaGrey', 400, 13),
  },
  SignUpModalTitle: {...NotoSansKRBlackText('Nero', 700, 20), lineHeight: 35},
  SignUpModalMiddleTop: {
    ...NotoSansKRBlackText('DimGray', 500, 14),
    lineHeight: 20,
  },
  SignUpModalCarNumber: {
    ...NotoSansKRBlueText('Denim', 700, 14),
    lineHeight: 20,
  }, //600없음
  SignUpModalBtn: {...NotoSansKRWhiteText('White', 500, 17), lineHeight: 20},
  SignUpModalClose: {
    ...NotoSansKRWhiteText('White', 500, 20),
    textAlign: 'center',
    lineHeight: 33,
  },
  //로그인
  SignInTitle: {...NotoSansKRBlackText('Nero', 700, 22), lineHeight: 30},
  SignInSubmitBtnText: {
    ...NotoSansKRWhiteText('White', 500, 16),
    lineHeight: 18,
  },
  SignInHalfBtnText: {
    ...NotoSansKRBlackText('DimGray', 400, 15),
    lineHeight: 18,
  },
  SignInFullBtnLeftText: {
    ...NotoSansKRBlackText('DimGray', 400, 15),
    lineHeight: 18,
  },
  SignInFullBtnRightText: {
    ...NotoSansKRBlueText('Pelorous', 400, 18),
    lineHeight: 20,
    // letterSpacing: -5,
  },
  //내차 운행정보
  RaceInfoText: {
    ...NotoSansKRBlackText('Charcoal', 500, 14),
  },
  //이용약관
  TermsOfServiceTitle: {
    ...NotoSansKRBlackText('Nero', 500, 18),
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    lineHeight: 35,
  },
  TermsOfServiceContent: {
    ...NotoSansKRBlackText('DimGray', 500, 14),
    lineHeight: 22,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 15,
  },
  TermsOfServiceCheckBtn: {...NotoSansKRWhiteText('White', 500, 16)},
  //사이드메뉴
  SideMenuCarNumber: {...NotoSansKRBlueText('Denim2', 700, 17)},
  SideMenuMenuName: {
    ...NotoSansKRBlackText('Matterhorn', 500, 15),
    alignItems: 'center',
  },
  //자주묻는질문 // 공지사항
  QuestionQmark: {...NotoSansKRBlueText('Denim2', 700, 18)},
  QuestionTitle: {...NotoSansKRBlackText('Matterhorn', 400, 16)},
  QuestionContent: {...NotoSansKRBlackText('Charcoal', 500, 15), padding: 10},
  //문의하기, 문의하기수정하기 inputbox확인
  InquiryTop: {...NotoSansKRBlackText('Charcoal', 700, 18), lineHeight: 35},
  InquiryInputboxPlaceholder: {...NotoSansKRBlackText('SuvaGrey', 400, 15)},
  InquiryInputbox: {...NotoSansKRBlackText('Nero', 400, 15)},
  InquiryBtn: {...NotoSansKRWhiteText('White', 500, 17)},
  //커뮤니티디테일
  CommunityDetailModalText: {...NotoSansKRRedText('SunsetOrange', 500, 18)},
  CommunityDetailModalCancelText: {...NotoSansKRBlackText('DimGray', 500, 18)},
  CommunityDetailCarnumber: {
    ...NotoSansKRBlackText('DimGray', 500, 13),
    // paddingLeft: 10,
  },
  CommunityDetailTitle: {...NotoSansKRBlackText('Black2', 500, 18)},
  CommunityDetailCommentCnt: {
    ...NotoSansKRRedText('SunsetOrange', 500, 16),
    paddingLeft: 10,
  },
  CommunityDetailContent: {...NotoSansKRBlackText('DimGray', 500, 15)},
  CommunityModifyBtn: {...NotoSansKRWhiteText('White', 700, 14)},
  CommunityMiddleComment: {...NotoSansKRBlackText('DimGray', 700, 15)},
  CommunityComment: {
    ...NotoSansKRBlackText('DimGray', 500, 14),
  },
  CommunityCommentTime: {...NotoSansKRBlackText('DimGray', 500, 12)},
  CommunityCommentInputBox: {...NotoSansKRBlackText('Nero', 500, 14)},
  CommunityCommentInputBoxPlaceholder: {
    ...NotoSansKRBlackText('SuvaGrey', 500, 14),
  },
  CommunityCommentRegisterBtn: {...NotoSansKRWhiteText('White', 700, 16)},
  //공지사항리스트
  NoticeTopTitle: {...NotoSansKRBlackText('Nero', 700, 19)},
  NoticeTitle: {...NotoSansKRBlackText('Matterhorn', 500, 18), lineHeight: 35},
  NoticeTimeCategory: {
    ...NotoSansKRBlackText('DimGray', 400, 15),
    lineHeight: 35,
  },
  //비밀번호변경
  ChangePwdInputBox: {...NotoSansKRBlackText('Nero', 400, 15)},
  ChangePwdInputBoxPlaceholder: {...NotoSansKRBlackText('SuvaGrey', 400, 15)},
  ChangePwdCheckBtn: {...NotoSansKRWhiteText('White', 500, 17)},
  ChangePwdWarningMsg: {
    ...NotoSansKRRedText('SunsetOrange', 400, 13),
    textAlign: 'left',
    lineHeight: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  //차량번호찾기
  FindCarNumTopText: {...NotoSansKRBlackText('Nero', 700, 22), lineHeight: 30},
  FindCarNumInput: {...NotoSansKRBlackText('Nero', 400, 14)},
  FindCarNumPlaceholder: {...NotoSansKRBlackText('SuvaGrey', 400, 14)},
  FindCarNumCertificationBtn: {...NotoSansKRWhiteText('White', 500, 13)},
  FindCarNumCarNumTextLeft: {
    ...NotoSansKRBlackText('DimGray', 700, 16),
    lineHeight: 18,
  }, //600없음
  FindCarNumCarNumTextRight: {
    ...NotoSansKRBlueText('Denim', 700, 16),
    lineHeight: 18,
    padding: 5,
  },
  FindCarNumCheckBtn: {...NotoSansKRWhiteText('White', 500, 16)},
  //비밀번호찾기
  FindPwdTopText: {...NotoSansKRBlackText('Nero', 700, 22), lineHeight: 30},
  FindPwdInput: {...NotoSansKRBlackText('Nero', 400, 14)},
  FindPwdPlaceholder: {...NotoSansKRBlackText('SuvaGrey', 400, 14)},
  FindPwdWarningMsg: {
    ...NotoSansKRRedText('SunsetOrange', 400, 13),
    textAlign: 'left',
    lineHeight: 15,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  FindPwdCertificationBtn: {...NotoSansKRWhiteText('White', 500, 13)},
  FindPwdValidSuccess: {
    ...NotoSansKRBlackText('SuvaGrey', 400, 13),
    paddingLeft: 10,
  },
  FindPwdSendValidNumText: {
    ...NotoSansKRBlueText('Pelorous', 400, 13),
    paddingLeft: 10,
    // lineHeight: 10,
  },
  FindPwdLoginBtn: {...NotoSansKRWhiteText('White', 500, 16)},
  //커뮤니티글쓰기
  CommunityWriteTopTitle: {...NotoSansKRBlackText('Nero', 700, 19)},
  CommunityWriteInputbox: {...NotoSansKRBlackText('Nero', 400, 15)},
  CommunityWriteInputboxPlaceholder: {
    ...NotoSansKRBlackText('Matterhorn', 400, 15),
  },
  CommunityWriteBtn: {...NotoSansKRWhiteText('White', 500, 17)},
  //공지사항디테일
  NoticeDetailTitle: {...NotoSansKRBlackText('Matterhorn', 500, 18)},
  NoticeDetailContent: {...NotoSansKRBlackText('DimGray', 700, 14)},
  NoticeDetailCheckBtn: {...NotoSansKRBlackText('NightRider', 500, 17)},
  //문의글보기
  InquiryListMark: {...NotoSansKRBlueText('Denim2', 700, 18)},
  InquiryListTitle: {
    ...NotoSansKRBlackText('Matterhorn', 400, 16),
    paddingHorizontal: 10,
  },
  InquiryListContent: {
    ...NotoSansKRBlackText('Charcoal', 500, 15),
    paddingVertical: 17,
    paddingHorizontal: 10,
  },
  InquiryListBtn: {...NotoSansKRWhiteText('White', 500, 14)},
  //공통 버튼
  AllBtnText: {...NotoSansKRWhiteText('White', 500, 17)},
});
