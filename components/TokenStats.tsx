
import React from 'react';
import { TokenData, AIAnalysisResult } from '../types';

interface Props {
  data: TokenData;
  aiResult: AIAnalysisResult | null;
}

const TokenStats: React.FC<Props> = ({ data, aiResult }) => {
  const formatPrice = (priceStr: string) => {
    const price = parseFloat(priceStr);
    if (isNaN(price)) return priceStr;
    if (price >= 0.0001) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 6 })}`;

    const match = priceStr.match(/^0\.(0+)([1-9]\d*)/);
    if (match) {
      const zeros = match[1].length;
      const rest = match[2].slice(0, 4);
      return (
        <span className="flex items-baseline">
          $0.0<span className="text-[10px] text-indigo-400 font-black mx-0.5">({zeros})</span>{rest}
        </span>
      );
    }
    return `$${priceStr}`;
  };

  const formatValue = (val: number | undefined | null) => {
    if (val === undefined || val === null || isNaN(val)) return 'N/A';
    if (val === 0) return '$0';
    
    if (val >= 1000000000) return `$${(val / 1000000000).toFixed(2)}B`;
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(2)}K`;
    return `$${val.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  const formatNumber = (val: number | undefined | null) => {
    if (val === undefined || val === null || isNaN(val)) return 'N/A';
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toLocaleString();
  };

  const mc = data.marketCap || data.fdv || 0;
  const isFDV = !data.marketCap;
  const liq = data.liquidity?.usd || 0;
  const vol = data.volume.h24;

  const volMcRatio = mc > 0 ? (vol / mc) * 100 : 0;
  const liqMcRatio = mc > 0 ? (liq / mc) * 100 : 0;
  const liqTurnover = liq > 0 ? (vol / liq) * 100 : 0;

  const statItem = (label: string, value: React.ReactNode, subValue: string, isPositive?: boolean, isRatio?: boolean, explanation?: string) => (
    <div className="glass-card px-5 py-6 rounded-2xl border border-white/[0.05] hover:border-indigo-500/30 transition-all group flex flex-col justify-between min-h-[110px]">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-zinc-500 text-[9px] font-black uppercase tracking-widest flex items-center">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-1.5 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>
            {label}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-2 overflow-visible">
          <div className={`${isRatio ? 'text-2xl' : 'text-xl'} font-black font-mono tracking-tighter text-white whitespace-nowrap`}>
            {value}
          </div>
          <div className={`text-[10px] font-black font-mono flex items-center shrink-0 uppercase ${isPositive === undefined ? 'text-zinc-500' : isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive !== undefined && !isRatio && <i className={`fa-solid fa-caret-${isPositive ? 'up' : 'down'} mr-0.5`}></i>}
            {subValue}
          </div>
        </div>
      </div>
      {explanation && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-wider leading-tight">
            {explanation}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statItem("Current Price", formatPrice(data.priceUsd), `${data.priceChange.h24 > 0 ? '+' : ''}${data.priceChange.h24}%`, data.priceChange.h24 >= 0)}
        {statItem(isFDV ? "FDV (Est)" : "Market Cap", formatValue(mc), "")}
        {statItem("Liquidity", formatValue(liq), "Active", true)}
        {statItem("24h Volume", formatValue(vol), `${data.priceChange.h24}%`, data.priceChange.h24 >= 0)}
        {statItem("Holders", formatNumber(aiResult?.estimatedHolderCount), "Estimated", true)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statItem(
          "Vol/MC Ratio", 
          `${volMcRatio.toFixed(1)}%`, 
          volMcRatio > 20 ? "Active" : "Stable", 
          volMcRatio > 20, 
          true,
          "Trading intensity. >20% suggests strong momentum; lower indicates consolidation."
        )}
        {statItem(
          "Liq/MC Ratio", 
          `${liqMcRatio.toFixed(1)}%`, 
          liqMcRatio > 10 ? "Deep" : "Thin", 
          liqMcRatio > 10, 
          true,
          "Market depth. >10% is healthy; lower values increase slippage risk on exits."
        )}
        {statItem(
          "Turnover Rate", 
          `${liqTurnover.toFixed(1)}%`, 
          liqTurnover > 50 ? "Velocity" : "Healthy", 
          liqTurnover > 50, 
          true,
          "Capital efficiency. >50% indicates high velocity; shows how fast liquidity cycles."
        )}
      </div>
    </div>
  );
};

export default TokenStats;
