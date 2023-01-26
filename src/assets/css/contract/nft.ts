import {StyleSheet} from 'react-native';
import {Colors, Weight} from '../global/font';

const nftStyles = StyleSheet.create({
  Title: {
    fontSize: 22,
    lineHeight: 35,
    ...Weight.Bold,
    ...Colors[292929],
  },
  Text: {
    fontSize: 16,
    ...Colors[666666],
    ...Weight.Normal,
  },
  CapitalName: {
    fontSize: 16,
    ...Colors.SkyBlue,
    ...Weight.Normal,
  },
  DescriptionWrap: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
  },
  DescriptionTitleWrap: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  DescriptionTitle: {
    fontSize: 16,
    ...Colors[666666],
    ...Weight.Default,
  },
  DescriptionText: {
    fontSize: 14,
    ...Colors[666666],
    ...Weight.Default,
  },
});

const nftImgStyles = (ratio: number) => {
  const nftImgStyles = StyleSheet.create({
    Img: {
      width: '100%',
      height: undefined,
      aspectRatio: ratio,
      resizeMode: 'contain',
      borderRadius: 15,
      marginVertical: 15,
    },
  });

  return nftImgStyles.Img;
};

export {nftStyles, nftImgStyles};
