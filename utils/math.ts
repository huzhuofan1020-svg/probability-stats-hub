import { DistributionData, BinomialStats } from '../types';

export const calculateBinomialDistribution = (n: number, p: number): { data: DistributionData[], stats: BinomialStats } => {
  const data: DistributionData[] = [];
  const targetVal = (n + 1) * p;
  
  // Optimized probability calculation using recursive relation:
  // P(k) = P(k-1) * ((n - k + 1) / k) * (p / (1 - p))
  // This is O(n) instead of O(n^2) and numerically more stable than calculating large factorials.
  
  const probs: number[] = new Array(n + 1).fill(0);
  
  // Handle edge cases
  if (p === 0) {
    probs[0] = 1;
  } else if (p === 1) {
    probs[n] = 1;
  } else {
    // Base case: P(0) = (1-p)^n
    probs[0] = Math.pow(1 - p, n);
    
    // Recursive step
    const ratio = p / (1 - p);
    for (let k = 1; k <= n; k++) {
      probs[k] = probs[k - 1] * ((n - k + 1) / k) * ratio;
    }
  }

  // Determine Mode with float precision tolerance
  // If (n+1)p is integer, modes are m-1 and m.
  // using a small epsilon for float comparison logic
  let mode: number | number[];
  const isIntegerTarget = Math.abs(targetVal - Math.round(targetVal)) < 1e-9;

  if (isIntegerTarget) {
    const val = Math.round(targetVal);
    mode = [val - 1, val];
  } else {
    mode = Math.floor(targetVal);
  }

  for (let k = 0; k <= n; k++) {
    const prob = probs[k];
    let type: 'growth' | 'peak' | 'decline' = 'decline';
    
    if (Array.isArray(mode)) {
      if (mode.includes(k)) type = 'peak';
      else if (k < mode[0]) type = 'growth';
    } else {
      if (k === mode) type = 'peak';
      else if (k < targetVal) type = 'growth';
    }

    data.push({ k, prob, type });
  }

  return {
    data,
    stats: {
      mean: n * p,
      variance: n * p * (1 - p),
      mode,
      targetVal
    }
  };
};