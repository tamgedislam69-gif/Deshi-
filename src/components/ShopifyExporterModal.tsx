import React, { useState } from 'react';
import { Code, Copy, Check, X, FileCode, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { SHOPIFY_LIQUID_TEMPLATES, LiquidTemplate } from '../data/shopifyLiquidTemplates';

interface ShopifyExporterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShopifyExporterModal: React.FC<ShopifyExporterModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [selectedTemplate, setSelectedTemplate] = useState<LiquidTemplate>(SHOPIFY_LIQUID_TEMPLATES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedTemplate.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col my-6 max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">Shopify Liquid Section Suite</h3>
                <span className="bg-amber-500/20 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded-full border border-amber-500/30">
                  100% Theme Schema Compatible
                </span>
              </div>
              <p className="text-xs text-slate-400">
                GitHub Repository & Shopify Theme Customizer Ready
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Liquid File Selector Navigation */}
          <div className="space-y-2 lg:border-r border-slate-200 pr-0 lg:pr-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Liquid ফাইল নির্বাচন করুন
            </span>

            {SHOPIFY_LIQUID_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl)}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-2.5 cursor-pointer ${
                  selectedTemplate.id === tmpl.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-500/30'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <FileCode className={`w-4 h-4 shrink-0 mt-0.5 ${selectedTemplate.id === tmpl.id ? 'text-amber-400' : 'text-slate-500'}`} />
                <div className="min-w-0">
                  <span className="block font-bold text-xs line-clamp-1">{tmpl.title}</span>
                  <span className={`text-[10px] font-mono block mt-0.5 truncate ${selectedTemplate.id === tmpl.id ? 'text-slate-300' : 'text-slate-500'}`}>
                    {tmpl.filename}
                  </span>
                </div>
              </button>
            ))}

            <div className="pt-4 mt-4 border-t border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Shopify & GitHub সেটআপ গাইড:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-600 pl-1 font-medium">
                <li><strong className="text-slate-900">গিটহাব পুশ:</strong> এই কোডগুলো আপনার GitHub Repository-তে পুশ করুন।</li>
                <li><strong className="text-slate-900">Shopify থিম কানেক্ট:</strong> Shopify Admin-এ গিয়ে <code className="bg-slate-100 px-1 py-0.5 rounded text-amber-700">Online Store &gt; Themes &gt; Add Theme &gt; Connect from GitHub</code> সিলেক্ট করুন।</li>
                <li><strong className="text-slate-900">ব্যাকএন্ড সিংক:</strong> এখন Shopify Admin থেকে প্রোডাক্ট ছাড়লে বা কালার/সাইজ এডিট করলে তা সরাসরি এই ফ্রন্টএন্ড ডিজাইনে শো করবে!</li>
              </ol>
            </div>
          </div>

          {/* Right: Code Inspector Frame */}
          <div className="lg:col-span-2 space-y-3 flex flex-col">
            
            <div className="flex items-center justify-between bg-slate-100 p-3 rounded-2xl border border-slate-200">
              <div>
                <span className="font-mono font-bold text-xs text-slate-900 block">{selectedTemplate.filename}</span>
                <span className="text-[11px] text-slate-500">{selectedTemplate.description}</span>
              </div>

              <button
                onClick={handleCopyCode}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
                <span>{copied ? 'কপি করা হয়েছে!' : 'লিকুইড কোড কপি করুন'}</span>
              </button>
            </div>

            {/* Code Block Container */}
            <div className="bg-slate-950 text-amber-200/90 rounded-2xl p-4 font-mono text-xs overflow-x-auto max-h-[420px] border border-slate-800 shadow-inner leading-relaxed">
              <pre>{selectedTemplate.code}</pre>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
