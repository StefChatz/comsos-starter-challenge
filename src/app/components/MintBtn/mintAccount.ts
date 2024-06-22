import { MarsCreditManagerClient } from '@/types/generated/mars-credit-manager/MarsCreditManager.client';
import { marsContracts } from '../../../config/osmosisData';
import { MintAccNftProps } from './types';

export const mintAccountNft = async ({
  client,
  address,
  setLoadingMint,
  notify,
}: MintAccNftProps) => {
  if (!client) return;

  setLoadingMint(true);
  const contractAddress = marsContracts.creditManager;
  const marsCreditManagerClient = new MarsCreditManagerClient(
    client,
    address || '',
    contractAddress
  );

  try {
    const result = await marsCreditManagerClient.createCreditAccount(
      'default',
      undefined,
      'MPv2'
    );
    console.log('Mint result:', result);
    notify('Mint successful!', 'success');
  } catch (error) {
    console.error('Minting failed:', error);
    notify('Mint failed!', 'error');
  }
  setLoadingMint(false);
};
