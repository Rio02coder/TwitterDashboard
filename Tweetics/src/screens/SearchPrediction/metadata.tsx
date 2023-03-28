import React, {createContext} from 'react';

export type SearchFluContext = {
  text: string;
  setText: (newText: string) => void;
  prediction?: number;
  setPrediction: (pred?: number) => void;
  onSearchAction: () => void;
  canClear: boolean;
  onClear: () => void;
};

export const searchFluContext = createContext<SearchFluContext>({
  text: '',
  setText: (newText: string) => {},
  prediction: undefined,
  setPrediction: (pred?: number) => {},
  onSearchAction: () => {},
  canClear: false,
  onClear: () => {},
});
