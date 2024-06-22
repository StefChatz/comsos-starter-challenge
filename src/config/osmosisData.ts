/* OSMOSIS NODE ENDPOINTS */

const RPC: string = 'https://osmosis-rpc.cosmos-apis.com/';
const REST: string = 'https://lcd-osmosis.blockapsis.com';

/* MARS PROTOCOL CONTRACTS */

const marsContracts = {
  accountNft: 'osmo1450hrg6dv2l58c0rvdwx8ec2a0r6dd50hn4frk370tpvqjhy8khqw7sw09',
  creditManager:
    'osmo1f2m24wktq0sw3c0lexlg7fv4kngwyttvzws3a3r3al9ld2s2pvds87jqvf',
  redBank: 'osmo1c3ljch9dfw5kf52nfwpxd2zmj2ese7agnx0p9tenkrryasrle5sqf3ftpg',
};

/* OSMOSIS MAINNET CONFIG */

const osmosisMainnetConfig = {
  id: 'osmosis-1',
  name: 'Osmosis Mainnet',
  defaultCurrency: {
    coinDenom: 'OSMO',
    coinMinimalDenom: 'uosmo',
    coinDecimals: 6,
    coinGeckoId: 'osmosis',
    gasPriceStep: {
      low: 0.0025,
      average: 0.025,
      high: 0.04,
    },
  },
  gasPrice: '0.0035uosmo',
};

export { RPC, REST, marsContracts, osmosisMainnetConfig };
