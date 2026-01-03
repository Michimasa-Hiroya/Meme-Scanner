
import { TokenData } from '../types';

export const fetchTokenData = async (contractAddress: string): Promise<TokenData | null> => {
  try {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`);
    const data = await response.json();
    
    if (data.pairs && data.pairs.length > 0) {
      // Find the best pair (usually the one with highest liquidity or Raydium/Orca)
      const solanaPairs = data.pairs.filter((p: any) => p.chainId === 'solana');
      return solanaPairs.sort((a: any, b: any) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0))[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching DexScreener data:', error);
    return null;
  }
};
