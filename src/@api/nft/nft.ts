import AxiosInstance from '../CustomAxios';

class API_NFT_SERVICE extends AxiosInstance {
  GET = async (): Promise<any> => {
    try {
      const url = 'nft';
      await this.getActHeader();

      const {data} = await this.API.get(url);

      return data.nftInfo[0];
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export default API_NFT_SERVICE;
