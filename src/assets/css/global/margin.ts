import {StyleSheet} from 'react-native';

const MarginTop = (num: number) => {
  const marginStyle = StyleSheet.create({
    marginTop: {marginTop: num},
  });
  return marginStyle.marginTop;
};
const MarginBottom = (num: number) => {
  const marginStyle = StyleSheet.create({
    marginBottom: {marginBottom: num},
  });
  return marginStyle.marginBottom;
};

export {MarginTop, MarginBottom};
