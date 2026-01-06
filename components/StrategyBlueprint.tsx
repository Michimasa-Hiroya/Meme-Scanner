
import React from 'react';
import { InvestmentStrategy } from '../types';

interface Props {
  strategy: InvestmentStrategy;
}

const StrategyBlueprint: React.FC<Props> = ({ strategy }) => {
  return (
    <div className="glass-card p-10 md:p-16 rounded-[64px] border-t-4 border-indigo-500/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-[150px] -z-10"></div>
      
      <div className="mb-12">
        <h3 className="text-4xl font-black tracking-tighter flex items-center italic uppercase">
          <i className="fa-solid fa-map-location-dot mr-5 text-indigo-400"></i>
          Execution Blueprint
        </h3>
        <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.4em] mt-3">Dual Exit Strategies for High Volatility Cycles</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Scenario A */}
        <div className="flex flex-col h-full bg-green-500/5 border border-green-500/10 rounded-[48px] p-10 md:p-12 hover:bg-green-500/[0.08] transition-all group">
          <div className="flex items-center space-x-5 mb-10">
             <div className="w-16 h-16 rounded-3xl bg-green-500/20 flex items-center justify-center text-green-400 shadow-lg group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-rocket text-3xl"></i>
             </div>
             <div>
                <h4 className="text-xl font-black text-green-400 tracking-tight">Growth Alpha (2x)</h4>
                <div className="text-[11px] font-black text-green-500/60 uppercase tracking-widest">Target: {strategy.doubleUpScenario.targetPrice}</div>
             </div>
          </div>

          <div className="flex-1 space-y-8">
            <div>
              <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest block mb-3">Action Plan</span>
              <p className="text-base text-zinc-200 leading-relaxed font-bold">{strategy.doubleUpScenario.actionPlan}</p>
            </div>
            <div className="p-6 rounded-3xl bg-black/60 border border-white/5 italic">
              <span className="text-[11px] font-black text-zinc-600 uppercase block mb-2">Psychological Tip</span>
              <p className="text-sm text-zinc-400 leading-relaxed">"{strategy.doubleUpScenario.psychologicalTip}"</p>
            </div>
          </div>
          <p className="mt-10 text-[11px] text-green-500/60 font-bold italic">
            <i className="fa-solid fa-circle-info mr-2"></i>Secure your initial capital and let the "Moonbag" run.
          </p>
        </div>

        {/* Scenario B */}
        <div className="flex flex-col h-full bg-red-500/5 border border-red-500/10 rounded-[48px] p-10 md:p-12 hover:bg-red-500/[0.08] transition-all group">
          <div className="flex items-center space-x-5 mb-10">
             <div className="w-16 h-16 rounded-3xl bg-red-500/20 flex items-center justify-center text-red-400 shadow-lg group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-shield-heart text-3xl"></i>
             </div>
             <div>
                <h4 className="text-xl font-black text-red-400 tracking-tight">Risk Defense (-50%)</h4>
                <div className="text-[11px] font-black text-red-500/60 uppercase tracking-widest">Stop-Loss: {strategy.halfDownScenario.stopLossPrice}</div>
             </div>
          </div>

          <div className="flex-1 space-y-8">
            <div>
              <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest block mb-3">Defensive Action</span>
              <p className="text-base text-zinc-200 leading-relaxed font-bold">{strategy.halfDownScenario.actionPlan}</p>
            </div>
            <div>
               <span className="text-[11px] font-black text-zinc-600 uppercase block mb-4">Red Flags to Watch</span>
               <div className="space-y-3">
                 {strategy.halfDownScenario.warningSignals.map((sig, i) => (
                   <div key={i} className="text-xs text-zinc-400 flex items-center font-semibold">
                     <i className="fa-solid fa-circle-exclamation text-red-500/60 mr-3 text-[10px]"></i>
                     {sig}
                   </div>
                 ))}
               </div>
            </div>
          </div>
          <p className="mt-10 text-[11px] text-red-500/60 font-bold italic">
            <i className="fa-solid fa-triangle-exclamation mr-2"></i>Meme assets can hit zero instantly. Preserve capital above all.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StrategyBlueprint;
