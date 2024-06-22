'use client';

import { useState } from 'react';
import Loader from '../Loader';
import { FundBtnProps } from './types';
import { getKeplrClient } from '@/actions/getKeplrClient';
import { fundAccount } from './fundAccount';

const FundButton = ({ address, tokens, notify }: FundBtnProps) => {
  const [loadingFund, setLoadingFund] = useState(false);

  const handleFund = async () => {
    const client = await getKeplrClient(address);
    setLoadingFund(true);
    await fundAccount({
      client,
      address,
      tokens,
      setLoadingFund,
      notify,
    });
    setLoadingFund(false);
  };

  return (
    <button
      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      onClick={handleFund}
    >
      {loadingFund ? <Loader /> : 'Fund Account'}
    </button>
  );
};

export default FundButton;
