
export interface TokenData {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceUsd: string;
  priceNative: string;
  liquidity?: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv: number;
  marketCap?: number;
  pairCreatedAt?: number;
  info?: {
    imageUrl?: string;
    header?: string;
    openGraph?: string;
    websites?: Array<{ label: string; url: string }>;
    socials?: Array<{ type: string; url: string }>;
  };
  volume: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
}

export interface MarketDepth {
  buyWallStrength: number;
  sellWallStrength: number;
  slippageImpact1000USD: number;
  liquidityConcentration: 'High' | 'Medium' | 'Low';
  wallSummary: string;
}

export interface SecurityAudit {
  lpBurned: boolean;
  mintRevoked: boolean;
  freezeRevoked: boolean;
  topHoldersPercentage: number;
  isHoneypot: boolean;
  auditScore: number;
  auditSummary: string;
}

export interface BubbleMapAnalysis {
  clusterRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  hiddenConnectionsFound: boolean;
  summary: string;
  notableClusters: string[];
}

export interface AlphaTerminalData {
  viralVelocity: number; // 0-100
  insiderStealthScore: number; // 0-100
  smartMoneyInflow: number; // 0-100
  exitSignal: 'Strong Hold' | 'Take Profit' | 'Danger: Top' | 'Accumulate';
  topHoldersTrend: 'Increasing' | 'Stable' | 'Decreasing';
  narrativeAlignment: string;
}

export interface PricePrediction {
  dropProbability: number;
  bottomTargetPrice: string;
  recoveryProbability: number;
  recoveryTargetPrice: string;
  timeframe: string;
  dangerZoneReasoning: string;
}

export interface FibonacciLevels {
  level0: number;
  level236: number;
  level382: number;
  level500: number;
  level618: number;
  level786: number;
  level100: number;
}

export interface InvestmentStrategy {
  doubleUpScenario: {
    targetPrice: string;
    actionPlan: string;
    psychologicalTip: string;
  };
  halfDownScenario: {
    stopLossPrice: string;
    actionPlan: string;
    warningSignals: string[];
  };
}

export interface SocialIntelligence {
  developerX: {
    handle: string;
    joinedDate: string;
    followers: string;
    bio: string;
    pastProjects: string[];
    reputationScore: number;
    isVerifiedIdentity: boolean;
  };
  whalePulse: {
    whaleConcentration: number;
    smartMoneyInflow: 'Strong' | 'Neutral' | 'Outflow';
    recentLargeTransactions: string[];
  };
  kolSentiment: {
    topMentions: string[];
    influencerSupport: number;
    narrativeStrength: string;
  };
  trendingNarratives: string[];
}

export interface AIAnalysisResult {
  score: number;
  sentiment: 'Bullish' | 'Neutral' | 'Bearish' | 'Rekt';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
  summary: string;
  pvpIndex: number;
  communityHeat: number;
  holderQuality: 'Diamond' | 'Neutral' | 'Paper';
  pros: string[];
  cons: string[];
  tokenCharacteristics: string[];
  estimatedHolderCount: number;
  prediction: PricePrediction;
  fibonacci: FibonacciLevels;
  marketDepth: MarketDepth;
  smartMoneySignal: string;
  socialIntelligence: SocialIntelligence;
  securityAudit: SecurityAudit;
  investmentStrategy: InvestmentStrategy;
  bubbleMapAnalysis: BubbleMapAnalysis;
  alphaTerminal: AlphaTerminalData;
  sources?: Array<{ title: string; url: string }>;
}
