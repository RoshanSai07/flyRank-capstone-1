import React, { useState } from 'react';
import { Monitor, Smartphone, Globe, Eye } from 'lucide-react';
import { WidgetConfig } from '../../types/widget';
import { WidgetFloatingCard } from './WidgetFloatingCard';

interface LivePreviewContainerProps {
  config: WidgetConfig;
}

export const LivePreviewContainer: React.FC<LivePreviewContainerProps> = ({ config }) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  const isBottomLeft = config.appearance.position === 'bottom-left';

  return (
    <section className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-full min-h-[580px]">
      {/* Studio Preview Topbar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 ml-2 bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-md max-w-xs truncate text-[11px]">
            <Globe className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="truncate">{config.websiteUrl || 'https://example.com'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Preview Active</span>
          </div>

          {/* Viewport switch: Desktop vs Mobile */}
          <div className="bg-slate-900 p-0.5 rounded-lg border border-slate-800 flex items-center">
            <button
              type="button"
              onClick={() => setDeviceMode('desktop')}
              aria-label="Desktop preview"
              className={`p-1.5 rounded-md transition-colors ${
                deviceMode === 'desktop'
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('mobile')}
              aria-label="Mobile preview"
              className={`p-1.5 rounded-md transition-colors ${
                deviceMode === 'mobile'
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Canvas Area */}
      <div className="flex-1 bg-slate-950/60 p-3 sm:p-6 flex items-center justify-center overflow-auto">
        <div
          className={`w-full bg-white transition-all duration-300 relative rounded-xl border border-slate-200/90 shadow-2xl flex flex-col justify-between overflow-hidden ${
            deviceMode === 'mobile'
              ? 'max-w-[375px] h-[640px] rounded-3xl border-4 border-slate-700'
              : 'max-w-4xl h-[640px]'
          }`}
        >
          {/* Simulated Website Navigation */}
          <div className="bg-white/90 backdrop-blur-xs border-b border-slate-100 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                {config.businessName ? config.businessName.charAt(0).toUpperCase() : 'B'}
              </div>
              <span className="font-semibold text-slate-800 text-xs tracking-tight truncate max-w-[140px]">
                {config.businessName || 'Your Business'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
              <span className="hidden sm:inline hover:text-slate-600 cursor-pointer">Product</span>
              <span className="hidden sm:inline hover:text-slate-600 cursor-pointer">Pricing</span>
              <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                Demo Page
              </span>
            </div>
          </div>

          {/* Simulated Website Content / Hero Section */}
          <div className="p-6 sm:p-10 flex-1 flex flex-col justify-center max-w-xl mx-auto text-center space-y-4">
            <span className="inline-block mx-auto px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
              Visitor Landing Page Simulation
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Grow pipeline with AI qualification on {config.businessName || 'Your Business'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Experience how website visitors interact with your qualification widget in real-time.
              Click the interactive widget to preview visitor qualification questions.
            </p>
          </div>

          {/* Floating Widget Position Overlay */}
          <div
            className={`absolute bottom-4 sm:bottom-6 z-20 transition-all duration-300 ${
              isBottomLeft ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
            }`}
          >
            <WidgetFloatingCard config={config} />
          </div>
        </div>
      </div>
    </section>
  );
};
