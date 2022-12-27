import _ from 'lodash';

/**
 * mysql TIMESTAMP 기준
 * @param time
 */
const convertTime = (time: string | undefined) => {
  if (_.isUndefined(time)) return time;
  return time.slice(0, 10);
};

export {convertTime};
