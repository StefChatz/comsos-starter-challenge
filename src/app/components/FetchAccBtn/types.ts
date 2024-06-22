export interface FetchAccountsButtonProps {
  address: string;
  setTokens: (tokens: any) => void;
  notify: (message: string, type: 'success' | 'error') => void;
}

export interface FetchAccountsProps extends FetchAccountsButtonProps {
  client: any;
}
