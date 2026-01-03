
import React, { useMemo } from 'react';
import { PricePrediction } from '../types';

interface Props {
  prediction: PricePrediction;
  lang: 'en' | 'ja';
}

const PricePredictor: React.FC<Props> = ({ prediction, lang }) => {
  const t = useMemo(() => {
    return lang === 'ja' ? {
      title: "急落リスク ＆ 回復シグナル",
      sub: "AI統合型ミーム・マーケット・プロバビリティ",
      dumpProb: "急落の発生確率",
      lowRisk: "低リスク",
      modRisk: "中リスク",
      critRisk: "警告：高リスク",
      floor: "予測される底値",
      recovery: "回復ターゲット",
      recoveryProb: "期待確率",
      reasoning: "AI解析根拠",
      window: "予測窓",
    } : {
      title: "Dump Risk & Recovery",
      sub: "AI Market Probabilities",
      dumpProb: "Dump Probability",
      lowRisk: "Low Risk",
      modRisk: "Moderate Risk",
      critRisk: "WARNING: High Risk",
      floor: "Projected Floor",
      recovery: "Recovery Target",
      recoveryProb: "Prob.",
      reasoning: "AI Basis",
      window: "Window",
    };
  }, [lang]);

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
    <div className="glass-card p-6 md:p-8 rounded-[40px] border border-white/[0.05] relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-black flex items-center tracking-tight">
            <i className="fa-solid fa-triangle-exclamation mr-2 text-red-500"></i>
            {t.title}
          </h3>
          <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mt-0.5">{t.sub}</p>
        </div>
        <div className="text-right">
          <div className={`text-[9px] font-black tracking-widest mb-1 ${getRiskColor(dropProb)}`}>
            {dropProb}% DUMP
          </div>
          <div className={`text-2xl font-black font-mono leading-none ${getRiskColor(dropProb)}`}>
            {dropProb}<span className="text-xs opacity-40">%</span>
          </div>
        </div>
      </div>

      <div className="w-full h-2 bg-zinc-900/50 rounded-full mb-6 border border-white/5 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000 shadow-lg"
          style={{ 
            width: `${dropProb}%`,
            background: 'linear-gradient(90deg, #14f195 0%, #facc15 50%, #ef4444 100%)',
          }}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-zinc-950/40 border border-white/5">
          <span className="text-[8px] text-zinc-500 font-black uppercase block mb-1">{t.floor}</span>
          <div className="text-sm font-black font-mono text-red-500 truncate">
            {prediction.bottomTargetPrice}
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-zinc-950/40 border border-white/5">
          <div className="flex justify-between items-center mb-1">
             <span className="text-[8px] text-zinc-500 font-black uppercase">{t.recovery}</span>
             <span className="text-[7px] text-green-400 font-black">{recoverProb}%</span>
          </div>
          <div className="text-sm font-black font-mono text-green-400 truncate">
            {prediction.recoveryTargetPrice}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-[20px] bg-black/40 border border-white/5">
        <p className="text-[10px] text-zinc-400 leading-relaxed font-medium italic">
          "{prediction.dangerZoneReasoning}"
        </p>
        <div className="mt-3 flex items-center text-[8px] font-bold text-zinc-600 uppercase tracking-widest">
          <i className="fa-regular fa-clock mr-1"></i> {t.window}: {prediction.timeframe}
        </div>
      </div>
    </div>
  );
};

export default PricePredictor;
