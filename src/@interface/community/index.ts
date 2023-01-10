interface IDetailInfo {
  Title: string;
  CommentCnt: string;
  Content: string;
}

interface ICommentInfo {
  Comment: string;
  CreatedDay: string;
  ProfileImg: string;
}

export type {IDetailInfo, ICommentInfo};
