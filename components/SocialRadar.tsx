
import React, { useMemo } from 'react';
import { SocialIntelligence } from '../types';

interface Props {
  intel: SocialIntelligence;
}

const SocialRadar: React.FC<Props> = ({ intel }) => {
  const trendPoints = useMemo(() => {
    const base = intel.kolSentiment.influencerSupport;
    return [base * 0.7, base * 0.82, base * 0.75, base * 0.9, base * 0.85, base * 0.95, base];
  }, [intel.kolSentiment.influencerSupport]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card p-6 md:p-8 rounded-[40px] border-t-2 border-indigo-500/50 flex flex-col h-full">
        <h3 className="text-lg font-black mb-6 flex items-center tracking-tight text-white italic uppercase">
          <i className="fa-solid fa-whale mr-3 text-indigo-400"></i>
          Whale Pulse
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-white/5">
            <span className="text-[9px] text-zinc-500 font-black uppercase block mb-1">Concentration</span>
            <span className="text-lg font-black text-white">{intel.whalePulse.whaleConcentration}%</span>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950 border border-white/5">
            <span className="text-[9px] text-zinc-500 font-black uppercase block mb-1">Flow Signal</span>
            <span className={`text-sm font-black ${intel.whalePulse.smartMoneyInflow === 'Strong' ? 'text-green-400' : 'text-zinc-300'}`}>
              {intel.whalePulse.smartMoneyInflow}
            </span>
          </div>
        </div>
        <div className="mt-auto">
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-4">Recent Whale Tx</span>
          <div className="space-y-3">
            {intel.whalePulse.recentLargeTransactions.map((tx, i) => (
              <div key={i} className="text-[11px] text-zinc-300 font-bold bg-black/60 p-4 rounded-xl border border-white/5 flex items-center">
                <i className="fa-solid fa-circle-arrow-right text-indigo-500/50 mr-3"></i>
                <span className="truncate">{tx}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-[40px] border-t-2 border-pink-500/50 flex flex-col h-full">
        <h3 className="text-lg font-black mb-6 flex items-center tracking-tight text-white italic uppercase">
          <i className="fa-solid fa-bullhorn mr-3 text-pink-400"></i>
          Influencer Heat
        </h3>
        <div className="flex justify-between items-center mb-8 bg-zinc-950 p-6 rounded-[32px] border border-white/5">
           <div>
             <span className="text-[10px] font-black text-zinc-500 uppercase block mb-2">Social Traction</span>
             <span className="text-3xl font-black text-pink-400 font-mono leading-none">{intel.kolSentiment.influencerSupport}%</span>
           </div>
           <div className="flex items-end space-x-1.5 h-12 px-2">
             {trendPoints.map((p, i) => (
               <div key={i} className={`w-1.5 rounded-full ${i === trendPoints.length - 1 ? 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-pink-500/20'}`} style={{ height: `${Math.max(20, (p / 100) * 100)}%` }}></div>
             ))}
           </div>
        </div>
        <div className="mb-6 flex-1">
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-4">Top Social Mentions</span>
          <div className="flex flex-wrap gap-2.5">
            {intel.kolSentiment.topMentions.map((kol, i) => (
              <span key={i} className="px-3.5 py-2 rounded-xl bg-pink-500/5 border border-pink-500/10 text-[11px] font-black text-pink-300">
                {kol}
              </span>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-[28px] bg-black/60 border border-white/5 mt-auto">
           <span className="text-[9px] text-zinc-600 font-black uppercase block tracking-widest mb-2">Narrative Core</span>
           <p className="text-[11px] text-zinc-300 font-bold leading-relaxed">{intel.kolSentiment.narrativeStrength}</p>
        </div>
      </div>
    </div>
  );
};

export default SocialRadar;
