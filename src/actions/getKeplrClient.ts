import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';
import { RPC, osmosisMainnetConfig } from '../config/osmosisData';

export const getKeplrClient = async (address: string) => {
  if (!address) {
    alert('Please connect to Keplr wallet first.');
    return null;
  }

  const keplr = await getKeplrFromWindow();
  if (!keplr) {
    alert('Keplr extension not found.');
    return null;
  }

  await keplr.enable(osmosisMainnetConfig.id);
  const offlineSigner = keplr.getOfflineSigner(osmosisMainnetConfig.id);

  return SigningCosmWasmClient.connectWithSigner(RPC, offlineSigner, {
    gasPrice: GasPrice.fromString('0.1uosmo'),
  });
};
