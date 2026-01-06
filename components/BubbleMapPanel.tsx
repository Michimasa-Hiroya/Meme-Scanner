
import React from 'react';
import { BubbleMapAnalysis } from '../types';

interface Props {
  address: string;
  analysis: BubbleMapAnalysis;
}

const BubbleMapPanel: React.FC<Props> = ({ address, analysis }) => {
  return (
    <div className="glass-card p-10 md:p-16 rounded-[64px] border-b-4 border-purple-500/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-4 mb-3">
            <div className="w-3 h-10 bg-purple-500 rounded-full shadow-lg shadow-purple-500/30"></div>
            <h3 className="text-4xl font-black tracking-tighter italic uppercase">Network Analysis</h3>
          </div>
          <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.4em]">Cluster Detection & Internal Wallet Correlation</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-[40px] bg-zinc-950 border border-white/5">
            <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest block mb-3">Cluster Risk</span>
            <span className={`text-3xl font-black ${analysis.clusterRisk === 'Low' ? 'text-green-400' : 'text-red-500'}`}>
              {analysis.clusterRisk}
            </span>
          </div>
          <div className="p-8 rounded-[40px] bg-zinc-950 border border-white/5">
            <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest block mb-3">Hidden Links</span>
            <div className="flex items-center space-x-4">
              <i className={`fa-solid ${analysis.hiddenConnectionsFound ? 'fa-triangle-exclamation text-red-500' : 'fa-shield-check text-green-400'} text-3xl`}></i>
              <span className="text-xl font-black text-white">{analysis.hiddenConnectionsFound ? "Detected" : "None Found"}</span>
            </div>
          </div>
        </div>
        <div className="p-10 rounded-[48px] bg-black/60 border border-white/5 relative">
          <span className="text-[11px] font-black text-zinc-600 uppercase block mb-4 tracking-widest">AI Network Summary</span>
          <p className="text-lg text-zinc-200 leading-relaxed font-medium">{analysis.summary}</p>
        </div>
        <div className="pt-8 text-center">
          <a href={`https://app.bubblemaps.io/solana/token/${address}`} target="_blank" className="inline-flex items-center justify-center bg-white text-black px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-zinc-200 transition-all">
            <i className="fa-solid fa-up-right-from-square mr-4"></i>
            Open Full Bubble Map
          </a>
        </div>
      </div>
    </div>
  );
};

export default BubbleMapPanel;
