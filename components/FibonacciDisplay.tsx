
import React, { useMemo } from 'react';
import { FibonacciLevels } from '../types';

interface Props {
  levels: FibonacciLevels;
  lang: 'en' | 'ja';
}

const FibonacciDisplay: React.FC<Props> = ({ levels, lang }) => {
  const t = useMemo(() => {
    return lang === 'ja' ? {
      title: "フィボナッチ・リトレースメント",
      sub: "24時間の価格変動に基づいた反発・抵抗ライン",
      calibrated: "ボラティリティに合わせてリアルタイムに調整済み",
      high: "(直近高値)",
      low: "(直近安値)",
      golden: "(黄金比ライン)"
    } : {
      title: "Fibonacci Retracement",
      sub: "Levels based on 24h volatility range",
      calibrated: "Levels calibrated to real-time volatility",
      high: "(Recent High)",
      low: "(Recent Low)",
      golden: "(Golden Ratio)"
    };
  }, [lang]);

  const items = [
    { label: `100.0% ${t.high}`, val: levels.level100, color: 'text-red-400', barColor: 'bg-red-400/20' },
    { label: '78.6%', val: levels.level786, color: 'text-orange-400', barColor: 'bg-orange-400/10' },
    { label: `61.8% ${t.golden}`, val: levels.level618, color: 'text-yellow-400', barColor: 'bg-yellow-400/10' },
    { label: '50.0%', val: levels.level500, color: 'text-blue-400', barColor: 'bg-blue-400/10' },
    { label: '38.2%', val: levels.level382, color: 'text-purple-400', barColor: 'bg-purple-400/10' },
    { label: '23.6%', val: levels.level236, color: 'text-indigo-400', barColor: 'bg-indigo-400/10' },
    { label: `0.0% ${t.low}`, val: levels.level0, color: 'text-green-400', barColor: 'bg-green-400/20' },
  ];

  return (
    <div className="glass-card p-8 md:p-10 rounded-[40px] border border-white/[0.05]">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-2 h-8 bg-purple-500 rounded-full shadow-lg shadow-purple-500/30"></div>
        <div>
          <h3 className="text-xl font-black tracking-tight">{t.title}</h3>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{t.sub}</p>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="group cursor-default">
            <div className="flex justify-between items-center mb-1.5 px-1">
              <span className={`text-[11px] font-black uppercase tracking-wider ${item.color}`}>
                {item.label}
              </span>
              <span className="font-mono text-xs font-bold text-zinc-300">
                ${item.val.toFixed(10).replace(/\.?0+$/, '')}
              </span>
            </div>
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/[0.03]">
              <div 
                className={`h-full ${item.barColor} transition-all duration-700`}
                style={{ width: `${(1 - (idx / (items.length - 1))) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/[0.03]">
        <div className="flex items-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest italic">
          <i className="fa-solid fa-circle-info mr-2"></i>
          {t.calibrated}
        </div>
      </div>
    </div>
  );
};

export default FibonacciDisplay;
