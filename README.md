<p align="center"><img src="https://i.imgur.com/BaalNC8.jpg" width="280px"/></p>

<p align="center"> AZTEC is an efficient zero-knowledge privacy protocol and decentralised exchange. The protocol powers real world financial applications on Ethereum mainnet today. A complete explanation of AZTEC can be found in our <a href="https://github.com/AztecProtocol/AZTEC/blob/master/AZTEC.pdf">white paper</a>.</p>

<p align="center">
 <a href="https://circleci.com/gh/AztecProtocol/AZTEC">
    <img src="https://circleci.com/gh/AztecProtocol/AZTEC.svg?style=svg&circle-token=bb8aa4415af9d373eab3ee130a284e0c4874f65c" alt="CircleCI"/>
  </a>
  <a href="https://lernajs.io/">
    <img src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg" alt="Lerna"/>
  </a>
  <a href="https://telegram.com">
    <img src="https://img.shields.io/badge/chat-telegram-0088cc.svg?style=flat" alt="Telegram"/>
  </a>
  <a href="https://www.gnu.org/licenses/lgpl-3.0">
    <img src="https://img.shields.io/badge/License-LGPL%20v3-008033.svg" alt="License: LGPL v3">
  </a>
</p>

---

## Warning :rotating_light:

This is a proof of concept. The trusted setup was generated by our team internally. We will be releasing more information about the [production trusted setup](https://github.com/AztecProtocol/AZTEC#the-trusted-setup) generation in the near future. Use at own risk.

## Packages :package:

AZTEC is maintained as a monorepo with multiple sub packages. Please find a comprehensive list below.

### JavaScript Packages

| Package                                                     | Version                                                                                                                      | Description                                                                                       |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [`aztec.js`](/packages/aztec.js)                            | [![npm](https://img.shields.io/npm/v/aztec.js.svg)](https://www.npmjs.com/package/aztec.js)                                  | An aggregate package combining many smaller utility packages for interacting with the AZTEC Protocol |
| [`@aztec/artifacts`](/packages/artifacts) | [![npm](https://img.shields.io/npm/v/@aztec/artifacts.svg)](https://www.npmjs.com/package/@aztec/contract-artifacts)                           | Aztec smart contract compiled artifacts                                                           |
| [`@aztec/contract-addresses`](/packages/contract-addresses) | [![npm](https://img.shields.io/npm/v/@aztec/contract-addresses.svg)](https://www.npmjs.com/package/@aztec/contract-addresses)| A tiny utility library for getting known deployed contract addresses for a particular network.    |

### Private Packages

| Package                                            | Description                                                                      |
| -------------------------------------------------- | -------------------------------------------------------------------------------- |
| [`@aztec/demo`](/packages/demo)                    | Demo of AZTEC written in javascript                                              |
| [`@aztec/protocol`](/packages/protocol)            | AZTEC Protocol solidity smart contracts & tests                                  |

## Usage :hammer_and_pick:

Clone this repo and install all the dependencies:

```bash
$ npm run bootstrap
```

To fiddle only with our cryptography engine and create your own AZTEC notes:

```bash
$ npm install aztec.js --save
```

To integrate our deployed contracts' ABI and addresses:

```bash
$ npm install @aztec/contract-artifacts @aztec/contract-addresses --save
```

To see a demo on the Rinkeby testnet:

```bash
git clone git@github.com:AztecProtocol/AZTEC.git
cd AZTEC/packages/demo
```

Now, make sure you use your own private keys instead of the defaults in `accounts.json`. Then:

```bash
npm install
npm run demo:rinkeby
```

For more information, check out our [documentation](https://aztecprotocol.github.io/AZTEC/).

## Contributing :raising_hand_woman:

### Requirements

- node ^4.0.0 and npm^2.14.2
- solidity 0.4.24

### Pre Requisites

```bash
$ npm install lerna@^3.10.6 --global
$ npm install truffle@^5.0.0 --global
```

### Build

To install the node modules in all packages:

```bash
$ lerna exec -- npm install
```

To build all packages:

```bash
$ lerna run build
```

To build a specific package:

```bash
$ lerna run build --scope aztec.js
```

### Clean

To clean all packages:

```bash
$ lerna run clean
```

To clean a specific package:

```bash
$ lerna run clean --scope aztec.js
```

### Lint

To lint all packages:

```bash
$ lerna run lint
```

To lint a specific package:

```bash
$ lerna run lint --scope aztec.js
```

### Test

To run all tests:

```bash
$ lerna run test
```

To run tests in a specific package:

```bash
$ lerna run test --scope aztec.js
```

## FAQ :question:

### What is the AZTEC Protocol?

The protocol enables transactions of value, where the *values* of the transaction are encrypted. The AZTEC protocol smart contract validator, ```AZTEC.sol```, validates a unique zero-knowledge proof that determines the legitimacy of a transaction via a combination of **homomorphic encryption** and **range proofs**.

### What is encrypted 'value'?

Instead of balances, the protocol uses AZTEC **notes**. A note encrypts a number that represents a value (for example a number of ERC-20 tokens). Each note has an owner, defined via an Ethereum address. In order to *spend* a note the owner must provide a valid ECDSA signature attesting to this.

### What does this enable?

#### Confidential representations of ERC20-tokens

The AZTEC protocol can enable confidential transactions for *any* generic digital asset on Ethereum, including *existing* assets. [For our proof of concept implementation of the AZTEC protocol](https://etherscan.io/address/0xcf65A4e884373Ad12cd91c8C868F1DE9DA48501F), we attached an AZTEC token to MakerDAO's DAI token. This smart contract can be used to convert DAI from its public ERC-20 form into a confidential AZTEC note form.

#### Fully confidential digital assets

The AZTEC protocol can be utilized as a stand-alone confidential token, with value transfers described entirely through AZTEC **join-split** transactions

#### Decentralized Confidential Exchanges

The AZTEC protocol and its decentralized exchange protocol extension (coming soon) can be used to trade AZTEC assets in complete confidentiality, without having to expose the values or prices of any trade.

### How much gas do these transactions cost?

The gas costs scale with the number of input and output notes in a **join-split** transaction. For a fully confidential transfer, with 2 input notes and 2 output notes, the gas cost is approximately 900,000 gas. [Planned EIP improvements](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1108.md) will reduce the cost of these transactions dramatically, to approximately 200,000 - 300,000 gas.

### Where can I see this in action?

The AZTEC protocol is live today on the Ethereum main-net. [Our proof of concept contract](https://etherscan.io/address/0xcf65A4e884373Ad12cd91c8C868F1DE9DA48501F) converts DAI into AZTEC note form and is live on the Ethereum main-net. [Here is an example AZTEC join-split transaction](https://etherscan.io/tx/0x6cb6bccb6d51445ce026dd76b8526e8014a6a276255d22e4f5be26f8efb891fb).

### What is the future of the AZTEC protocol?

AZTEC will provide efficient and easy to use transaction privacy to the next generation of digital asset builders. We will be releasing the following information, open source technology and protocol upgrades over the coming months:

1. Release the full AZTEC token standard, with associated API tools to construct confidential transactions
2. Release our multiparty computation trusted setup protocol and register participants
3. Release the formal specification for the AZTEC decentralized exchange and example smart contracts
4. Release API tools to use the AZTEC decentralized exchange

### Range proofs you say? How does that work?

Read the AZTEC paper [here](https://github.com/AztecProtocol/AZTEC/blob/master/AZTEC.pdf). The unique AZTEC commitment function enables the efficient construction and verification of range proofs. The protocol requires a trusted setup protocol, that generates a dataset that is required to construct AZTEC zero-knowledge proofs

#### The Trusted Setup

Our proof of concept uses a trusted setup generated by our team internally. Whilst we would like to think you can trust us implicitly, we have developed a method of performing the trusted setup via multiparty computation. Each participant generates a piece of *toxic waste* that must be destroyed. Only *one* participant must destroy their toxic waste for the protocol to be secure and the trusted setup process can scale indefinitely. We will be releasing our full specification for the trusted setup protocol shortly.

### Are AZTEC transactions anonymous as well as confidential?

The AZTEC protocol supports a stealth address protocol that can be used to obfuscate the link between a note 'owner' and any on-chain identity.  
  
### This sounds interesting! How can I get involved?  

Anybody wishing to become early members of the AZTEC network please get in touch at hello@aztecprotocol.com
