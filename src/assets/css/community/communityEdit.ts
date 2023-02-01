import {StyleSheet} from 'react-native';

const CommunityEditStyles = StyleSheet.create({
  Container: {
    marginHorizontal: 30,
    marginTop: 15,
  },
  TitleInput: {
    marginTop: 10,
    backgroundColor: 'white',
    flex: 1,
    minHeight: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: 'black',
  },
  ContentInput: {
    marginTop: 10,
    paddingTop: 10,
    backgroundColor: 'white',
    flex: 1,
    minHeight: 200,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    color: 'black',
  },
  ModifyBtn: {
    marginTop: 10,
    backgroundColor: 'black',
    height: 57,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CommunityEditStyles;
