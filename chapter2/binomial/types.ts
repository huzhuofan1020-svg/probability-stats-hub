export interface DistributionData {
  k: number;
  prob: number;
  type: 'growth' | 'peak' | 'decline';
}

export interface BinomialStats {
  mean: number;
  variance: number;
  mode: number | number[]; // Can be single number or array of two for bimodal
  targetVal: number; // (n+1)p
}