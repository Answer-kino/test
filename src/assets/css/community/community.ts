import {StyleSheet} from 'react-native';

const CommunityStyles = StyleSheet.create({
  UseImg: {
    height: 10,
    width: 10,
    marginLeft: '3%',
  },
  CommunityModalContainer: {
    backgroundColor: 'white',
    width: '90%',
    alignItems: 'center',
    borderRadius: 10,
    height: 126,
    justifyContent: 'space-around',
  },
  ModalBody1: {
    borderBottomColor: '#D7D7D7',
    borderBottomWidth: 0.7,
    height: 63,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalBody2: {
    height: 63,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    marginHorizontal: 30,
    marginTop: 15,
  },
  CarnumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TopImgContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  TitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  Content: {
    marginTop: 10,
    minHeight: 200,
  },
  ModifyButton: {
    backgroundColor: '#6DADDB',
    width: 50,
    height: 27,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  CommentContainer: {
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex: 1,
  },
  CommentFront: {
    flexDirection: 'row',
    flex: 4,
    alignItems: 'center',
  },
  ProfileImg: {
    backgroundColor: '#A7C1CF',
    width: 25,
    height: 25,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  CommentInputContainer: {
    marginTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  RegistButton: {
    backgroundColor: '#6DADDB',
    width: 47,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  RegistInput: {
    backgroundColor: 'white',
    flex: 3,
    marginRight: 10,
    height: 42,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    color: 'black',
    borderColor: '#DEDEDE',
  },
});

export default CommunityStyles;
