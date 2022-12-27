import AxiosInstance from '../CustomAxios';

class API_NFT_SERVICE extends AxiosInstance {
  GET = async (): Promise<any> => {
    try {
      const url = 'nft';
      await this.getActHeader();

      const {data} = await this.API.get(url);

      return data.nftInfo[0];
    } catch (error: any) {
      console.error('API_NFT_SERVICE : ', error);
      throw new Error(error);
    }
  };

  META = async (cid: string) => {
    try {
      const {data} = await this.IPFS.get(cid);

      return data;
    } catch (error) {
      console.log('META ERROR');
      console.dir(error);
    }
  };
}

export default API_NFT_SERVICE;
