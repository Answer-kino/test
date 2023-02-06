import AxiosInstance from '../CustomAxios';

class API_BLOCK_SERVICE extends AxiosInstance {
  async Block_Board(boardIdx: any) {
    const IDX_BOARD = boardIdx;

    try {
      await this.getActHeader();
      // console.log('idx', IDX_BOARD);
      const url = 'block/board';
      const {data} = await this.API.post(url, {IDX_BOARD});
      return data?.result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async Block_Comment(boardIdx: any, IDX_COMMENT: any) {
    const IDX_BOARD = boardIdx;
    console.log('idxef', boardIdx);
    try {
      await this.getActHeader();
      const url = 'block/comment';
      console.log(IDX_BOARD, IDX_COMMENT, url);
      const {data} = await this.API.post(url, {IDX_BOARD, IDX_COMMENT});
      console.log('data', data);
      return data?.result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async Block_User(userIdx: any) {
    const targetIdx = Number(userIdx);
    console.log(userIdx);
    const targetType = 1;
    try {
      await this.getActHeader();
      const url = 'block/user';
      const {data} = await this.API.post(url, {targetIdx, targetType});
      console.log('차단err2', data);
      return data.result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async Report_User(targetIdx: any, targetType: any, targetTypeIdx: any) {
    console.log('abaf', targetIdx, targetType, targetTypeIdx);
    try {
      await this.getActHeader();
      const url = 'report';
      const {data} = await this.API.post(url, {
        targetIdx,
        targetType,
        targetTypeIdx,
      });
      console.log(data);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default API_BLOCK_SERVICE;
