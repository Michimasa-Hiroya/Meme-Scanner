
import { GoogleGenAI, Type } from "@google/genai";
import { TokenData, AIAnalysisResult } from "../types";

export const analyzeToken = async (data: TokenData, lang: 'en' | 'ja' = 'ja'): Promise<AIAnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const currentMC = data.marketCap || data.fdv;
  const currentPrice = parseFloat(data.priceUsd);
  
  const langName = lang === 'ja' ? '日本語 (Japanese)' : '英語 (English)';
  
  const prompt = `
    Analyze the Solana token ${data.baseToken.address} (${data.baseToken.name}).

    CRITICAL REAL-TIME DATA:
    - PRICE: $${currentPrice}
    - MARKET CAP: $${currentMC}
    - 24H VOLUME: $${data.volume.h24}

    Perform a professional deep scan including high-end trading alpha:
    1. Viral Velocity: How fast is the holder count and social hype growing?
    2. Insider Stealth: Are early snipers holding or dumping?
    3. Smart Money: Are "God-tier" wallets (past 100x hunters) buying?
    4. Exit Signal: Is the chart overextended? Is it time to take profit or buy the dip?

    CRITICAL: All textual descriptions MUST be in ${langName}.
    Output strictly in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            sentiment: { type: Type.STRING },
            riskLevel: { type: Type.STRING },
            pvpIndex: { type: Type.NUMBER },
            communityHeat: { type: Type.NUMBER },
            holderQuality: { type: Type.STRING },
            smartMoneySignal: { type: Type.STRING },
            summary: { type: Type.STRING },
            pros: { type: Type.ARRAY, items: { type: Type.STRING } },
            cons: { type: Type.ARRAY, items: { type: Type.STRING } },
            alphaTerminal: {
              type: Type.OBJECT,
              properties: {
                viralVelocity: { type: Type.NUMBER },
                insiderStealthScore: { type: Type.NUMBER },
                smartMoneyInflow: { type: Type.NUMBER },
                exitSignal: { type: Type.STRING },
                topHoldersTrend: { type: Type.STRING },
                narrativeAlignment: { type: Type.STRING }
              }
            },
            marketDepth: {
              type: Type.OBJECT,
              properties: {
                buyWallStrength: { type: Type.NUMBER },
                sellWallStrength: { type: Type.NUMBER },
                slippageImpact1000USD: { type: Type.NUMBER },
                liquidityConcentration: { type: Type.STRING },
                wallSummary: { type: Type.STRING }
              }
            },
            securityAudit: {
              type: Type.OBJECT,
              properties: {
                lpBurned: { type: Type.BOOLEAN },
                mintRevoked: { type: Type.BOOLEAN },
                freezeRevoked: { type: Type.BOOLEAN },
                topHoldersPercentage: { type: Type.NUMBER },
                isHoneypot: { type: Type.BOOLEAN },
                auditScore: { type: Type.NUMBER },
                auditSummary: { type: Type.STRING }
              }
            },
            bubbleMapAnalysis: {
              type: Type.OBJECT,
              properties: {
                clusterRisk: { type: Type.STRING },
                hiddenConnectionsFound: { type: Type.BOOLEAN },
                summary: { type: Type.STRING },
                notableClusters: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            prediction: {
              type: Type.OBJECT,
              properties: {
                dropProbability: { type: Type.NUMBER },
                bottomTargetPrice: { type: Type.STRING },
                recoveryProbability: { type: Type.NUMBER },
                recoveryTargetPrice: { type: Type.STRING },
                timeframe: { type: Type.STRING },
                dangerZoneReasoning: { type: Type.STRING }
              }
            },
            investmentStrategy: {
              type: Type.OBJECT,
              properties: {
                doubleUpScenario: {
                  type: Type.OBJECT,
                  properties: {
                    targetPrice: { type: Type.STRING },
                    actionPlan: { type: Type.STRING },
                    psychologicalTip: { type: Type.STRING }
                  }
                },
                halfDownScenario: {
                  type: Type.OBJECT,
                  properties: {
                    stopLossPrice: { type: Type.STRING },
                    actionPlan: { type: Type.STRING },
                    warningSignals: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                }
              }
            },
            fibonacci: {
              type: Type.OBJECT,
              properties: {
                level0: { type: Type.NUMBER },
                level236: { type: Type.NUMBER },
                level382: { type: Type.NUMBER },
                level500: { type: Type.NUMBER },
                level618: { type: Type.NUMBER },
                level786: { type: Type.NUMBER },
                level100: { type: Type.NUMBER }
              }
            },
            socialIntelligence: {
              type: Type.OBJECT,
              properties: {
                developerX: {
                  type: Type.OBJECT,
                  properties: {
                    handle: { type: Type.STRING },
                    joinedDate: { type: Type.STRING },
                    followers: { type: Type.STRING },
                    bio: { type: Type.STRING },
                    pastProjects: { type: Type.ARRAY, items: { type: Type.STRING } },
                    reputationScore: { type: Type.NUMBER },
                    isVerifiedIdentity: { type: Type.BOOLEAN }
                  }
                },
                whalePulse: {
                  type: Type.OBJECT,
                  properties: {
                    whaleConcentration: { type: Type.NUMBER },
                    smartMoneyInflow: { type: Type.STRING },
                    recentLargeTransactions: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                },
                kolSentiment: {
                  type: Type.OBJECT,
                  properties: {
                    topMentions: { type: Type.ARRAY, items: { type: Type.STRING } },
                    influencerSupport: { type: Type.NUMBER },
                    narrativeStrength: { type: Type.STRING }
                  }
                },
                trendingNarratives: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              }
            }
          },
          required: ["score", "sentiment", "riskLevel", "pvpIndex", "communityHeat", "holderQuality", "smartMoneySignal", "summary", "pros", "cons", "alphaTerminal", "marketDepth", "securityAudit", "bubbleMapAnalysis", "prediction", "fibonacci", "socialIntelligence", "investmentStrategy"],
        },
        thinkingConfig: { thinkingBudget: 32768 }
      },
    });

    const textOutput = response.text || "{}";
    const result: AIAnalysisResult = JSON.parse(textOutput.trim());

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      result.sources = groundingChunks
        .filter((chunk: any) => chunk.web)
        .map((chunk: any) => ({
          title: chunk.web.title || "Reference",
          url: chunk.web.uri
        }));
    }

    return result;
  } catch (error: any) {
    console.error("Analysis Error:", error);
    throw error;
  }
};
