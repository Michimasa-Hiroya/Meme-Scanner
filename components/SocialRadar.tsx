
import React, { useMemo } from 'react';
import { SocialIntelligence } from '../types';

interface Props {
  intel: SocialIntelligence;
  lang: 'en' | 'ja';
}

const SocialRadar: React.FC<Props> = ({ intel, lang }) => {
  const t = useMemo(() => {
    return lang === 'ja' ? {
      devIntel: "開発者プロファイリング",
      trackRecord: "過去の実績 (Track Record)",
      whalePulse: "クジラ ＆ スマートマネー",
      recentActivity: "直近の大型取引",
      joined: "作成日",
      followers: "フォロワー",
      kolSentiment: "KOL ＆ インフルエンサー",
      narrativeLabel: "ナラティブ分析:",
      topKols: "注目KOL / メンション",
      repScore: "開発信頼度",
      verified: "身元確認済み",
      anon: "匿名",
      kolSupport: "X Trending / Hype",
      sentimentTrend: "感情推移 (Velocity)",
      whaleConcentration: "クジラ占有率",
      inflow: "資金流入状況",
      inflowLevels: {
        Strong: "強力な流入",
        Neutral: "中立",
        Outflow: "流出中"
      }
    } : {
      devIntel: "Developer Profiling",
      trackRecord: "Track Record",
      whalePulse: "Whale & Smart Money",
      recentActivity: "Recent Large Activity",
      joined: "Joined",
      followers: "Followers",
      kolSentiment: "KOL & Influencer Pulse",
      narrativeLabel: "Narrative:",
      topKols: "Top KOLs / Mentions",
      repScore: "Dev Trust",
      verified: "Verified",
      anon: "Anon",
      kolSupport: "X Trending / Hype",
      sentimentTrend: "Sentiment Velocity",
      whaleConcentration: "Whale Conc.",
      inflow: "Money Flow",
      inflowLevels: {
        Strong: "Strong Inflow",
        Neutral: "Neutral",
        Outflow: "Outflow"
      }
    };
  }, [lang]);

  const trendPoints = useMemo(() => {
    const base = intel.kolSentiment.influencerSupport;
    // Generate a pseudo-trend based on current support for visual hype mapping
    return [
      base * 0.7, 
      base * 0.82, 
      base * 0.75, 
      base * 0.9, 
      base * 0.85, 
      base * 0.95, 
      base
    ];
  }, [intel.kolSentiment.influencerSupport]);

  return (
    <div className="space-y-6">
      {/* Whale Intelligence */}
      <div className="glass-card p-6 rounded-[32px] border-t-2 border-indigo-500/50">
        <h3 className="text-base font-black mb-4 flex items-center tracking-tight text-white">
          <i className="fa-solid fa-whale mr-2 text-indigo-400"></i>
          {t.whalePulse}
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-[8px] text-zinc-500 font-black uppercase block mb-1">{t.whaleConcentration}</span>
            <span className="text-sm font-black text-white">{intel.whalePulse.whaleConcentration}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-[8px] text-zinc-500 font-black uppercase block mb-1">{t.inflow}</span>
            <span className={`text-xs font-black ${(t.inflowLevels as any)[intel.whalePulse.smartMoneyInflow] === 'Strong' ? 'text-green-400' : 'text-zinc-300'}`}>
              {(t.inflowLevels as any)[intel.whalePulse.smartMoneyInflow] || intel.whalePulse.smartMoneyInflow}
            </span>
          </div>
        </div>

        <div>
          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-2">{t.recentActivity}</span>
          <div className="space-y-2">
            {intel.whalePulse.recentLargeTransactions.length > 0 ? (
              intel.whalePulse.recentLargeTransactions.map((tx, i) => (
                <div key={i} className="text-[10px] text-zinc-300 font-bold bg-black/40 p-2.5 rounded-xl border border-white/5 flex items-center">
                  <i className="fa-solid fa-circle-arrow-right text-indigo-500/50 mr-2"></i>
                  <span className="truncate">{tx}</span>
                </div>
              ))
            ) : (
              <div className="text-[10px] text-zinc-600 font-bold italic">No recent large TX found</div>
            )}
          </div>
        </div>
      </div>

      {/* KOL Sentiment / X Hype */}
      <div className="glass-card p-6 rounded-[32px] border-t-2 border-pink-500/50">
        <h3 className="text-base font-black mb-4 flex items-center tracking-tight text-white">
          <i className="fa-solid fa-bullhorn mr-2 text-pink-400"></i>
          {t.kolSentiment}
        </h3>
        
        <div className="flex justify-between items-center mb-6 bg-white/[0.02] p-4 rounded-[24px] border border-white/5">
           <div>
             <span className="text-[9px] font-black text-zinc-500 uppercase block mb-1">{t.kolSupport}</span>
             <div className="flex items-baseline space-x-2">
               <span className="text-2xl font-black text-pink-400 font-mono leading-none">{intel.kolSentiment.influencerSupport}<span className="text-xs opacity-50 ml-0.5">%</span></span>
             </div>
           </div>
           
           <div className="flex items-end space-x-1 h-10 px-2">
             {trendPoints.map((p, i) => (
               <div 
                 key={i} 
                 className={`w-1 rounded-full transition-all duration-1000 ${i === trendPoints.length - 1 ? 'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]' : 'bg-pink-500/20'}`}
                 style={{ height: `${Math.max(15, (p / 100) * 100)}%` }}
               ></div>
             ))}
           </div>
        </div>

        <div className="mb-4">
          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-2">{t.topKols}</span>
          <div className="flex flex-wrap gap-2">
            {intel.kolSentiment.topMentions.map((kol, i) => (
              <span key={i} className="px-2.5 py-1.5 rounded-xl bg-pink-500/5 border border-pink-500/10 text-[10px] font-black text-pink-300 flex items-center">
                <i className="fa-brands fa-x-twitter mr-1.5 text-[9px] opacity-40"></i>
                {kol}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-[22px] bg-black/40 border border-white/5">
           <div className="flex items-center space-x-2 mb-2">
             <div className="w-1 h-3 bg-pink-500 rounded-full"></div>
             <span className="text-[8px] text-zinc-600 font-black uppercase block tracking-widest">{t.narrativeLabel}</span>
           </div>
           <p className="text-[10px] text-zinc-300 font-bold leading-relaxed">{intel.kolSentiment.narrativeStrength}</p>
        </div>
      </div>

      {/* Dev Intelligence */}
      <div className="glass-card p-6 rounded-[32px] border-t-2 border-cyan-500/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-black flex items-center tracking-tight text-white">
            <i className="fa-solid fa-user-shield mr-2 text-cyan-400"></i>
            {t.devIntel}
          </h3>
          <span className="text-[8px] font-black text-zinc-500 border border-white/10 px-2 py-0.5 rounded-full">{intel.developerX.isVerifiedIdentity ? t.verified : t.anon}</span>
        </div>
        
        <div className="flex items-center space-x-3 mb-6 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
          <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center">
             <i className="fa-brands fa-x-twitter text-lg text-white"></i>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-black text-white truncate">@{intel.developerX.handle}</div>
            <div className="text-[9px] text-zinc-500 font-bold uppercase">{intel.developerX.followers} {t.followers}</div>
          </div>
          <div className="text-right">
             <div className="text-[9px] font-black text-zinc-500 uppercase">{t.repScore}</div>
             <div className="text-xs font-black text-cyan-400">{intel.developerX.reputationScore}/100</div>
          </div>
        </div>

        <div className="mb-4">
           <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-2">{t.trackRecord}</span>
           <div className="space-y-1.5">
             {intel.developerX.pastProjects.length > 0 ? (
               intel.developerX.pastProjects.map((proj, i) => (
                 <div key={i} className="px-3 py-2.5 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-[10px] font-bold text-zinc-300 flex items-center justify-between">
                    <span className="truncate mr-2">{proj}</span>
                    <i className="fa-solid fa-award text-cyan-500/40 text-[9px]"></i>
                 </div>
               ))
             ) : (
               <div className="text-[10px] text-zinc-600 font-bold italic">No previous projects found</div>
             )}
           </div>
        </div>

        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500" style={{ width: `${intel.developerX.reputationScore}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default SocialRadar;
