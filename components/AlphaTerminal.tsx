
import React from 'react';
import { AlphaTerminalData } from '../types';

interface Props {
  alpha: AlphaTerminalData;
}

const AlphaTerminal: React.FC<Props> = ({ alpha }) => {
  const getSignalColor = (sig: string) => {
    if (sig.includes('Hold') || sig.includes('Accumulate')) return 'text-green-400';
    if (sig.includes('Danger')) return 'text-red-500';
    return 'text-yellow-400';
  };

  // Helper to ensure percentages are 0-100 whole numbers
  const normalizePct = (val: number) => {
    if (val <= 1 && val > 0) return Math.round(val * 100);
    return Math.round(val);
  };

  const MetricCard = ({ label, value, description, colorClass, icon }: { label: string, value: number, description: string, colorClass: string, icon: string }) => {
    const pct = normalizePct(value);
    return (
      <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[32px] hover:bg-white/[0.04] transition-all">
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center ${colorClass}`}>
              <i className={`fa-solid ${icon} text-xl`}></i>
            </div>
            <div>
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">{label}</span>
              <span className="text-[8px] text-zinc-600 font-bold uppercase">{description}</span>
            </div>
          </div>
          <span className={`text-2xl font-black font-mono ${colorClass}`}>{pct}%</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-1000 ${colorClass.replace('text-', 'bg-')}`} style={{ width: `${pct}%` }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="glass-card p-10 md:p-16 rounded-[64px] border-b-4 border-cyan-500/50 relative overflow-hidden mt-12">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] -z-10"></div>
      <div className="flex flex-col xl:flex-row gap-16">
        <div className="xl:w-2/3 space-y-10">
          <div>
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-3 h-10 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.6)]"></div>
              <h3 className="text-4xl font-black tracking-tighter italic uppercase">Alpha Terminal</h3>
            </div>
            <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.4em]">Professional Edge Metrics for Trading Probability</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard label="Viral Velocity" value={alpha.viralVelocity} description="Social Hype Acceleration" colorClass="text-purple-400" icon="fa-gauge-high" />
            <MetricCard label="Insider Stealth" value={alpha.insiderStealthScore} description="Early Sniper Activity" colorClass="text-orange-400" icon="fa-user-secret" />
            <MetricCard label="Smart Money" value={alpha.smartMoneyInflow} description="Whale Wallet Signals" colorClass="text-cyan-400" icon="fa-wand-magic-sparkles" />
          </div>
          <div className="p-10 rounded-[48px] bg-black/40 border border-white/5">
              <span className="text-[11px] font-black text-zinc-600 uppercase tracking-widest block mb-4">Narrative Alignment</span>
              <p className="text-xl font-black text-white italic">"{alpha.narrativeAlignment}"</p>
          </div>
        </div>
        <div className="xl:w-1/3 flex flex-col justify-center">
          <div className="p-10 rounded-[48px] bg-zinc-900/80 border border-white/10 relative overflow-hidden backdrop-blur-xl">
            <div className="mb-10">
              <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest block mb-4">Current Alpha Signal</span>
              <div className={`text-5xl font-black tracking-tighter mb-2 ${getSignalColor(alpha.exitSignal)}`}>
                {alpha.exitSignal}
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center py-5 border-t border-white/5">
                <span className="text-[11px] font-black text-zinc-600 uppercase">Whale Trend</span>
                <span className={`text-xs font-black ${alpha.topHoldersTrend === 'Increasing' ? 'text-green-400' : 'text-zinc-400'}`}>
                  {alpha.topHoldersTrend}
                </span>
              </div>
              <div className="pt-2">
                 <div className="bg-cyan-500/10 border border-cyan-500/20 p-5 rounded-2xl flex items-center space-x-4">
                    <i className="fa-solid fa-bolt-lightning text-cyan-400 text-xl"></i>
                    <p className="text-[11px] font-bold text-cyan-300 leading-relaxed">AI engine processed 5M+ tx patterns to calculate this edge score.</p>
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
