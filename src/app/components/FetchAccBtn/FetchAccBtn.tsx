'use client';

import { useState } from 'react';
import { FetchAccountsButtonProps } from './types';
import { fetchMintedAccounts } from './fetchAccounts';
import { getKeplrClient } from '@/actions/getKeplrClient';

const FetchAccountsButton = ({
  address,
  setTokens,
  notify,
}: FetchAccountsButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    const client = await getKeplrClient(address);

    setLoading(true);
    await fetchMintedAccounts({ client, address, setTokens, notify });
    setLoading(false);
  };

  return (
    <button
      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      onClick={handleFetch}
    >
      {loading ? 'Loading...' : 'Fetch Minted Accounts'}
    </button>
  );
};

export default FetchAccountsButton;
