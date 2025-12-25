import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Activity, Clock, Globe, Terminal, Cpu } from 'lucide-react';

interface PingResult {
  timestamp: number;
  latency: number;
  success: boolean;
}

function App() {
  const [url, setUrl] = useState('127.0.0.1');
  const [isPinging, setIsPinging] = useState(false);
  const [results, setResults] = useState<PingResult[]>([]);
  const [avgLatency, setAvgLatency] = useState<number | null>(null);

  const ping = async () => {
    const startTime = performance.now();
    try {
      const img = new Image();
      
      return new Promise<PingResult>((resolve) => {
        img.onload = () => {
          const endTime = performance.now();
          resolve({
            timestamp: Date.now(),
            latency: Math.round(endTime - startTime),
            success: true
          });
        };
        
        img.onerror = () => {
          const endTime = performance.now();
          resolve({
            timestamp: Date.now(),
            latency: Math.round(endTime - startTime),
            success: true
          });
        };

        img.src = `http://${url}/favicon.ico?t=${Date.now()}`;
        
        setTimeout(() => {
          resolve({
            timestamp: Date.now(),
            latency: 0,
            success: false
          });
        }, 5000);
      });
    } catch (error) {
      return {
        timestamp: Date.now(),
        latency: 0,
        success: false
      };
    }
  };

  const startPinging = () => {
    setIsPinging(true);
    setResults([]);
  };

  const stopPinging = () => {
    setIsPinging(false);
  };

  useEffect(() => {
    let intervalId: number;

    if (isPinging) {
      intervalId = setInterval(async () => {
        const result = await ping();
        setResults(prev => {
          const newResults = [...prev, result].slice(-10);
          const successfulPings = newResults.filter(r => r.success);
          const avg = successfulPings.length > 0
            ? Math.round(successfulPings.reduce((acc, curr) => acc + curr.latency, 0) / successfulPings.length)
            : null;
          setAvgLatency(avg);
          return newResults;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPinging, url]);

  return (
    <div className="matrix-bg min-h-screen text-green-400 py-12 px-4 sm:px-6 lg:px-8 relative scanline">
      <div className="max-w-2xl mx-auto">
        <div className="cyber-border bg-black/80 backdrop-blur-sm rounded-lg p-1">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-mono font-bold flex items-center gap-2" style={{ animation: 'glow 2s ease-in-out infinite' }}>
                <Terminal className="h-8 w-8 text-green-400" />
                网络侦测系统
              </h1>
              <div className="flex items-center gap-4">
                <Cpu className={`h-6 w-6 ${isPinging ? 'animate-spin text-green-400' : 'text-green-800'}`} />
                <Activity className={`h-6 w-6 ${isPinging ? 'animate-pulse text-green-400' : 'text-green-800'}`} />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="url" className="block text-sm font-mono font-medium mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  目标地址
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="cyber-input"
                    placeholder="输入 IP 地址或域名（如：192.168.1.1）"
                  />
                </div>
                <p className="mt-2 text-xs font-mono text-green-600">
                  [系统提示] 目标设备需要开启 HTTP 服务
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={isPinging ? stopPinging : startPinging}
                  className="cyber-button"
                >
                  {isPinging ? '>> 终止扫描 <<' : '>> 开始扫描 <<'}
                </button>
              </div>

              <div className="cyber-border bg-black/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 font-mono">
                    <Clock className="h-5 w-5" />
                    <span className="text-sm">系统延迟</span>
                  </div>
                  <span className="text-lg font-bold font-mono" style={{ animation: avgLatency ? 'glow 2s ease-in-out infinite' : 'none' }}>
                    {avgLatency !== null ? `${avgLatency}ms` : '等待数据'}
                  </span>
                </div>

                <div className="space-y-2">
                  {results.map((result, index) => (
                    <div
                      key={result.timestamp}
                      className="flex items-center justify-between p-2 bg-black/30 rounded cyber-border"
                    >
                      <div className="flex items-center gap-2">
                        {result.success ? (
                          <Wifi className="h-4 w-4 text-green-400" />
                        ) : (
                          <WifiOff className="h-4 w-4 text-red-400" />
                        )}
                        <span className="text-sm font-mono">
                          {new Date(result.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <span className={`font-mono ${
                        result.success 
                          ? 'text-green-400' 
                          : 'text-red-400'
                      }`}>
                        {result.success ? `${result.latency}ms` : '连接失败'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;