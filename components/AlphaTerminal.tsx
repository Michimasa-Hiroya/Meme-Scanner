
import React, { useMemo } from 'react';
import { AlphaTerminalData } from '../types';

interface Props {
  alpha: AlphaTerminalData;
  lang: 'en' | 'ja';
}

const AlphaTerminal: React.FC<Props> = ({ alpha, lang }) => {
  const t = useMemo(() => {
    return lang === 'ja' ? {
      title: "トレーダーズ・アルファ・ターミナル",
      sub: "勝率を極限まで高めるプロ用エッジ指標",
      viralVelocity: "バイラル・ベロシティ",
      insiderStealth: "インサイダー・ステルス",
      smartMoney: "スマートマネー流入",
      exitSignal: "エグジット・レーダー",
      holderTrend: "大口ホルダー動向",
      narrative: "ナラティブ適合度",
      velocityDesc: "ホルダー増加とSNS拡散の加速度",
      insiderDesc: "初期スナイパーの保持率と隠れたウォレット",
      smartDesc: "過去の実績がある『神ウォレット』の動向",
      signals: {
        'Strong Hold': '強力保持 (Diamond Hand)',
        'Take Profit': '部分利確推奨 (TP)',
        'Danger: Top': '天井警戒 (Top Near)',
        'Accumulate': '押し目買い好機 (Buy Dip)'
      },
      trends: {
        'Increasing': '増加中',
        'Stable': '安定',
        'Decreasing': '減少（売り抜け開始）'
      }
    } : {
      title: "Trader's Alpha Terminal",
      sub: "Professional Edge Metrics for Max Win Rate",
      viralVelocity: "Viral Velocity",
      insiderStealth: "Insider Stealth",
      smartMoney: "Smart Money Inflow",
      exitSignal: "Exit Radar",
      holderTrend: "Whale Trend",
      narrative: "Narrative Alignment",
      velocityDesc: "Acceleration of holders and social hype",
      insiderDesc: "Retention of early snipers & hidden wallets",
      smartDesc: "Activity of proven 'God-tier' wallets",
      signals: {
        'Strong Hold': 'Strong Hold',
        'Take Profit': 'Take Profit (TP)',
        'Danger: Top': 'Danger: Top Near',
        'Accumulate': 'Accumulate (Buy Dip)'
      },
      trends: {
        'Increasing': 'Increasing',
        'Stable': 'Stable',
        'Decreasing': 'Decreasing (Exiting)'
      }
    };
  }, [lang]);

  const getSignalColor = (sig: string) => {
    if (sig.includes('Hold') || sig.includes('Accumulate')) return 'text-green-400';
    if (sig.includes('Danger')) return 'text-red-500';
    return 'text-yellow-400';
  };

  const MetricCard = ({ label, value, description, colorClass, icon }: { label: string, value: number, description: string, colorClass: string, icon: string }) => (
    <div className="bg-white/[0.02] border border-white/5 p-5 rounded-[30px] hover:bg-white/[0.04] transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center ${colorClass}`}>
            <i className={`fa-solid ${icon} text-lg`}></i>
          </div>
          <div>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">{label}</span>
            <span className="text-[8px] text-zinc-600 font-bold uppercase">{description}</span>
          </div>
        </div>
        <span className={`text-2xl font-black font-mono ${colorClass}`}>{value}<span className="text-[10px] opacity-50 ml-0.5">%</span></span>
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
    <div className="glass-card p-8 md:p-12 rounded-[48px] border-b-4 border-cyan-500/50 relative overflow-hidden mt-12">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] -z-10"></div>
      
      <div className="flex flex-col xl:flex-row gap-12">
        {/* Left Section: Core Metrics */}
        <div className="xl:w-2/3 space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-2 h-8 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
              <h3 className="text-3xl font-black tracking-tighter">
                {t.title}
              </h3>
            </div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">{t.sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <MetricCard 
              label={t.viralVelocity} 
              value={alpha.viralVelocity} 
              description={t.velocityDesc} 
              colorClass="text-purple-400"
              icon="fa-gauge-high"
            />
            <MetricCard 
              label={t.insiderStealth} 
              value={alpha.insiderStealthScore} 
              description={t.insiderDesc} 
              colorClass="text-orange-400"
              icon="fa-user-secret"
            />
            <MetricCard 
              label={t.smartMoney} 
              value={alpha.smartMoneyInflow} 
              description={t.smartDesc} 
              colorClass="text-cyan-400"
              icon="fa-wand-magic-sparkles"
            />
          </div>

          <div className="p-8 rounded-[40px] bg-black/40 border border-white/5 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-2">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block">{t.narrative}</span>
              <p className="text-lg font-black text-white italic">
                <i className="fa-solid fa-quote-left text-cyan-500/40 mr-3"></i>
                {alpha.narrativeAlignment}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Trading Signals */}
        <div className="xl:w-1/3 flex flex-col justify-center">
          <div className="p-8 rounded-[40px] bg-gradient-to-br from-zinc-900 to-black border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="mb-8">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-4">{t.exitSignal}</span>
              <div className={`text-4xl font-black tracking-tighter mb-2 ${getSignalColor(alpha.exitSignal)}`}>
                {(t.signals as any)[alpha.exitSignal] || alpha.exitSignal}
              </div>
              <div className="h-1 w-20 bg-current opacity-20 rounded-full"></div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-t border-white/5">
                <span className="text-[10px] font-black text-zinc-600 uppercase">{t.holderTrend}</span>
                <span className={`text-xs font-black ${alpha.topHoldersTrend === 'Increasing' ? 'text-green-400' : alpha.topHoldersTrend === 'Decreasing' ? 'text-red-500' : 'text-zinc-400'}`}>
                  {(t.trends as any)[alpha.topHoldersTrend] || alpha.topHoldersTrend}
                </span>
              </div>
              
              <div className="pt-4">
                 <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-2xl flex items-center space-x-3">
                    <i className="fa-solid fa-bolt-lightning text-cyan-400"></i>
                    <p className="text-[10px] font-bold text-cyan-300 leading-tight">
                      {lang === 'ja' ? 'AIが数百万件のトランザクションからパターンを検出し、リアルタイムでエッジを計算しています。' : 'AI detected patterns from millions of transactions, calculating real-time edge.'}
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlphaTerminal;
