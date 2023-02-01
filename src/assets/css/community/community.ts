import {StyleSheet} from 'react-native';

const CommunityStyles = StyleSheet.create({
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
  TitleContainer: {display: 'flex', flexDirection: 'row', marginTop: 10},
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
});

export default CommunityStyles;
