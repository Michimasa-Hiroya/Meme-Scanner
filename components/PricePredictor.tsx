
import React, { useMemo } from 'react';
import { PricePrediction } from '../types';

interface Props {
  prediction: PricePrediction;
}

const PricePredictor: React.FC<Props> = ({ prediction }) => {
  const dropProb = useMemo(() => {
    const val = prediction.dropProbability;
    return val > 1 ? Math.min(100, Math.round(val)) : Math.round(val * 100);
  }, [prediction.dropProbability]);

  const recoverProb = useMemo(() => {
    const val = prediction.recoveryProbability;
    return val > 1 ? Math.min(100, Math.round(val)) : Math.round(val * 100);
  }, [prediction.recoveryProbability]);

  const getRiskColor = (prob: number) => {
    if (prob < 30) return 'text-green-400';
    if (prob < 65) return 'text-yellow-400';
    return 'text-red-500';
  };

  return (
    <div className="glass-card p-8 md:p-10 rounded-[40px] border border-white/[0.05] relative overflow-hidden">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-black flex items-center tracking-tight italic uppercase">
            <i className="fa-solid fa-triangle-exclamation mr-3 text-red-500"></i>
            Dump Risk Engine
          </h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">AI-Powered Market Probability</p>
        </div>
        <div className="text-right">
          <div className={`text-[10px] font-black tracking-widest mb-1 ${getRiskColor(dropProb)}`}>
            {dropProb}% PROB.
          </div>
          <div className={`text-3xl font-black font-mono leading-none ${getRiskColor(dropProb)}`}>
            {dropProb}<span className="text-xs opacity-40">%</span>
          </div>
        </div>
      </div>

      <div className="w-full h-2.5 bg-zinc-900/50 rounded-full mb-8 border border-white/5 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000 shadow-xl"
          style={{ 
            width: `${dropProb}%`,
            background: 'linear-gradient(90deg, #14f195 0%, #facc15 50%, #ef4444 100%)',
          }}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-zinc-950 border border-white/5">
          <span className="text-[9px] text-zinc-500 font-black uppercase block mb-2">Projected Floor</span>
          <div className="text-base font-black font-mono text-red-500 truncate">
            {prediction.bottomTargetPrice}
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-950 border border-white/5">
          <div className="flex justify-between items-center mb-2">
             <span className="text-[9px] text-zinc-500 font-black uppercase">Recovery Target</span>
             <span className="text-[8px] text-green-400 font-black">{recoverProb}%</span>
          </div>
          <div className="text-base font-black font-mono text-green-400 truncate">
            {prediction.recoveryTargetPrice}
          </div>
        </div>
      </div>

      <div className="p-6 rounded-[24px] bg-black/60 border border-white/5">
        <p className="text-[11px] text-zinc-400 leading-relaxed font-semibold italic">
          "{prediction.dangerZoneReasoning}"
        </p>
        <div className="mt-4 flex items-center text-[9px] font-black text-zinc-600 uppercase tracking-widest">
          <i className="fa-regular fa-clock mr-2"></i> Time Window: {prediction.timeframe}
        </div>
      </div>
    </div>
  );
};

export default PricePredictor;
