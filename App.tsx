
import React, { useState, useMemo } from 'react';
import { fetchTokenData } from './services/dexScreenerService';
import { analyzeToken } from './services/geminiService';
import { TokenData, AIAnalysisResult } from './types';
import TokenStats from './components/TokenStats';
import FibonacciDisplay from './components/FibonacciDisplay';
import SmartInsights from './components/SmartInsights';
import PricePredictor from './components/PricePredictor';
import SocialRadar from './components/SocialRadar';
import SecurityAuditPanel from './components/SecurityAuditPanel';
import StrategyBlueprint from './components/StrategyBlueprint';
import MarketDepthPanel from './components/MarketDepthPanel';
import BubbleMapPanel from './components/BubbleMapPanel';
import AlphaTerminal from './components/AlphaTerminal';

const translations = {
  ja: {
    scanAnother: "他のアドレスをスキャン...",
    liveEngine: "解析エンジン稼働中",
    proEnabled: "プロモード有効",
    title: "Meme Scanner",
    subtitle: "ミームコイン分析",
    features: [
      "AIによるクジラ・KOL・スマートマネーの動向検知",
      "セキュリティ・ハニーポット・発行権限の自動スキャン",
      "フィボナッチとマーケットデプスによる出口戦略の提示"
    ],
    placeholder: "コントラクトアドレス(CA)を入力...",
    scanBtn: "スキャン開始",
    scanning: "解析中...",
    estTime: "所要時間は約50秒",
    weighting: "AIによるクジラ、KOL、セキュリティ監査を実行中",
    liveChart: "チャートを表示",
    originPump: "PUMP.FUN 出身",
    whaleAlert: "クジラ警告",
    smartMoney: "スマートマネー",
    whaleAccumulating: "クジラが蓄積（買い増し）中",
    whaleSelling: "クジラが売却（利益確定）中",
    errorCa: "ソラナネットワーク上でトークンが見つかりません。CAが正しいか確認してください。",
    errorTimeout: "解析エンジンが応答しませんでした。もう一度お試しください。",
    error403: "APIキーに権限がありません。管理者にお問い合わせください。",
    errorKeyNotFound: "解析エンジンへのアクセス権がありません。設定を確認してください。",
    footer: "Meme Scanner | Solana Market Intelligence v6.0",
    chartTitle: "リアルタイム・チャート",
    analysisResults: "AI解析レポート",
    langToggle: "EN",
    pvpIndex: "PVP 指標 (Bot率)",
    commHeat: "コミュニティ熱量",
    botHeavy: "ボット戦場",
    retailOrganic: "リテール流入",
    copied: "コピーしました"
  },
  en: {
    scanAnother: "Scan another address...",
    liveEngine: "Analysis Engine Active",
    proEnabled: "PRO MODE ENABLED",
    title: "Meme Scanner",
    subtitle: "Meme Intelligence",
    features: [
      "AI-powered whale, KOL, and smart money detection",
      "Automated security, honeypot, and authority scanning",
      "Exit strategies via Fibonacci and Market Depth analysis"
    ],
    placeholder: "Enter Contract Address (CA)...",
    scanBtn: "START SCAN",
    scanning: "Analyzing...",
    estTime: "Estimated time: ~50s",
    weighting: "AI-powered Whale, KOL, and Security audits in progress",
    liveChart: "VIEW CHART",
    originPump: "PUMP.FUN ORIGIN",
    whaleAlert: "WHALE ALERT",
    smartMoney: "SMART MONEY",
    whaleAccumulating: "WHALES ACCUMULATING",
    whaleSelling: "WHALES SELLING",
    errorCa: "Token not found on Solana. Please verify the CA.",
    errorTimeout: "Analysis engine failed to respond. Please try again.",
    error403: "API key permission denied. Please check your account status.",
    errorKeyNotFound: "Access to the analysis engine denied. Check configuration.",
    footer: "Meme Scanner | Solana Market Intelligence v6.0",
    chartTitle: "Real-time Chart",
    analysisResults: "AI Analysis Report",
    langToggle: "JP",
    pvpIndex: "PVP Index (Bot %)",
    commHeat: "Community Heat",
    botHeavy: "Bot PVP Heavy",
    retailOrganic: "Retail Organic",
    copied: "Copied"
  }
};

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ja'>('ja');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [copying, setCopying] = useState(false);

  const t = useMemo(() => translations[lang], [lang]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!address.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const data = await fetchTokenData(address.trim());
      if (!data) {
        setError(t.errorCa);
        setTokenData(null);
      } else {
        setTokenData(data);
        const analysis = await analyzeToken(data, lang);
        setAiResult(analysis);
      }
    } catch (err: any) {
      console.error(err);
      const errMsg = err.message || '';
      if (errMsg.includes('403') || errMsg.includes('permission')) {
        setError(t.error403);
      } else if (errMsg.includes('Requested entity was not found')) {
        setError(t.errorKeyNotFound);
      } else {
        setError(t.errorTimeout);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  const isPumpFun = tokenData?.pairAddress.toLowerCase().includes('pump') || false;

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-purple-500/40 font-['Plus_Jakarta_Sans']">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[150px] rounded-full"></div>
      </div>

      <nav className="border-b border-white/[0.03] sticky top-0 bg-[#030303]/90 backdrop-blur-3xl z-50 px-4 md:px-8">
        <div className="max-w-[1600px] mx-auto h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-all">
              <i className="fa-solid fa-bolt-lightning text-white text-xl"></i>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight uppercase">{t.title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
             <button 
               onClick={() => setLang(l => l === 'en' ? 'ja' : 'en')}
               className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black hover:bg-white/10 transition-all"
             >
               {t.langToggle}
             </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-12">
        {error && (
          <div className="max-w-4xl mx-auto mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center space-x-4">
                <i className="fa-solid fa-circle-exclamation text-red-500 text-xl"></i>
                <div className="flex-1">
                  <p className="text-sm font-bold text-red-400">{error}</p>
                </div>
             </div>
          </div>
        )}

        {!tokenData && !loading && (
          <div className="flex flex-col items-center justify-center py-32 md:py-48 text-center animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <h2 className="text-5xl md:text-6xl font-black mb-16 tracking-tighter leading-none uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-cyan-400">
                {t.title}
              </span>
            </h2>
            
            <form onSubmit={handleSearch} className="w-full max-w-4xl group px-4 mb-20">
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-[32px] blur-2xl opacity-10 group-focus-within:opacity-40 transition duration-700"></div>
                <div className="relative flex flex-col md:flex-row gap-4 bg-zinc-950/80 backdrop-blur-3xl border border-white/10 p-3 rounded-[30px] shadow-2xl">
                  <div className="relative flex-1">
                    <i className="fa-solid fa-link absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 text-xl group-focus-within:text-purple-500 transition-colors"></i>
                    <input 
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t.placeholder}
                      className="w-full bg-transparent py-6 px-16 text-white font-bold focus:outline-none placeholder:text-zinc-700 text-xl tracking-tight"
                      autoFocus
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="bg-white text-black px-12 py-6 rounded-[24px] font-black uppercase tracking-widest text-lg hover:bg-zinc-200 transition-all active:scale-[0.97] disabled:opacity-50 shadow-xl shadow-white/5"
                  >
                    {t.scanBtn}
                  </button>
                </div>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
              {t.features.map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-[32px] bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-all group">
                   <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6">
                      <i className={`fa-solid ${i === 0 ? 'fa-magnifying-glass-chart' : i === 1 ? 'fa-shield-halved' : 'fa-chart-line'} text-purple-500 text-xl`}></i>
                   </div>
                   <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-t-2 border-purple-500 rounded-full animate-spin"></div>
              <i className="fa-solid fa-radar absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-purple-400 animate-pulse"></i>
            </div>
            <h3 className="text-xl font-black text-white uppercase animate-pulse mb-4">{t.scanning}</h3>
            <div className="bg-purple-500/10 border border-purple-500/20 px-6 py-2 rounded-full mb-6">
               <span className="text-purple-400 text-sm font-black uppercase tracking-widest">{t.estTime}</span>
            </div>
            <p className="text-zinc-500 text-[10px] font-mono text-center uppercase tracking-widest">{t.weighting}</p>
          </div>
        )}

        {tokenData && !loading && (
          <div className="space-y-8 animate-in fade-in duration-1000">
            {/* Header */}
            <div className="glass-card p-5 md:p-6 rounded-[32px] flex flex-col lg:flex-row items-center gap-6 relative overflow-hidden">
              <div className="relative shrink-0">
                <img src={tokenData.info?.imageUrl || 'https://picsum.photos/160/160'} alt={tokenData.baseToken.name} className="w-20 h-20 rounded-[22px] object-cover border-2 border-white/5 shadow-2xl"/>
              </div>
              <div className="flex-1 text-center lg:text-left min-w-0">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-2">
                  <h2 className="text-2xl md:text-3xl font-black tracking-tighter leading-none truncate">{tokenData.baseToken.name}</h2>
                  <span className="bg-white/5 border border-white/10 text-zinc-300 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest">{tokenData.baseToken.symbol}</span>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                   <div className="flex items-center space-x-2 bg-black/40 border border-white/5 px-3 py-1 rounded-lg">
                      <code className="text-purple-400 text-[9px] font-mono font-bold truncate max-w-[200px]">{tokenData.baseToken.address}</code>
                      <button 
                        onClick={() => handleCopy(tokenData.baseToken.address)}
                        className="ml-1 text-zinc-500 hover:text-white transition-colors p-1"
                        title="Copy address"
                      >
                        <i className={`fa-solid ${copying ? 'fa-check text-green-400' : 'fa-copy'}`}></i>
                      </button>
                   </div>
                   {isPumpFun && (
                     <div className="px-2 py-0.5 rounded-lg text-[8px] font-black uppercase border bg-yellow-500/10 border-yellow-500/20 text-yellow-500">
                        {t.originPump}
                     </div>
                   )}
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-center lg:items-end gap-3">
                 <a href={`https://dexscreener.com/solana/${tokenData.baseToken.address}`} target="_blank" className="bg-white text-black px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] text-center shadow-xl transform hover:scale-[1.02] transition-all">
                    {t.liveChart}
                 </a>
                 <div className="flex gap-2">
                    {tokenData.info?.websites?.map((site, i) => (
                      <a key={i} href={site.url} target="_blank" className="min-w-[36px] h-9 px-3 rounded-xl bg-white text-black border-2 border-white/10 flex items-center justify-center hover:bg-zinc-100 transition-all shadow-xl" title={site.label}>
                        <i className="fa-solid fa-globe text-[11px]"></i>
                      </a>
                    ))}
                    {tokenData.info?.socials?.map((social, i) => (
                      <a key={i} href={social.url} target="_blank" className="min-w-[42px] h-9 px-3 rounded-xl bg-white text-black border-2 border-white/10 flex items-center justify-center hover:bg-zinc-100 transition-all shadow-xl font-black text-[10px] space-x-2" title={social.type}>
                        <i className={`fa-brands fa-${social.type === 'twitter' ? 'x-twitter' : social.type === 'telegram' ? 'telegram' : 'discord'} text-[11px]`}></i>
                        {social.type === 'twitter' && <span className="text-[10px]">X</span>}
                        {social.type === 'telegram' && <span className="text-[10px]">TG</span>}
                      </a>
                    ))}
                 </div>
              </div>
            </div>

            {/* Compact Stats */}
            <TokenStats data={tokenData} lang={lang} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-8 space-y-8">
                  {/* Chart */}
                  <div className="glass-card rounded-[40px] overflow-hidden border border-white/[0.05] h-[500px] shadow-2xl relative">
                    <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-widest flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5 animate-pulse"></span>
                      {t.chartTitle}
                    </div>
                    <iframe src={`https://dexscreener.com/solana/${tokenData.baseToken.address}?embed=1&theme=dark&trades=0&info=0`} className="w-full h-full" title="Chart"/>
                  </div>
                  
                  {/* Fibonacci */}
                  {aiResult && <FibonacciDisplay levels={aiResult.fibonacci} lang={lang} />}
               </div>

               {/* Right Sidebar */}
               <div className="lg:col-span-4 space-y-8 flex flex-col">
                  {aiResult && <MarketDepthPanel depth={aiResult.marketDepth} lang={lang} />}
                  {aiResult && <PricePredictor prediction={aiResult.prediction} lang={lang} />}
                  {aiResult && <SecurityAuditPanel audit={aiResult.securityAudit} lang={lang} />}
                  {aiResult && <SocialRadar intel={aiResult.socialIntelligence} lang={lang} />}
               </div>
            </div>

            {/* Strategy & Insights */}
            <div className="space-y-10">
              {aiResult && <SmartInsights analysis={aiResult} isPumpFun={isPumpFun} lang={lang} />}
              {aiResult && <StrategyBlueprint strategy={aiResult.investmentStrategy} lang={lang} />}
            </div>

            {/* Bubble Map Panel */}
            {aiResult && tokenData && (
              <BubbleMapPanel 
                address={tokenData.baseToken.address} 
                analysis={aiResult.bubbleMapAnalysis} 
                lang={lang} 
              />
            )}

            {/* Alpha Terminal Panel - Trader's Pro Data */}
            {aiResult && (
              <AlphaTerminal 
                alpha={aiResult.alphaTerminal}
                lang={lang}
              />
            )}

            <footer className="py-16 text-center">
              <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em]">{t.footer}</p>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
