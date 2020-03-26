import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xbE49FBF6de2434Dad0a288649495421bf5d539F0'
);

export default instance;
