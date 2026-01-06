
import React from 'react';
import { SecurityAudit } from '../types';

interface Props {
  audit: SecurityAudit;
}

const SecurityAuditPanel: React.FC<Props> = ({ audit }) => {
  const Badge = ({ passed, label }: { passed: boolean, label: string }) => (
    <div className={`flex items-center justify-between p-5 rounded-2xl border ${passed ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
      <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
      <div className="flex items-center gap-2">
        <i className={`fa-solid ${passed ? 'fa-circle-check' : 'fa-circle-xmark'}`}></i>
        <span className="text-[10px] font-bold">{passed ? "PASSED" : "WARNING"}</span>
      </div>
    </div>
  );

  return (
    <div className="glass-card p-10 md:p-12 rounded-[48px] border border-white/[0.05] relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
        <div>
          <h3 className="text-2xl font-black flex items-center tracking-tight italic">
            <i className="fa-solid fa-shield-halved mr-4 text-green-400"></i>
            Security Audit
          </h3>
          <p className="text-zinc-500 text-[11px] mt-2 uppercase tracking-[0.2em] font-bold">On-chain Contract Verification</p>
        </div>
        <div className="text-right">
           <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Safety Score</div>
           <div className={`text-5xl font-black ${audit.auditScore > 70 ? 'text-green-400' : 'text-red-400'}`}>
             {audit.auditScore}<span className="text-sm opacity-50 ml-0.5">/100</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <Badge passed={audit.lpBurned} label="LP Burn Status" />
          <Badge passed={audit.mintRevoked} label="Mint Authority" />
          <Badge passed={audit.freezeRevoked} label="Freeze Authority" />
        </div>
        
        <div className="p-8 rounded-[40px] bg-zinc-950/60 border border-white/5 flex flex-col justify-center">
           <div className="flex justify-between items-center mb-5">
             <span className="text-[11px] text-zinc-500 font-black uppercase tracking-widest">Top Holder Conc.</span>
             <span className={`text-base font-black ${audit.topHoldersPercentage > 30 ? 'text-red-400' : 'text-green-400'}`}>
               {audit.topHoldersPercentage}%
             </span>
           </div>
           <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden">
             <div 
               className={`h-full transition-all duration-1000 ${audit.topHoldersPercentage > 30 ? 'bg-red-500' : 'bg-green-500'}`}
               style={{ width: `${audit.topHoldersPercentage}%` }}
             ></div>
           </div>
           <p className="text-[10px] text-zinc-600 mt-6 leading-relaxed italic font-medium">
             Sum of top 10 wallets. Concentration above 30% indicates potential exit liquidity risks.
           </p>
        </div>
      </div>

      <div className="p-8 rounded-[40px] bg-black/40 border border-white/5">
        <div className="flex items-center space-x-3 mb-4">
          <i className="fa-solid fa-magnifying-glass-chart text-zinc-500 text-sm"></i>
          <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">Analysis Summary</span>
        </div>
        <p className="text-base text-zinc-300 leading-relaxed font-medium">
          {audit.auditSummary}
        </p>
      </div>
    </div>
  );
};

export default SecurityAuditPanel;
