'use client';

import '@interchain-ui/react/styles';
import { ChainProvider } from '@cosmos-kit/react';
import { chains, assets } from 'chain-registry';
import { wallets } from '@cosmos-kit/keplr';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ConnectButton from './components/ConnectButton';

const queryClient = new QueryClient();

const MarsProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ChainProvider chains={chains} wallets={wallets} assetLists={assets}>
          <ConnectButton chainName={'osmosis'} />
          {children}
        </ChainProvider>
      </QueryClientProvider>
    </div>
  );
};

export default MarsProvider;
