export interface Data {
  [key: string]: Coin;
}

export interface Coin {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  date_added: Date;
  last_updated: Date;
  quote: Quote;
}

export interface ErrorAxios {
  error_code: string;
  error_message: string;
}

export interface CoinMarketCapError {
  error_code: number;
  error_message: string;
}

export function isCoinMarketCapError(error: any): error is CoinMarketCapError {
  return (error as CoinMarketCapError).error_code !== undefined;
}

export interface Quote {
  [key: string]: QuoteData;
}

export interface QuoteData {
  price: number;
  last_updated: Date;
}

export interface CoinConvertion {
  id: number;
  symbol: string;
  name: string;
  amount: number;
  last_updated: Date;
  quote: Quote;
}
