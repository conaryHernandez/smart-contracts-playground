import Web3 from 'web3';

let provider;
let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // we are in the browser and metamask is running
  provider = window.ethereum;
  provider.enable();
  web3 = new Web3(provider);
} else {
  // we are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/4ffb96fa73ae4eeca38e25df74c6ca79'
  );

  web3 = new Web3(provider);
}

export default web3;
