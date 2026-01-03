
import React, { useMemo } from 'react';
import { TokenData } from '../types';

interface Props {
  data: TokenData;
  lang: 'en' | 'ja';
}

const TokenStats: React.FC<Props> = ({ data, lang }) => {
  const t = useMemo(() => {
    return lang === 'ja' ? {
      price: "現在価格",
      mc: "時価総額",
      liq: "流動性",
      vol: "24h 出来高",
      active: "Active",
      fdv: "FDV",
      ratio: "Vol/MC 比率",
      ratioDesc: "時価総額に対する取引高の割合。活発さの指標。",
      liqRatio: "流動性/MC比率",
      liqRatioDesc: "時価総額に対する流動性の深さ。10%以上が安全圏。",
      turnover: "取引回転率",
      turnoverDesc: "流動性に対する取引高。資金効率の指標。",
      change: "24h"
    } : {
      price: "Price",
      mc: "Market Cap",
      liq: "Liquidity",
      vol: "24h Volume",
      active: "Active",
      fdv: "FDV",
      ratio: "Vol/MC",
      ratioDesc: "Volume relative to Market Cap. Interest indicator.",
      liqRatio: "Liq/MC",
      liqRatioDesc: "Depth relative to MC. >10% is healthy.",
      turnover: "Turnover",
      turnoverDesc: "Volume relative to total liquidity.",
      change: "24h"
    };
  }, [lang]);

  // フォーマット関数: 0.00001 -> 0.0(4)1
  const formatPrice = (priceStr: string) => {
    const price = parseFloat(priceStr);
    if (isNaN(price)) return priceStr;
    if (price >= 0.0001) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 6 })}`;

    // 小数点以下のゼロの連続をカウント
    const match = priceStr.match(/^0\.(0+)([1-9]\d*)/);
    if (match) {
      const zeros = match[1].length;
      const rest = match[2].slice(0, 4); // 視認性のため4桁まで
      return (
        <span className="flex items-baseline">
          $0.0<span className="text-[10px] text-purple-400 font-black mx-0.5">({zeros})</span>{rest}
        </span>
      );
    }
    return `$${priceStr}`;
  };

  const formatValue = (val: number | undefined) => {
    if (val === undefined) return 'N/A';
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(2)}K`;
    return `$${val.toFixed(2)}`;
  };

  const mc = data.marketCap || data.fdv;
  const liq = data.liquidity?.usd || 0;
  const vol = data.volume.h24;

  const volMcRatio = (vol / mc) * 100;
  const liqMcRatio = (liq / mc) * 100;
  const liqTurnover = (vol / liq) * 100;

  const statItem = (label: string, value: React.ReactNode, subValue: string, isPositive?: boolean, desc?: string, isRatio?: boolean) => (
    <div className="glass-card px-3 py-2.5 rounded-2xl border border-white/[0.05] hover:border-purple-500/30 transition-all group flex flex-col justify-center min-h-[60px]">
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-zinc-500 text-[7px] font-black uppercase tracking-widest flex items-center">
          <span className="w-1 h-1 bg-purple-500 rounded-full mr-1 shadow-[0_0_5px_rgba(168,85,247,0.5)]"></span>
          {label}
        </span>
        {desc && (
          <div className="relative group/tooltip">
             <i className="fa-solid fa-circle-info text-zinc-800 text-[7px] cursor-help"></i>
             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 md:w-40 p-2 bg-zinc-900 border border-white/10 rounded-lg text-[8px] text-zinc-400 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-20 normal-case tracking-normal shadow-2xl text-center whitespace-normal">
                {desc}
             </div>
          </div>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-1 overflow-hidden">
        <div className={`${isRatio ? 'text-sm' : 'text-base'} font-black font-mono tracking-tighter text-white truncate shrink`}>
          {value}
        </div>
        <div className={`text-[7.5px] font-black font-mono flex items-center shrink-0 uppercase ${isPositive === undefined ? 'text-zinc-500' : isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive !== undefined && isRatio === undefined && <i className={`fa-solid fa-caret-${isPositive ? 'up' : 'down'} mr-0.5`}></i>}
          {subValue}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-2.5">
      {/* Main Stats: 4 Columns */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {statItem(
          t.price, 
          formatPrice(data.priceUsd), 
          `${data.priceChange.h24 > 0 ? '+' : ''}${data.priceChange.h24}%`, 
          data.priceChange.h24 >= 0
        )}
        {statItem(
          t.mc, 
          formatValue(mc), 
          `FDV:${formatValue(data.fdv)}`
        )}
        {statItem(
          t.liq, 
          formatValue(liq), 
          t.active,
          true
        )}
        {statItem(
          t.vol, 
          formatValue(vol), 
          `${data.priceChange.h24}%`,
          data.priceChange.h24 >= 0
        )}
      </div>

      {/* Ratios: 3 Columns */}
      <div className="grid grid-cols-3 gap-2.5">
        {statItem(
          t.ratio,
          `${volMcRatio.toFixed(1)}%`,
          volMcRatio > 20 ? "Active" : "Neutral",
          volMcRatio > 20,
          t.ratioDesc,
          true
        )}
        {statItem(
          t.liqRatio,
          `${liqMcRatio.toFixed(1)}%`,
          liqMcRatio > 10 ? "Safe" : "Low",
          liqMcRatio > 10,
          t.liqRatioDesc,
          true
        )}
        {statItem(
          t.turnover,
          `${liqTurnover.toFixed(1)}%`,
          liqTurnover > 50 ? "High" : "Mid",
          liqTurnover > 50,
          t.turnoverDesc,
          true
        )}
      </div>
    </div>
  );
};

export default TokenStats;
