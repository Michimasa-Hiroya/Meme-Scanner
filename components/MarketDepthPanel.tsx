
import React, { useMemo } from 'react';
import { MarketDepth } from '../types';

interface Props {
  depth: MarketDepth;
  lang: 'en' | 'ja';
}

const MarketDepthPanel: React.FC<Props> = ({ depth, lang }) => {
  const t = useMemo(() => {
    return lang === 'ja' ? {
      title: "マーケット・デプス解析",
      sub: "買い板 vs 売り板の圧力推計",
      buyWall: "買い板",
      sellWall: "売り板",
      slippage: "$1,000あたりのスリッページ",
      concentration: "流動性の集中度",
      summary: "板の状況サマリー",
      impactDesc: "値が低いほど流動性が高く、大口の取引でも価格が安定します。",
      levels: {
        High: "極めて高い",
        Medium: "平均的",
        Low: "薄い（危険）"
      }
    } : {
      title: "Market Depth Analysis",
      sub: "Estimated Buy vs Sell Pressure",
      buyWall: "Buy Wall",
      sellWall: "Sell Wall",
      slippage: "Slippage per $1,000",
      concentration: "Liquidity Concentration",
      summary: "Depth Summary",
      impactDesc: "Lower values mean deeper liquidity and higher price stability.",
      levels: {
        High: "Very High",
        Medium: "Moderate",
        Low: "Thin (Risk)"
      }
    };
  }, [lang]);

  // Normalize for 100% total representation
  const { normBuy, normSell } = useMemo(() => {
    const total = depth.buyWallStrength + depth.sellWallStrength || 1;
    const b = Math.round((depth.buyWallStrength / total) * 100);
    const s = 100 - b;
    return { normBuy: b, normSell: s };
  }, [depth.buyWallStrength, depth.sellWallStrength]);

  return (
    <div className="glass-card p-6 md:p-8 rounded-[40px] border border-white/[0.05] relative overflow-hidden">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-2 h-6 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/30"></div>
        <div>
          <h3 className="text-lg font-black tracking-tight">{t.title}</h3>
          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">{t.sub}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Visual Wall Meter - Normalized to 100% */}
        <div className="relative">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 px-1">
             <span className="text-green-400">{t.buyWall}: {normBuy}%</span>
             <span className="text-red-400">{t.sellWall}: {normSell}%</span>
          </div>
          <div className="w-full h-10 bg-zinc-950 rounded-2xl overflow-hidden flex border border-white/5 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-1000 relative group"
              style={{ width: `${normBuy}%` }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="w-0.5 h-full bg-white/40 z-10 shadow-[0_0_10px_white]"></div>
            <div 
              className="h-full bg-gradient-to-l from-red-600 to-red-400 transition-all duration-1000 relative group"
              style={{ width: `${normSell}%` }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-black text-white mix-blend-difference bg-black/20 px-2 py-0.5 rounded-full border border-white/10 pointer-events-none">
            VS
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
             <span className="text-[8px] text-zinc-500 font-black uppercase block mb-1">{t.slippage}</span>
             <span className="text-base font-mono font-black text-cyan-400">{depth.slippageImpact1000USD.toFixed(2)}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
             <span className="text-[8px] text-zinc-500 font-black uppercase block mb-1">{t.concentration}</span>
             <span className={`text-[11px] font-black ${depth.liquidityConcentration === 'High' ? 'text-green-400' : 'text-zinc-300'}`}>
               {(t.levels as any)[depth.liquidityConcentration] || depth.liquidityConcentration}
             </span>
          </div>
        </div>

        <div className="p-4 rounded-[20px] bg-black/40 border border-white/5">
           <div className="flex items-center space-x-2 mb-2">
             <i className="fa-solid fa-layer-group text-zinc-600 text-[10px]"></i>
             <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">{t.summary}</span>
           </div>
           <p className="text-[11px] text-zinc-400 leading-relaxed font-medium italic">
             "{depth.wallSummary}"
           </p>
        </div>
      </div>
    </div>
  );
};

export default MarketDepthPanel;
