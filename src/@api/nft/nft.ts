import AxiosInstance from '../CustomAxios';

class API_NFT_SERVICE extends AxiosInstance {
  GET = async (): Promise<any> => {
    try {
      const url = 'nft';
      await this.getActHeader();

      const {data} = await this.API.get(url);

      console.log(data);
      return data.nftInfo[0];
      // return data.nftInfo;
    } catch (error: any) {
      console.error('API_NFT_SERVICE : ', error);
      throw new Error(error);
    }
  };
}

export default API_NFT_SERVICE;
