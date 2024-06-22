export interface FundBtnProps {
  address: string;
  tokens: any;
  notify: (message: string, type: 'success' | 'error') => void;
}

export interface FundAccProps extends FundBtnProps {
  client: any;
  setLoadingFund: (loading: boolean) => void;
}
