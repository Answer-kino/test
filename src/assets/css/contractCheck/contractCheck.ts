import {StyleSheet} from 'react-native';

const ContractChecktyles = StyleSheet.create({
  ModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    overflow: 'hidden',
  },
  ModalClose: {
    marginTop: '-10%',
    width: '100%',
  },
  ButtonClose: {
    marginTop: 20,
    marginBottom: -35,
    backgroundColor: '#A7C1CF',
    width: 1000,
    height: 49,
    justifyContent: 'center',
  },
  Container: {
    marginHorizontal: 30,
    marginTop: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
  },
  DescriptionContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: -10,
    paddingBottom: 15,
  },
  DescriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DescriptionContainer2: {
    marginHorizontal: 20,
    marginTop: 10,
    paddingBottom: 20,
  },
  BottomDescription: {
    marginHorizontal: 50,
    marginTop: 10,
    marginBottom: 100,
  },
  Button: {
    width: 62,
    height: 24,
    backgroundColor: '#879BB9',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {ContractChecktyles};
