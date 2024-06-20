'use client';

import React, { useState } from 'react';
import { useChain } from '@cosmos-kit/react';
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import {
  marsContracts,
  RPC,
  osmosisMainnetConfig,
} from '../../../public/osmosisData';
import { MarsCreditManagerClient } from '@/types/generated/mars-credit-manager/MarsCreditManager.client';
import { GasPrice } from '@cosmjs/stargate';
import Loader from './Loader';
import { MarsAccountNftQueryClient } from '@/types/generated/mars-account-nft/MarsAccountNft.client';
import { TokensResponse } from '@/types/generated/mars-account-nft/MarsAccountNft.types';

const MainContent = () => {
  const chainContext = useChain('osmosis');
  const [loadingMint, setLoadingMint] = useState(false);
  const [loadingFund, setLoadingFund] = useState(false);
  const [mintSuccess, setMintSuccess] = useState<string | null>(null);
  const [fundSuccess, setFundSuccess] = useState<string | null>(null);
  const [tokens, setTokens] = useState<TokensResponse>();

  const { address } = chainContext;

  const mintAccountNft = async () => {
    if (!address) {
      alert('Please connect to Keplr wallet first.');
      return;
    }
    const keplr = await getKeplrFromWindow();
    if (!keplr) {
      alert('Keplr extension not found.');
      return;
    }
    await keplr.enable(osmosisMainnetConfig.id);
    const offlineSigner = keplr.getOfflineSigner(osmosisMainnetConfig.id);

    const client = await SigningCosmWasmClient.connectWithSigner(
      RPC,
      offlineSigner,
      { gasPrice: GasPrice.fromString('1uosmo') }
    );

    setLoadingMint(true);
    const contractAddress = marsContracts.creditManager;
    const marsCreditManagerClient = new MarsCreditManagerClient(
      client,
      address || '',
      contractAddress
    );

    try {
      await marsCreditManagerClient
        .createCreditAccount('default', undefined, 'MPv2')
        .then((result) => {
          console.log('Mint result:', result);
          setMintSuccess('Mint successful!');
        });
    } catch (error) {
      console.error('Minting failed:', error);
      setMintSuccess('Minting failed!');
    }
    setLoadingMint(false);
  };

  const fetchMintedAccounts = async () => {
    if (!address) {
      alert('Please connect to Keplr wallet first.');
      return;
    }
    const keplr = await getKeplrFromWindow();
    if (!keplr) {
      alert('Keplr extension not found.');
      return;
    }
    await keplr.enable(osmosisMainnetConfig.id);
    const offlineSigner = keplr.getOfflineSigner(osmosisMainnetConfig.id);
    const signingClient = await SigningCosmWasmClient.connectWithSigner(
      RPC,
      offlineSigner,
      { gasPrice: GasPrice.fromString('0.1uosmo') }
    );

    const marsAccountNftClient = new MarsAccountNftQueryClient(
      signingClient,
      marsContracts.accountNft
    );

    const tokens = await marsAccountNftClient.tokens({ owner: address });
    setTokens(tokens);
  };

  const fundAccount = async () => {
    if (!address) {
      alert('Please connect to Keplr wallet first.');
      return;
    }
    if (!tokens) {
      fetchMintedAccounts();
      return;
    }

    const keplr = await getKeplrFromWindow();
    if (!keplr) {
      alert('Keplr extension not found.');
      return;
    }
    await keplr.enable(osmosisMainnetConfig.id);
    const offlineSigner = keplr.getOfflineSigner(osmosisMainnetConfig.id);

    const client = await SigningCosmWasmClient.connectWithSigner(
      RPC,
      offlineSigner,
      { gasPrice: GasPrice.fromString('0.1uosmo') }
    );

    setLoadingFund(true);
    const contractAddress = marsContracts.creditManager;
    const marsCreditManagerClient = new MarsCreditManagerClient(
      client,
      address || '',
      contractAddress
    );
    const funds = [
      {
        denom: 'uosmo',
        amount: '100',
      },
    ];

    try {
      await marsCreditManagerClient
        .updateCreditAccount(
          {
            accountId: tokens?.tokens[0],
            actions: [
              {
                deposit: {
                  denom: 'uosmo',
                  amount: '100',
                },
              },
            ],
          },
          'auto',
          undefined,
          funds
        )
        .then((result) => {
          console.log('Mint result:', result);
          setFundSuccess('Funding successful!');
        });
      setLoadingFund(false);
    } catch (error) {
      console.error('Minting failed:', error);
      setFundSuccess('Funding failed!');
      setLoadingFund(false);
    }
  };

  return (
    <section>
      {address && (
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="flex flex-row gap-2 items-center justify-center">
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => mintAccountNft()}
            >
              {loadingMint ? <Loader /> : 'Mint'}
            </button>
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => fetchMintedAccounts()}
            >
              Fetch Minted Accounts
            </button>
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => fundAccount()}
            >
              {loadingFund ? <Loader /> : 'Fund Account'}
            </button>
          </div>
          {mintSuccess && (
            <h1
              className={`text-2xl font-bold ${mintSuccess.includes('failed') ? 'text-red-500' : 'text-green-500'}`}
            >
              {mintSuccess}
            </h1>
          )}
          {fundSuccess && (
            <h1
              className={`text-2xl font-bold ${fundSuccess.includes('failed') ? 'text-red-500' : 'text-green-500'}`}
            >
              {fundSuccess}
            </h1>
          )}
          {tokens && (
            <div className="flex flex-col gap-2 items-center justify-center">
              <h1 className="text-2xl font-bold">Minted Accounts:</h1>
              {tokens.tokens.map((account) => (
                <h2 className="text-xl font-bold">{account}</h2>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default MainContent;
