export type BackendFluPrediction = {
  last_month_prediction: number;
  recent_prediction: number;
};

export type BackendUserSearchPrediction = {
  prediction: number;
};

export type BackUserSearchPredictionRequest = {
  twitter_name: string;
};
