'use client';

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useChain } from '@cosmos-kit/react';
import { TokensResponse } from '@/types/generated/mars-account-nft/MarsAccountNft.types';
import MintButton from './MintBtn';
import FetchAccountsButton from './FetchAccBtn';
import FundButton from './FundBtn';
import 'react-toastify/dist/ReactToastify.css';

const MainContent = () => {
  const chainContext = useChain('osmosis');
  const [tokens, setTokens] = useState<TokensResponse>();

  const { address } = chainContext;

  const notify = (message: string, type: 'success' | 'error') =>
    toast(message, { type });

  return (
    <section>
      {address && (
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="flex flex-row gap-2 items-center justify-center">
            <MintButton address={address} notify={notify} />
            <FetchAccountsButton
              address={address}
              setTokens={setTokens}
              notify={notify}
            />
            <FundButton address={address} tokens={tokens} notify={notify} />
          </div>
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
      <ToastContainer />
    </section>
  );
};

export default MainContent;
