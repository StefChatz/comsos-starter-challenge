export interface MintBtnProps {
  address: string;
  notify: (message: string, type: 'success' | 'error') => void;
}

export interface MintAccNftProps extends MintBtnProps {
  client: any;
  setLoadingMint: (loading: boolean) => void;
}
