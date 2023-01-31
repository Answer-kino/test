import {Divider} from '@rneui/base';
const Dividers = ({marginTop, marginBottom, color}: any) => {
  return (
    <Divider
      color={color ? `${color}` : '#D7D7D7'}
      width={0.7}
      style={{
        opacity: 0.6,
        marginTop: Number(marginTop) || 0,
        marginBottom: Number(marginBottom) || 0,
      }}></Divider>
  );
};

export default Dividers;
