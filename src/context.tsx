import { createContext } from "@hydrophobefireman/ui-lib";

export interface FetchCtx {
  fetcher(): any;
  setFetcher(f: () => any): void;
}
export const FetchContext = createContext<FetchCtx>(null);
