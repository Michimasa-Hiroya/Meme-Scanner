
import React, { useMemo } from 'react';
import { SecurityAudit } from '../types';

interface Props {
  audit: SecurityAudit;
  lang: 'en' | 'ja';
}

const SecurityAuditPanel: React.FC<Props> = ({ audit, lang }) => {
  const t = useMemo(() => {
    return lang === 'ja' ? {
      title: "セキュリティ監査 & ホルダー分析",
      sub: "オンチェーン・コントラクト安全確認",
      lp: "流動性バーン (LP Burn)",
      mint: "発行権限放棄 (Mint)",
      freeze: "凍結権限放棄 (Freeze)",
      holders: "上位ホルダー占有率",
      honeypot: "ハニーポット・チェック",
      summary: "セキュリティ・サマリー",
      statusPassed: "クリア",
      statusFailed: "警告",
      honeypotSafe: "安全",
      honeypotRisk: "危険",
      score: "安全スコア"
    } : {
      title: "Security & Holder Audit",
      sub: "On-chain Contract Verification",
      lp: "LP Burn Status",
      mint: "Mint Authority",
      freeze: "Freeze Authority",
      holders: "Top Holders Concentration",
      honeypot: "Honeypot Check",
      summary: "Security Summary",
      statusPassed: "PASSED",
      statusFailed: "WARNING",
      honeypotSafe: "SAFE",
      honeypotRisk: "RISK",
      score: "Safety Score"
    };
  }, [lang]);

  const Badge = ({ passed, label }: { passed: boolean, label: string }) => (
    <div className={`flex items-center justify-between p-4 rounded-2xl border ${passed ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
      <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
      <div className="flex items-center gap-2">
        <i className={`fa-solid ${passed ? 'fa-circle-check' : 'fa-circle-xmark'}`}></i>
        <span className="text-[10px] font-bold">{passed ? t.statusPassed : t.statusFailed}</span>
      </div>
    </div>
  );

  return (
    <div className="glass-card p-8 md:p-10 rounded-[40px] border border-white/[0.05] relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
        <div>
          <h3 className="text-2xl font-black flex items-center tracking-tight">
            <i className="fa-solid fa-shield-halved mr-3 text-green-400"></i>
            {t.title}
          </h3>
          <p className="text-zinc-500 text-[11px] mt-2 uppercase tracking-[0.2em] font-bold">{t.sub}</p>
        </div>
        <div className="text-right">
           <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">{t.score}</div>
           <div className={`text-4xl font-black ${audit.auditScore > 70 ? 'text-green-400' : 'text-red-400'}`}>
             {audit.auditScore}<span className="text-sm opacity-50 ml-0.5">/100</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="space-y-3">
          <Badge passed={audit.lpBurned} label={t.lp} />
          <Badge passed={audit.mintRevoked} label={t.mint} />
          <Badge passed={audit.freezeRevoked} label={t.freeze} />
        </div>
        
        <div className="p-6 rounded-[32px] bg-zinc-950/40 border border-white/5 flex flex-col justify-center">
           <div className="flex justify-between items-center mb-4">
             <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{t.holders}</span>
             <span className={`text-sm font-black ${audit.topHoldersPercentage > 30 ? 'text-red-400' : 'text-green-400'}`}>
               {audit.topHoldersPercentage}%
             </span>
           </div>
           <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
             <div 
               className={`h-full transition-all duration-1000 ${audit.topHoldersPercentage > 30 ? 'bg-red-500' : 'bg-green-500'}`}
               style={{ width: `${audit.topHoldersPercentage}%` }}
             ></div>
           </div>
           <p className="text-[9px] text-zinc-600 mt-4 leading-relaxed italic">
             {lang === 'ja' ? '※上位10ホルダーの合計。30%を超えると売り圧リスクが高まります。' : 'Total of top 10 holders. Above 30% indicates high sell pressure risk.'}
           </p>
        </div>
      </div>

      <div className="p-6 rounded-[32px] bg-black/40 border border-white/5">
        <div className="flex items-center space-x-2 mb-3">
          <i className="fa-solid fa-magnifying-glass-chart text-zinc-500 text-xs"></i>
          <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{t.summary}</span>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed font-medium">
          {audit.auditSummary}
        </p>
      </div>
    </div>
  );
};

export default SecurityAuditPanel;
