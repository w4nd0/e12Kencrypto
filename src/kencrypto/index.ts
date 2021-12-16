import axios, { AxiosInstance } from "axios";
import {
  Data,
  Coin,
  CoinConvertion,
  Quote,
  QuoteData,
  CoinMarketCapError,
} from "../types";

export class Kencrypto {
  private _apiKey!: string;
  private baseURL: string = "https://pro-api.coinmarketcap.com/v1/";
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
    });
  }

  get apiKey() {
    return this._apiKey;
  }

  set apiKey(value: string) {
    this._apiKey = value;
  }

  async quotes(symbol: Array<string>) {
    if (!this.apiKey) {
      return {
        error_code: 400,
        error_message: "API key not configured",
      } as CoinMarketCapError;
    }
    const querySymbol: string = symbol.join(",");
    let resQuote: Data = {};

    try {
      await this.api
        .get(`/cryptocurrency/quotes/latest?symbol=${querySymbol}`, {
          headers: {
            "X-CMC_PRO_API_KEY": this._apiKey,
          },
        })
        .then((result) => {
          resQuote = result.data.data;
        });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return {
          error_code: e.response?.data.status.error_code,
          error_message: e.response?.data.status.error_message,
        } as CoinMarketCapError;
      }
    }

    Object.keys(resQuote).forEach((key): void => {
      const coin: Coin = resQuote[key];
      const { quote } = coin;
      const { USD } = quote;

      const responseUsd: QuoteData = {
        price: USD.price,
        last_updated: USD.last_updated,
      };

      const responseQuote: Quote = {
        USD: responseUsd,
      };

      const responseCoin: Coin = {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        slug: coin.slug,
        date_added: coin.date_added,
        last_updated: coin.last_updated,
        quote: responseQuote,
      };
      resQuote[key] = responseCoin;
    });

    return resQuote;
  }

  async conversion(symbol: string, amount: number, convert: Array<string>) {
    if (!this.apiKey) {
      return {
        error_code: 400,
        error_message: "API key not configured",
      } as CoinMarketCapError;
    }
    interface Data {
      status: object;
      data: CoinConvertion;
    }

    const queryConvert: string = convert.join(",");

    try {
      var { data }: Data = await this.api
        .get(
          `/tools/price-conversion?symbol=${symbol}&amount=${amount}&convert=${queryConvert}`,
          {
            headers: {
              "X-CMC_PRO_API_KEY": this._apiKey,
            },
          }
        )
        .then((res) => res.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return {
          error_code: e.response?.data.status.error_code,
          error_message: e.response?.data.status.error_message,
        } as CoinMarketCapError;
      }
    }
    return data;
  }
}
