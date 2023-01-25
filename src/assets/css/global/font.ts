import {TextStyle} from 'react-native';

/**
 * fontFamily
 */
const Fonts = {
  Android: {
    normal: {
      fontFamily: 'normal',
    },
    notoserif: {
      fontFamily: 'notoserif',
    },
    sansSerif: {
      fontFamily: 'sans-serif',
    },
  },
  Ios: {},
};

/**
 * color
 */
const Colors = {
  PrimaryColor: {color: '#123D70'},
  White: {color: 'White'},
  Black: {color: 'Black'},
  292929: {color: '#292929'},
  666666: {color: '#666666'},
};

/**
 * fontWeight
 */
const Weight: {[key: string]: TextStyle} = {
  Normal: {
    fontWeight: '400',
  },
  Default: {
    fontWeight: '500',
  },
  SemiBold: {
    fontWeight: '600',
  },
  Bold: {
    fontWeight: '700',
  },
  Bolder: {
    fontWeight: '800',
  },
};

export {Fonts, Colors, Weight};