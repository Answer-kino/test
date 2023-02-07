import {StyleSheet} from 'react-native';

const TermsOfServiceStyles = StyleSheet.create({
  Full: {
    backgroundColor: '#F2F6F8',
    width: '100%',
    height: '100%',
  },
  MainContainer: {
    height: '100%',
    alignItems: 'center',
  },
  ContentWrap: {
    backgroundColor: 'white',
    width: '85%',
    height: '100%',
    marginTop: 22,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  BodyContent1Wrap: {
    display: 'flex',
    flexDirection: 'column',
  },
  Button: {
    backgroundColor: '#6DADDB',
    width: '100%',
    borderRadius: 10,
    height: 51,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});

export default TermsOfServiceStyles;
