require('dotenv').config();
const { toWei, toHex } = require('web3-utils');
const HDWalletProvider = require('truffle-hdwallet-provider');

// You must specify PRIVATE_KEY and INFURA_API_KEY in your .env file
// Feel free to replace PRIVATE_KEY with a MNEMONIC to use an hd wallet
function createProvider(network) {
    if (!process.env.PRIVATE_KEY || !process.env.MNEMONIC) {
        console.log('Please set either your PRIVATE_KEY or MNEMONIC');
        process.exit(1);
    }
    if (!process.env.INFURA_API_KEY) {
        console.log('Please set your INFURA_API_KEY');
        process.exit(1);
    }
    return () => {
        return new HDWalletProvider(
            process.env.PRIVATE_KEY || process.env.MNEMONIC,
            `https://${network}.infura.io/` + process.env.INFURA_API_KEY
        );
    };
}

const kovanProvider = process.env.SOLIDITY_COVERAGE
    ? undefined
    : createProvider('kovan');

const rinkebyProvider = process.env.SOLIDITY_COVERAGE
    ? undefined
    : createProvider('rinkeby');

const mainnetProvider = process.env.SOLIDITY_COVERAGE
    ? undefined
    : createProvider('mainnet');

const ropstenProvider = process.env.SOLIDITY_COVERAGE
    ? undefined
    : createProvider('ropsten');

module.exports = {
    compilers: {
        solc: {
            version: '0.4.24',
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
            },
        },
    },
    mocha: {
        enableTimeouts: false,
        reporter: 'spec',
    },
    networks: {
        development: {
            host: '127.0.0.1',
            port: 8545,
            network_id: 1234, // eslint-disable-line camelcase
            gas: 0xfffffffffff,
            gasPrice: toHex(toWei('1', 'gwei')),
        },
        coverage: {
            host: '127.0.0.1',
            port: 8555,
            network_id: '*', // eslint-disable-line camelcase
            gas: 0xfffffffffff,
            gasPrice: toHex(toWei('1', 'gwei')),
        },
        kovan: {
            provider: kovanProvider,
            gas: 4700000,
            gasPrice: toHex(toWei('10', 'gwei')),
            network_id: '42',
        },
        mainnet: {
            provider: mainnetProvider,
            gas: 6000000,
            gasPrice: toHex(toWei('10', 'gwei')),
            network_id: '1',
        },
        rinkeby: {
            provider: rinkebyProvider,
            gas: 4700000,
            gasPrice: toHex(toWei('10', 'gwei')),
            network_id: '4',
        },
        ropsten: {
            provider: ropstenProvider,
            gas: 4700000,
            gasPrice: toHex(toWei('10', 'gwei')),
            network_id: '3',
        },
    },
};
