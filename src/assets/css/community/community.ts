import {StyleSheet} from 'react-native';

const CommunityStyles = StyleSheet.create({
  Container: {
    marginHorizontal: 30,
    marginTop: 15,
  },
  TitleContainer: {
    flexDirection: 'row',
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
    marginTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flex: 1,
  },
  CommentFront: {
    flexDirection: 'row',
    flex: 4,
    alignItems: 'center',
  },
  ProfileImg: {
    backgroundColor: '#A7C1CF',
    width: 10,
    height: 10,
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
