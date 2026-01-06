
import React from 'react';
import { AIAnalysisResult } from '../types';

interface Props {
  analysis: AIAnalysisResult;
  isPumpFun: boolean;
}

const SmartInsights: React.FC<Props> = ({ analysis, isPumpFun }) => {
  const getSentimentColor = (s: string) => {
    if (s.includes('Bullish')) return 'text-green-400';
    if (s.includes('Bearish')) return 'text-red-400';
    if (s.includes('Rekt')) return 'text-orange-600';
    return 'text-blue-400';
  };

  const getSentimentBg = (s: string) => {
    if (s.includes('Bullish')) return 'bg-green-400/10 border-green-400/20';
    if (s.includes('Bearish')) return 'bg-red-400/10 border-red-400/20';
    return 'bg-blue-400/10 border-blue-400/20';
  };

  const normalizePct = (val: number) => {
    if (val <= 1 && val > 0) return Math.round(val * 100);
    return Math.round(val);
  };

  const Meter = ({ label, value, description, colorClass }: { label: string, value: number, description: string, colorClass: string }) => {
    const pct = normalizePct(value);
    return (
      <div className="bg-black/20 border border-white/5 p-6 rounded-[28px]">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-1">{label}</span>
            <span className="text-[8px] text-zinc-600 font-medium">{description}</span>
          </div>
          <span className={`text-xl font-black font-mono ${colorClass}`}>{pct}<span className="text-[10px] opacity-50 ml-0.5">%</span></span>
        </div>
        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-1000 ${colorClass.replace('text-', 'bg-')}`} style={{ width: `${pct}%` }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="glass-card p-10 md:p-12 rounded-[48px] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[120px] rounded-full"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
        <div>
          <h3 className="text-3xl font-black flex items-center tracking-tight italic">
            <i className="fa-solid fa-microchip mr-4 text-cyan-400"></i>
            AI Strategy Report
          </h3>
          <p className="text-zinc-500 text-[11px] mt-2 uppercase tracking-widest font-bold">Integrated analysis of asset health and market potential</p>
        </div>
        <div className="flex items-center space-x-6">
           <div className="text-right">
             <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">AI Confidence</div>
             <div className="text-5xl font-black solana-gradient bg-clip-text text-transparent leading-none">
               {analysis.score}<span className="text-sm opacity-50 ml-0.5">/100</span>
             </div>
           </div>
           <div className={`px-6 py-4 rounded-2xl border ${getSentimentBg(analysis.sentiment)} flex flex-col items-center justify-center min-w-[160px]`}>
             <span className={`text-base font-black uppercase ${getSentimentColor(analysis.sentiment)}`}>
               {analysis.sentiment}
             </span>
           </div>
        </div>
      </div>

      <div className="space-y-12">
        {/* Token Characteristics DNA Section */}
        {analysis.tokenCharacteristics && analysis.tokenCharacteristics.length > 0 && (
          <div className="p-8 rounded-[36px] bg-indigo-500/5 border border-indigo-500/10">
            <h4 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-6 flex items-center">
              <i className="fa-solid fa-dna mr-2 text-sm"></i> Token DNA (Characteristics)
            </h4>
            <div className="flex flex-wrap gap-3">
              {analysis.tokenCharacteristics.map((trait, i) => (
                <div key={i} className="px-4 py-2 rounded-xl bg-zinc-950/80 border border-white/10 text-xs font-black text-white uppercase tracking-tight flex items-center">
                   <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2.5"></span>
                   {trait}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Meter label="PVP Index (Bot %)" value={analysis.pvpIndex} description="Higher means dominated by automated bots" colorClass={analysis.pvpIndex > 70 ? 'text-red-400' : 'text-purple-400'} />
          <Meter label="Community Heat" value={analysis.communityHeat} description="Social mention density and viral momentum" colorClass="text-cyan-400" />
        </div>

        <div className="p-10 rounded-[40px] bg-white/[0.02] border border-white/[0.05]">
          <div className="flex items-center space-x-2 mb-6">
            <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
            <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">Executive Summary</span>
          </div>
          <p className="text-zinc-200 text-lg md:text-xl leading-relaxed font-medium">
            {analysis.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-8 rounded-[36px] bg-green-500/5 border border-green-500/10">
            <h4 className="text-xs font-black text-green-400 uppercase tracking-widest mb-6 flex items-center">
              <i className="fa-solid fa-circle-check mr-2 text-sm"></i> Alpha Catalysts
            </h4>
            <ul className="space-y-4">
              {analysis.pros.map((p, i) => (
                <li key={i} className="text-[13px] text-zinc-300 flex items-start leading-relaxed font-semibold">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-4 shrink-0 shadow-lg shadow-green-500/40"></span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 rounded-[36px] bg-red-500/5 border border-red-500/10">
            <h4 className="text-xs font-black text-red-400 uppercase tracking-widest mb-6 flex items-center">
              <i className="fa-solid fa-triangle-exclamation mr-2 text-sm"></i> Critical Risks
            </h4>
            <ul className="space-y-4">
              {analysis.cons.map((c, i) => (
                <li key={i} className="text-[13px] text-zinc-300 flex items-start leading-relaxed font-semibold">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-4 shrink-0 shadow-lg shadow-red-500/40"></span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartInsights;
