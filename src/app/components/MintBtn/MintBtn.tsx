'use client';

import { useState } from 'react';
import Loader from '../Loader';
import { mintAccountNft } from './mintAccount';
import { getKeplrClient } from '@/actions/getKeplrClient';
import { MintBtnProps } from './types';

const MintButton = ({ address, notify }: MintBtnProps) => {
  const [loadingMint, setLoadingMint] = useState(false);

  const handleMint = async () => {
    const client = await getKeplrClient(address);

    setLoadingMint(true);
    await mintAccountNft({
      client,
      address,
      setLoadingMint,
      notify,
    });
    setLoadingMint(false);
  };

  return (
    <button
      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      onClick={handleMint}
    >
      {loadingMint ? <Loader /> : 'Mint'}
    </button>
  );
};

export default MintButton;
