
import React, { useMemo } from 'react';
import { MarketDepth } from '../types';

interface Props {
  depth: MarketDepth;
}

const MarketDepthPanel: React.FC<Props> = ({ depth }) => {
  const { normBuy, normSell } = useMemo(() => {
    const total = depth.buyWallStrength + depth.sellWallStrength || 1;
    const b = Math.round((depth.buyWallStrength / total) * 100);
    return { normBuy: b, normSell: 100 - b };
  }, [depth]);

  return (
    <div className="glass-card p-8 md:p-10 rounded-[40px] border border-white/[0.05] relative overflow-hidden">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-2.5 h-8 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/30"></div>
        <div>
          <h3 className="text-xl font-black tracking-tight italic uppercase">Market Depth</h3>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Order Book Pressure Estimation</p>
        </div>
      </div>
      <div className="space-y-8">
        <div className="relative">
          <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-3 px-1">
             <span className="text-green-400">Buy Pressure: {normBuy}%</span>
             <span className="text-red-400">Sell Pressure: {normSell}%</span>
          </div>
          <div className="w-full h-12 bg-zinc-950 rounded-2xl overflow-hidden flex border border-white/10 shadow-inner">
            <div className="h-full bg-gradient-to-r from-green-700 to-green-500" style={{ width: `${normBuy}%` }}></div>
            <div className="w-1 h-full bg-white/30 z-10"></div>
            <div className="h-full bg-gradient-to-l from-red-700 to-red-500" style={{ width: `${normSell}%` }}></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-950 border border-white/5">
             <span className="text-[10px] text-zinc-500 font-black uppercase block mb-2">Slippage ($1K)</span>
             <span className="text-lg font-mono font-black text-cyan-400">{depth.slippageImpact1000USD.toFixed(2)}%</span>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-950 border border-white/5">
             <span className="text-[10px] text-zinc-500 font-black uppercase block mb-2">Conc. Level</span>
             <span className={`text-sm font-black ${depth.liquidityConcentration === 'High' ? 'text-green-400' : 'text-zinc-300'}`}>
               {depth.liquidityConcentration}
             </span>
          </div>
        </div>
        <div className="p-6 rounded-[28px] bg-black/60 border border-white/5">
           <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest block mb-2">Depth Summary</span>
           <p className="text-[12px] text-zinc-400 leading-relaxed font-semibold italic">"{depth.wallSummary}"</p>
        </div>
      </div>
    </div>
  );
};

export default MarketDepthPanel;
