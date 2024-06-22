import { MarsCreditManagerClient } from '@/types/generated/mars-credit-manager/MarsCreditManager.client';
import { marsContracts } from '../../../config/osmosisData';
import { FundAccProps } from './types';

export const fundAccount = async ({
  client,
  address,
  tokens,
  setLoadingFund,
  notify,
}: FundAccProps) => {
  if (!tokens || !client) notify('Please fetch your tokens first!', 'error');

  setLoadingFund(true);
  const contractAddress = marsContracts.creditManager;
  const marsCreditManagerClient = new MarsCreditManagerClient(
    client,
    address || '',
    contractAddress
  );
  const funds = [{ denom: 'uosmo', amount: '100' }];

  try {
    const result = await marsCreditManagerClient.updateCreditAccount(
      {
        accountId: tokens.tokens[0],
        actions: [{ deposit: { denom: 'uosmo', amount: '100' } }],
      },
      'auto',
      undefined,
      funds
    );
    console.log('Fund result:', result);
    notify('Funding successful!', 'success');
  } catch (error) {
    console.error('Funding failed:', error);
    notify('Funding failed!', 'error');
  }
  setLoadingFund(false);
};
