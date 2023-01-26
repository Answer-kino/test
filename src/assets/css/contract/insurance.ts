import {StyleSheet} from 'react-native';

const insuranceImgStyles = (ratio: number) => {
  const insuranceImgStyles = StyleSheet.create({
    Img: {
      width: '100%',
      height: undefined,
      aspectRatio: ratio,
      resizeMode: 'contain',
      borderRadius: 15,
      marginVertical: 15,
    },
  });

  return insuranceImgStyles.Img;
};

export {insuranceImgStyles};
