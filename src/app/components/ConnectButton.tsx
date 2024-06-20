'use client';

import { useChain } from '@cosmos-kit/react';

const ConnectButton = ({ chainName }: { chainName: string }) => {
  const chainContext = useChain(chainName);

  const { username, address, connect, disconnect, openView } = chainContext;

  return (
    <nav className="bg-gray-800 border-gray-200 px-4 lg:px-6 py-2.5">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        {address ? (
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => openView()}
          >
            {username}
          </button>
        ) : (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={(e) => {
              e.preventDefault();
              connect();
            }}
          >
            {'Connect'}
          </button>
        )}
        {address && (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        )}
      </div>
    </nav>
  );
};

export default ConnectButton;
