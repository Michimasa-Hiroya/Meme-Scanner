
import React, { useMemo } from 'react';
import { InvestmentStrategy } from '../types';

interface Props {
  strategy: InvestmentStrategy;
  lang: 'en' | 'ja';
}

const StrategyBlueprint: React.FC<Props> = ({ strategy, lang }) => {
  const t = useMemo(() => {
    return lang === 'ja' ? {
      title: "投資実行ブループリント",
      sub: "ボラティリティに対応する2つの出口戦略",
      pattern2x: "パターンA：2倍達成（原資抜き）",
      pattern50: "パターンB：50%下落（リスク回避）",
      target: "ターゲット価格",
      stoploss: "損切り/警戒価格",
      action: "推奨アクション",
      mindset: "心理アドバイス",
      warnings: "撤退の予兆 (Red Flags)",
      moonbag: "原資を抜いた後は「ムーンバッグ」として利益を最大化しましょう。",
      riskNote: "ミームコインは数分で価値がゼロになる可能性があります。常に余剰資金で運用してください。"
    } : {
      title: "Investment Blueprint",
      sub: "Dual Exit Strategies for High Volatility",
      pattern2x: "Pattern A: 2x Gains (Initial Extraction)",
      pattern50: "Pattern B: 50% Drop (Risk Mitigation)",
      target: "Target Price",
      stoploss: "Stop-Loss / Alert Price",
      action: "Recommended Action",
      mindset: "Psychology",
      warnings: "Withdrawal Signals (Red Flags)",
      moonbag: "Once initial capital is extracted, let the 'Moonbag' run for max gains.",
      riskNote: "Meme coins can go to zero in minutes. Trade only with what you can afford to lose."
    };
  }, [lang]);

  return (
    <div className="glass-card p-8 md:p-12 rounded-[48px] border-t-4 border-indigo-500/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[120px] -z-10"></div>
      
      <div className="mb-12">
        <h3 className="text-3xl font-black tracking-tighter flex items-center">
          <i className="fa-solid fa-map-location-dot mr-4 text-indigo-400"></i>
          {t.title}
        </h3>
        <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em] mt-2">{t.sub}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Scenario A: 2x Growth */}
        <div className="flex flex-col h-full bg-green-500/5 border border-green-500/10 rounded-[40px] p-8 md:p-10 hover:bg-green-500/[0.08] transition-all">
          <div className="flex items-center space-x-4 mb-8">
             <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400">
                <i className="fa-solid fa-rocket text-2xl"></i>
             </div>
             <div>
                <h4 className="text-lg font-black text-green-400 tracking-tight">{t.pattern2x}</h4>
                <div className="text-[10px] font-black text-green-500/60 uppercase tracking-widest">{t.target}: {strategy.doubleUpScenario.targetPrice}</div>
             </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">{t.action}</span>
              <p className="text-sm text-zinc-200 leading-relaxed font-bold">{strategy.doubleUpScenario.actionPlan}</p>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 italic">
              <span className="text-[10px] font-black text-zinc-600 uppercase block mb-1">{t.mindset}</span>
              <p className="text-xs text-zinc-400 leading-relaxed">"{strategy.doubleUpScenario.psychologicalTip}"</p>
            </div>
          </div>
          <p className="mt-8 text-[10px] text-green-500/60 font-bold italic">
            <i className="fa-solid fa-circle-info mr-2"></i>{t.moonbag}
          </p>
        </div>

        {/* Scenario B: 50% Drop */}
        <div className="flex flex-col h-full bg-red-500/5 border border-red-500/10 rounded-[40px] p-8 md:p-10 hover:bg-red-500/[0.08] transition-all">
          <div className="flex items-center space-x-4 mb-8">
             <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-400">
                <i className="fa-solid fa-shield-heart text-2xl"></i>
             </div>
             <div>
                <h4 className="text-lg font-black text-red-400 tracking-tight">{t.pattern50}</h4>
                <div className="text-[10px] font-black text-red-500/60 uppercase tracking-widest">{t.stoploss}: {strategy.halfDownScenario.stopLossPrice}</div>
             </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">{t.action}</span>
              <p className="text-sm text-zinc-200 leading-relaxed font-bold">{strategy.halfDownScenario.actionPlan}</p>
            </div>
            <div>
               <span className="text-[10px] font-black text-zinc-600 uppercase block mb-3">{t.warnings}</span>
               <div className="space-y-2">
                 {strategy.halfDownScenario.warningSignals.map((sig, i) => (
                   <div key={i} className="text-[11px] text-zinc-400 flex items-center">
                     <i className="fa-solid fa-circle-exclamation text-red-500/40 mr-2 text-[8px]"></i>
                     {sig}
                   </div>
                 ))}
               </div>
            </div>
          </div>
          <p className="mt-8 text-[10px] text-red-500/60 font-bold italic">
            <i className="fa-solid fa-triangle-exclamation mr-2"></i>{t.riskNote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StrategyBlueprint;
