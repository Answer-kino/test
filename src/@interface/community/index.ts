interface IDetailInfo {
  Title: string;
  CommentCnt: string;
  Content: string;
  userId: string;
  ProfileImg: number;
}

interface ICommentInfo {
  Comment: string;
  CreatedDay: string;
  ProfileImg: string;
  Title: string;
  Content: string;
  imgNumber: number;
  CarNumber: string;
  IDX_COMMENT: string;
  IDX_USER: number;
}

export type {IDetailInfo, ICommentInfo};
