import {StyleSheet} from 'react-native';

const vehicleImgStyles = (ratio: number) => {
  const vehicleImgStyles = StyleSheet.create({
    Img: {
      width: '100%',
      height: undefined,
      aspectRatio: ratio,
      resizeMode: 'contain',
      borderRadius: 15,
      marginVertical: 15,
      borderColor: '#D7D7D7',
      borderWidth: 0.5,
    },
  });

  return vehicleImgStyles.Img;
};

export {vehicleImgStyles};
