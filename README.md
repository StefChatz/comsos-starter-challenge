# Cosmos Starter Challenge

## Getting Started

First, install all dependencies and run the development server:

```bash
yarn install
# after the installation is finished, run the development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Style the app as you see fit. There is no requirement to make it look a specific way.

## The Base Layer

This repository was created to provide a base layer for the challenges listed below.

The following technologies come into play

- [Next.js 14](https://nextjs.org/) as the React Framework
- [Typescript](https://www.typescriptlang.org/) for typings
- [Tailwind CSS](https://tailwindcss.com/) as CSS Framework
- [ES Lint](https://eslint.org/) as the linter

### The Challenge

1. **Wallet Connector**\
   Set up a wallet connector using the [cosmos-kit](https://github.com/cosmology-tech/cosmos-kit) from Cosmology.\
   Make sure to connect the wallet provider to the `osmosis-1` blockchain and display a connect button.
   To establish a connection, enable at least the [Keplr Wallet](https://keplr.app).
2. **Mint a Credit Account**\
   After the user is connected via a web3 Cosmos Wallet extension (like Keplr), show a `Mint Credit Account` button that executes a `create_credit_account` (with the `default` type) message to the [Mars Protocol Credit Manager contract](https://celatone.osmosis.zone/osmosis-1/execute?contract=osmo1f2m24wktq0sw3c0lexlg7fv4kngwyttvzws3a3r3al9ld2s2pvds87jqvf&msg=ewogICJjcmVhdGVfY3JlZGl0X2FjY291bnQiOiB7fQp9).\
    For clients and queries, please check the generated types in the projects `src/types/generated` folder.
3. **Fetch Mars Credit Accounts**\
   Fetch the credit accounts the wallet has minted on the [Osmosis Outpost of the Mars Protocol](https://osmosis.marsprotocol.io) via the `tokens` query.

   ```
   {
    "tokens": {
        "owner": "WALLET_ADDRESS"
        }
    }

   ```

4. **BONUS: Fund Credit Account**\
   _After completing steps 2 and 3, you learned how to execute messages and query contracts on the Cosmos blockchain._\
   The next step would be to fund a minted credit account, owned by the connected wallet. For this, you need to use the `update_credit_account` message of the [Mars Protocol Credit Manager Contract](https://celatone.osmosis.zone/osmosis-1/execute?contract=osmo1f2m24wktq0sw3c0lexlg7fv4kngwyttvzws3a3r3al9ld2s2pvds87jqvf&msg=ewogICJ1cGRhdGVfY3JlZGl0X2FjY291bnQiOiB7fQp9).

   ```
    {
        "update_credit_account": {
            "account_id": "ACCOUNT_ID",
            "actions": [
                {
                    "deposit": {
                    "denom": "uosmo",
                    "amount": "1000000"
                    }
                }
            ]
        }
    }
   ```

5. **BONUS: Display Credit Account Positions**\
   To test if you mastered the art of fetching contracts on a Cosmos blockchain, try to display the positions of the credit accounts of the connected wallet.

### Config

Here are some configs, that will help to achieve your goal:

```
/* OSMOSIS NODE ENDPOINTS */

RPC=https://rpc-osmosis.blockapsis.com
REST=https://lcd-osmosis.blockapsis.com



/* MARS PROTOCOL CONTRACTS */

{
  contracts: {
    accountNft: 'osmo1450hrg6dv2l58c0rvdwx8ec2a0r6dd50hn4frk370tpvqjhy8khqw7sw09',
    creditManager: 'osmo1f2m24wktq0sw3c0lexlg7fv4kngwyttvzws3a3r3al9ld2s2pvds87jqvf',
    redBank: 'osmo1c3ljch9dfw5kf52nfwpxd2zmj2ese7agnx0p9tenkrryasrle5sqf3ftpg',
  }
}



/* OSMOSIS MAINNET CONFIG */

{
  id: 'osmosis-1',
  name: 'Osmosis Mainnet',
  defaultCurrency: {
    coinDenom: 'OSMO',
    coinMinimalDenom: 'uosmo',
    coinDecimals: 6,
    coinGeckoId: 'osmosis',
    gasPriceStep: {
      low: 0.0025,
      average: 0.025,
      high: 0.04,
    },
  },
  gasPrice: '0.0035uosmo',
}

```

### Repositories to look at

These Repositories can help you find implementation examples if you get stuck:

- [Cosmology Create Cosmos App](https://github.com/cosmology-tech/create-cosmos-app)
- [Mars Protocol Outpost](https://github.com/mars-protocol/mars-v2-frontend)
