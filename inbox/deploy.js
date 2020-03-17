const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'denial visa gasp remember vicious absurd borrow swamp crisp relief swarm best',
  'http://rinkeby.infura.io/v3/4ffb96fa73ae4eeca38e25df74c6ca79'
);

const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('accounts', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0] });

  console.log('contract deployed to', result.option.address);
};

deploy();
