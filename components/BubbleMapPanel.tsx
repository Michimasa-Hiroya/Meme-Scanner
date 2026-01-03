
import React, { useMemo } from 'react';
import { BubbleMapAnalysis } from '../types';

interface Props {
  address: string;
  analysis: BubbleMapAnalysis;
  lang: 'en' | 'ja';
}

const BubbleMapPanel: React.FC<Props> = ({ address, analysis, lang }) => {
  const t = useMemo(() => {
    return lang === 'ja' ? {
      title: "ホルダー・ネットワーク解析 (AIレポート)",
      sub: "クラスター検出 & 内部相関スキャン結果",
      riskLabel: "クラスター・リスク",
      connections: "隠れた繋がりの検出",
      summary: "AI ネットワーク・サマリー",
      clusters: "注目すべきクラスター / ウォレット群",
      viewFull: "Bubblemapsでフルマップを表示",
      detected: "検出あり",
      none: "異常なし",
      externalNote: "※Bubblemapsの公式ページでリアルタイムの相関図を確認できます",
      risks: {
        Low: "低 (分散良好)",
        Medium: "中 (一部集中)",
        High: "高 (組織的売却リスク)",
        Critical: "危険 (インサイダー濃厚)"
      }
    } : {
      title: "Holder Network AI Report",
      sub: "Cluster Detection & Correlation Results",
      riskLabel: "Cluster Risk",
      connections: "Hidden Connections",
      summary: "AI Network Summary",
      clusters: "Notable Clusters / Wallets",
      viewFull: "Open Full Map on Bubblemaps",
      detected: "Detected",
      none: "Safe / No Issues",
      externalNote: "*View real-time interactive map on Bubblemaps official site",
      risks: {
        Low: "Low (Well Distributed)",
        Medium: "Medium (Moderate Clusters)",
        High: "High (Coordinated Sell Risk)",
        Critical: "Critical (Insider Heavy)"
      }
    };
  }, [lang]);

  return (
    <div className="glass-card p-8 md:p-12 rounded-[48px] border-b-4 border-purple-500/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 blur-[120px] -z-10"></div>
      
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
            <div className="w-2 h-8 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
            <h3 className="text-3xl font-black tracking-tighter">
              {t.title}
            </h3>
          </div>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">{t.sub}</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 group hover:border-purple-500/30 transition-all flex flex-col justify-center">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">{t.riskLabel}</span>
            <span className={`text-2xl font-black ${
              analysis.clusterRisk === 'Low' ? 'text-green-400' : 
              analysis.clusterRisk === 'Medium' ? 'text-yellow-400' : 'text-red-500'
            }`}>
              {(t.risks as any)[analysis.clusterRisk] || analysis.clusterRisk}
            </span>
          </div>
          <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 group hover:border-cyan-500/30 transition-all flex flex-col justify-center">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">{t.connections}</span>
            <div className="flex items-center space-x-2">
              <i className={`fa-solid ${analysis.hiddenConnectionsFound ? 'fa-triangle-exclamation text-red-500' : 'fa-shield-check text-green-400'} text-xl`}></i>
              <span className="text-lg font-bold text-white">{analysis.hiddenConnectionsFound ? t.detected : t.none}</span>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="p-8 rounded-[40px] bg-black/40 border border-white/5 relative">
          <div className="absolute -top-3 -left-3 w-10 h-10 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-xl">
            <i className="fa-solid fa-robot text-purple-400 text-sm"></i>
          </div>
          <span className="text-[10px] font-black text-zinc-600 uppercase block mb-3 tracking-widest">{t.summary}</span>
          <p className="text-base text-zinc-200 leading-relaxed font-medium">
            {analysis.summary}
          </p>
        </div>

        {/* Clusters & Link Button */}
        <div className="space-y-6">
          {analysis.notableClusters.length > 0 && (
            <div className="space-y-4">
               <span className="text-[10px] font-black text-zinc-600 uppercase block tracking-widest flex items-center">
                 <i className="fa-solid fa-layer-group mr-2 text-purple-500/50"></i>
                 {t.clusters}
               </span>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {analysis.notableClusters.map((cluster, i) => (
                   <div key={i} className="text-xs text-zinc-400 flex items-center bg-white/5 px-5 py-4 rounded-[22px] border border-white/5 hover:bg-white/10 transition-all hover:translate-x-1">
                     <i className="fa-solid fa-link text-purple-500/40 mr-4"></i>
                     {cluster}
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* Large Action Button placed directly under clusters */}
          <div className="pt-6">
            <a 
              href={`https://app.bubblemaps.io/solana/token/${address}`} 
              target="_blank" 
              className="w-full group relative flex items-center justify-center bg-white text-black py-6 rounded-[30px] font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-[1.01] active:scale-[0.98] transition-all"
            >
              <i className="fa-solid fa-up-right-from-square mr-4 group-hover:rotate-12 transition-transform"></i>
              {t.viewFull}
              <div className="absolute inset-0 rounded-[30px] border-2 border-white/20 scale-105 opacity-0 group-hover:opacity-100 transition-all"></div>
            </a>
            <p className="text-center text-zinc-600 text-[10px] font-bold mt-6 uppercase tracking-widest">
              {t.externalNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleMapPanel;
