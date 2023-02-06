import {StyleSheet} from 'react-native';

const CommunityWriteStyles = StyleSheet.create({
  Container: {
    marginHorizontal: 30,
    marginTop: 15,
  },
  TitleInput: {
    marginTop: 10,
    backgroundColor: 'white',
    flex: 1,
    height: 54,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: 'black',
  },

  ContentInput: {
    marginTop: 10,
    paddingTop: 10,
    backgroundColor: 'white',
    flex: 1,
    minHeight: 54,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    color: 'black',
  },
  WriteButton: {
    marginTop: 10,
    backgroundColor: 'black',
    height: 51,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommunityWriteStyles;
