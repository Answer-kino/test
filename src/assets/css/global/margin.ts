import {StyleSheet} from 'react-native';

const MarginTop = (num: number | string) => {
  const marginStyle = StyleSheet.create({
    marginTop: {marginTop: num},
  });
  return marginStyle.marginTop;
};
const MarginBottom = (num: number | string) => {
  const marginStyle = StyleSheet.create({
    marginBottom: {marginBottom: num},
  });
  return marginStyle.marginBottom;
};
const MarginLeft = (num: number | string) => {
  const marginStyle = StyleSheet.create({
    marginLeft: {marginLeft: num},
  });
  return marginStyle.marginLeft;
};
const MarginRight = (num: number | string) => {
  const marginStyle = StyleSheet.create({
    marginRight: {marginRight: num},
  });
  return marginStyle.marginRight;
};

export {MarginTop, MarginBottom, MarginLeft, MarginRight};
