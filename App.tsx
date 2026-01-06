
import React, { useState } from 'react';
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

const App: React.FC = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [copying, setCopying] = useState(false);

  const resetApp = () => {
    setTokenData(null);
    setAiResult(null);
    setAddress('');
    setError('');
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!address.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const data = await fetchTokenData(address.trim());
      if (!data) {
        setError("Token not found on Solana. Please verify the Contract Address.");
        setTokenData(null);
      } else {
        setTokenData(data);
        const analysis = await analyzeToken(data);
        setAiResult(analysis);
      }
    } catch (err: any) {
      setError("Analysis engine failed to respond. Please try again later.");
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
    <div className="min-h-screen bg-[#030303] text-white selection:bg-indigo-500/40 font-['Plus_Jakarta_Sans']">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full"></div>
      </div>

      <nav className="border-b border-white/[0.03] sticky top-0 bg-[#030303]/90 backdrop-blur-3xl z-50 px-4 md:px-8">
        <div className="max-w-[1600px] mx-auto h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4 group cursor-pointer" onClick={resetApp}>
            {/* MS Stylish Logo */}
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-2xl shadow-indigo-500/30 transform group-hover:rotate-6 transition-all duration-500">
                <span className="text-2xl font-black tracking-tighter text-white">MS</span>
              </div>
              {/* Removed cyan notification dot as requested */}
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-extrabold tracking-tight uppercase leading-none group-hover:text-indigo-400 transition-colors">Meme Scanner</h1>
              <span className="text-[8px] font-black tracking-[0.3em] text-zinc-500 uppercase">Solana Intelligence</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
             <div className="hidden md:flex items-center space-x-2 bg-zinc-900/50 border border-white/5 px-4 py-2 rounded-xl">
               <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
               <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Alpha Engine Live</span>
             </div>
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
          <div className="flex flex-col items-center justify-center py-32 md:py-48 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Headline with increased pr-8 to prevent 'R' from clipping */}
            <h2 className="text-4xl md:text-7xl font-black mb-12 tracking-tight leading-none uppercase italic pr-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-white to-purple-500">
                Meme Scanner
              </span>
            </h2>
            
            <form onSubmit={handleSearch} className="w-full max-w-4xl group px-4">
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-[32px] blur-2xl opacity-10 group-focus-within:opacity-40 transition duration-700"></div>
                <div className="relative flex flex-col md:flex-row gap-4 bg-zinc-950/80 backdrop-blur-3xl border border-white/10 p-3 rounded-[30px] shadow-2xl">
                  <div className="relative flex-1">
                    <i className="fa-solid fa-bolt-lightning absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 text-xl group-focus-within:text-indigo-400 transition-colors"></i>
                    <input 
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter Solana Contract Address (CA)..."
                      className="w-full bg-transparent py-6 px-16 text-white font-bold focus:outline-none placeholder:text-zinc-700 text-xl tracking-tight"
                      autoFocus
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="bg-white text-black px-12 py-6 rounded-[24px] font-black uppercase tracking-widest text-lg hover:bg-zinc-200 transition-all active:scale-[0.97] disabled:opacity-50 shadow-xl shadow-white/5"
                  >
                    Start Scan
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-12 flex flex-col items-center space-y-4">
              <p className="text-zinc-500 text-sm md:text-base font-medium tracking-tight max-w-lg">
                Professional Solana market intelligence with real-time security auditing and AI-driven growth forecasting.
              </p>
              <div className="flex items-center space-x-6 text-zinc-700">
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-shield-halved text-xs"></i>
                  <span className="text-[10px] font-black uppercase tracking-widest">Security First</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-brain text-xs"></i>
                  <span className="text-[10px] font-black uppercase tracking-widest">AI Insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-chart-line text-xs"></i>
                  <span className="text-[10px] font-black uppercase tracking-widest">Real-time Data</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
              <i className="fa-solid fa-radar absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-indigo-400 animate-pulse"></i>
            </div>
            {/* Updated loading text and removed sub-label */}
            <h3 className="text-xl font-black text-white uppercase animate-pulse mb-6">Analyzing...</h3>
            
            <div className="flex flex-col items-center">
              <p className="text-zinc-500 text-[10px] font-mono text-center uppercase tracking-widest max-w-xs mb-2">Connecting to Alpha Engine to process on-chain network data...</p>
              <p className="text-indigo-400/80 text-[10px] font-black uppercase tracking-[0.2em]">Analysis takes approximately 50 seconds.</p>
            </div>
          </div>
        )}

        {tokenData && !loading && (
          <div className="space-y-8 animate-in fade-in duration-700 slide-in-from-bottom-4">
            {/* Header Card */}
            <div className="glass-card p-6 md:p-8 rounded-[32px] flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden border-t-2 border-indigo-500/20">
              <div className="relative shrink-0">
                <img src={tokenData.info?.imageUrl || 'https://picsum.photos/160/160'} alt={tokenData.baseToken.name} className="w-24 h-24 rounded-[24px] object-cover border-2 border-white/5 shadow-2xl"/>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center border-4 border-black shadow-lg">
                   <i className="fa-solid fa-check text-white text-[10px]"></i>
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left min-w-0">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-3">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-none truncate">{tokenData.baseToken.name}</h2>
                  <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{tokenData.baseToken.symbol}</span>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                   <div className="flex items-center space-x-3 bg-zinc-950/60 border border-white/5 px-4 py-2 rounded-xl">
                      <code className="text-indigo-400 text-[11px] font-mono font-bold truncate max-w-[200px]">{tokenData.baseToken.address}</code>
                      <button 
                        onClick={() => handleCopy(tokenData.baseToken.address)}
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        <i className={`fa-solid ${copying ? 'fa-check text-green-400' : 'fa-copy'}`}></i>
                      </button>
                   </div>
                   {isPumpFun && (
                     <div className="px-4 py-2 rounded-xl text-[10px] font-black uppercase border bg-yellow-500/10 border-yellow-500/20 text-yellow-500">
                        Pump.Fun Original
                     </div>
                   )}
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-center lg:items-end gap-4">
                 <a href={`https://dexscreener.com/solana/${tokenData.baseToken.address}`} target="_blank" className="bg-indigo-600 text-white hover:bg-indigo-500 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-center shadow-xl transform hover:scale-[1.02] transition-all border border-indigo-400/30">
                    Live Chart
                 </a>
                 <div className="flex flex-wrap justify-center lg:justify-end gap-3">
                    {/* Website Links */}
                    {tokenData.info?.websites?.map((site, i) => (
                      <a key={`site-${i}`} href={site.url} target="_blank" className="min-w-[48px] h-12 rounded-xl bg-white text-black flex items-center justify-center px-4 hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 font-black uppercase text-[10px] tracking-widest">
                        <i className="fa-solid fa-globe text-base mr-2"></i> Web
                      </a>
                    ))}
                    {/* Social Links */}
                    {tokenData.info?.socials?.map((social, i) => (
                      <a key={`social-${i}`} href={social.url} target="_blank" className="min-w-[48px] h-12 rounded-xl bg-white text-black flex items-center justify-center px-4 hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 font-black uppercase text-[10px] tracking-widest">
                        <i className={`fa-brands fa-${social.type === 'twitter' ? 'x-twitter' : social.type === 'telegram' ? 'telegram' : 'discord'} text-base ${social.type === 'twitter' ? 'mr-2' : ''}`}></i>
                        {social.type === 'twitter' && <span>X</span>}
                      </a>
                    ))}
                 </div>
              </div>
            </div>

            <TokenStats data={tokenData} aiResult={aiResult} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-8 space-y-8">
                  <div className="glass-card rounded-[40px] overflow-hidden border border-white/[0.05] h-[600px] shadow-2xl relative">
                    <iframe src={`https://dexscreener.com/solana/${tokenData.baseToken.address}?embed=1&theme=dark&trades=0&info=0`} className="w-full h-full" title="Chart"/>
                  </div>
                  {aiResult && <FibonacciDisplay levels={aiResult.fibonacci} />}
               </div>

               <div className="lg:col-span-4 space-y-8 flex flex-col">
                  {aiResult && <MarketDepthPanel depth={aiResult.marketDepth} />}
                  {aiResult && <PricePredictor prediction={aiResult.prediction} />}
                  {aiResult && <SecurityAuditPanel audit={aiResult.securityAudit} />}
               </div>
            </div>

            {aiResult && <SocialRadar intel={aiResult.socialIntelligence} />}

            <div className="space-y-12">
              {aiResult && <SmartInsights analysis={aiResult} isPumpFun={isPumpFun} />}
              {aiResult && <StrategyBlueprint strategy={aiResult.investmentStrategy} />}
            </div>

            {aiResult && tokenData && <BubbleMapPanel address={tokenData.baseToken.address} analysis={aiResult.bubbleMapAnalysis} />}
            {aiResult && <AlphaTerminal alpha={aiResult.alphaTerminal} />}

            <footer className="py-20 text-center border-t border-white/5 mt-20">
              <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em]">Meme Scanner | Solana Alpha Network v8.5</p>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
