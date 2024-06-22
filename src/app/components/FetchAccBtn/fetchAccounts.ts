import { MarsAccountNftQueryClient } from '@/types/generated/mars-account-nft/MarsAccountNft.client';
import { marsContracts } from '../../../config/osmosisData';
import { FetchAccountsProps } from './types';

export const fetchMintedAccounts = async ({
  client,
  address,
  setTokens,
  notify,
}: FetchAccountsProps) => {
  if (!client) return;

  const marsAccountNftClient = new MarsAccountNftQueryClient(
    client,
    marsContracts.accountNft
  );
  const tokens = await marsAccountNftClient.tokens({ owner: address || '' });
  setTokens(tokens);
  notify('Tokens fetched successfully!', 'success');
};
