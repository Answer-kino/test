import _ from 'lodash';

const addComma = (num: number | undefined) => {
  if (_.isUndefined(num)) return num;
  return num.toLocaleString();
};

const cutOff__10000 = (num: number | undefined) => {
  if (_.isUndefined(num)) return num;
  return num / 10000;
};
export {addComma, cutOff__10000};
