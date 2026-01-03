
import React, { useMemo } from 'react';
import { AIAnalysisResult } from '../types';

interface Props {
  analysis: AIAnalysisResult;
  isPumpFun: boolean;
  lang: 'en' | 'ja';
}

const SmartInsights: React.FC<Props> = ({ analysis, isPumpFun, lang }) => {
  const t = useMemo(() => {
    return lang === 'ja' ? {
      strategicIntel: "AI戦略レポート",
      assetDna: "資産の健全性と市場ポテンシャルの統合分析",
      confidence: "AI信頼度",
      summary: "エグゼクティブ・サマリー",
      strengths: "期待できる好材料 (Alpha)",
      risks: "警戒すべき懸念点 (Risks)",
      grounding: "分析の根拠となる情報源",
      pvp: "PVP 指標 (Bot率)",
      heat: "コミュニティ熱量",
      pvpDesc: "100に近いほどボット同士の戦場",
      heatDesc: "SNS上の言及密度と拡散力",
      sentiments: {
        Bullish: "強気 (Bullish)",
        Bearish: "弱気 (Bearish)",
        Rekt: "崩壊リスク (Rekt)",
        Neutral: "様子見 (Neutral)"
      }
    } : {
      strategicIntel: "AI Strategy Report",
      assetDna: "Integrated analysis of asset health and market potential",
      confidence: "AI Confidence",
      summary: "Executive Summary",
      strengths: "Expected Strengths (Alpha)",
      risks: "Critical Risks / Concerns",
      grounding: "Verifiable Information Sources",
      pvp: "PVP Index (Bot %)",
      heat: "Community Heat",
      pvpDesc: "Higher means dominated by bots",
      heatDesc: "Social mentions and viral power",
      sentiments: {
        Bullish: "Bullish",
        Bearish: "Bearish",
        Rekt: "Rekt / Collapse Risk",
        Neutral: "Neutral"
      }
    };
  }, [lang]);

  const getSentimentLabel = (s: string) => {
    return (t.sentiments as any)[s] || s;
  };

  const getSentimentColor = (s: string) => {
    switch (s) {
      case 'Bullish': return 'text-green-400';
      case 'Bearish': return 'text-red-400';
      case 'Rekt': return 'text-orange-600';
      default: return 'text-blue-400';
    }
  };

  const getSentimentBg = (s: string) => {
    switch (s) {
      case 'Bullish': return 'bg-green-400/10 border-green-400/20';
      case 'Bearish': return 'bg-red-400/10 border-red-400/20';
      default: return 'bg-blue-400/10 border-blue-400/20';
    }
  };

  const Meter = ({ label, value, description, colorClass }: { label: string, value: number, description: string, colorClass: string }) => (
    <div className="bg-black/20 border border-white/5 p-5 rounded-[28px]">
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-1">{label}</span>
          <span className="text-[8px] text-zinc-600 font-medium">{description}</span>
        </div>
        <span className={`text-xl font-black font-mono ${colorClass}`}>{value}<span className="text-[10px] opacity-50">%</span></span>
      </div>
      <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ${colorClass.replace('text-', 'bg-')}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="glass-card p-8 md:p-10 rounded-[40px] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[80px] rounded-full"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
        <div>
          <h3 className="text-2xl font-black flex items-center tracking-tight">
            <i className="fa-solid fa-microchip mr-3 text-cyan-400"></i>
            {t.strategicIntel}
          </h3>
          <p className="text-zinc-500 text-[11px] mt-1 uppercase tracking-widest font-bold">{t.assetDna}</p>
        </div>
        <div className="flex items-center space-x-4">
           <div className="text-right">
             <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">{t.confidence}</div>
             <div className="text-4xl font-black solana-gradient bg-clip-text text-transparent leading-none">
               {analysis.score}<span className="text-sm opacity-50 ml-0.5">/100</span>
             </div>
           </div>
           <div className={`px-5 py-3 rounded-2xl border ${getSentimentBg(analysis.sentiment)} flex flex-col items-center justify-center min-w-[140px]`}>
             <span className={`text-sm font-black uppercase ${getSentimentColor(analysis.sentiment)}`}>
               {getSentimentLabel(analysis.sentiment)}
             </span>
           </div>
        </div>
      </div>

      <div className="space-y-10">
        {/* PVP and Heat Meters (Restored) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Meter 
            label={t.pvp} 
            value={analysis.pvpIndex} 
            description={t.pvpDesc} 
            colorClass={analysis.pvpIndex > 70 ? 'text-red-400' : 'text-purple-400'}
          />
          <Meter 
            label={t.heat} 
            value={analysis.communityHeat} 
            description={t.heatDesc} 
            colorClass="text-cyan-400"
          />
        </div>

        <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/[0.05]">
          <div className="flex items-center space-x-2 mb-4">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t.summary}</span>
          </div>
          <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-medium">
            {analysis.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-[28px] bg-green-500/5 border border-green-500/10 hover:bg-green-500/10 transition-colors">
            <h4 className="text-xs font-black text-green-400 uppercase tracking-widest mb-5 flex items-center">
              <i className="fa-solid fa-circle-check mr-2 text-sm"></i> {t.strengths}
            </h4>
            <ul className="space-y-3">
              {analysis.pros.map((p, i) => (
                <li key={i} className="text-[12px] text-zinc-300 flex items-start leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-3 shrink-0 shadow-lg shadow-green-500/40"></span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-[28px] bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-colors">
            <h4 className="text-xs font-black text-red-400 uppercase tracking-widest mb-5 flex items-center">
              <i className="fa-solid fa-triangle-exclamation mr-2 text-sm"></i> {t.risks}
            </h4>
            <ul className="space-y-3">
              {analysis.cons.map((c, i) => (
                <li key={i} className="text-[12px] text-zinc-300 flex items-start leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-3 shrink-0 shadow-lg shadow-red-500/40"></span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {analysis.sources && analysis.sources.length > 0 && (
        <div className="mt-12 pt-8 border-t border-white/[0.03]">
          <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-6 flex items-center">
            <i className="fa-solid fa-link mr-2"></i> {t.grounding}
          </h4>
          <div className="flex flex-wrap gap-3">
            {analysis.sources.map((source, idx) => (
              <a 
                key={idx} 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 px-4 py-2 rounded-xl transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/5 flex items-center justify-center mr-3 group-hover:bg-purple-500/20">
                   <i className="fa-solid fa-globe text-purple-400/60 text-xs"></i>
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-zinc-400 group-hover:text-white truncate max-w-[150px]">{source.title}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartInsights;
