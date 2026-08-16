import React from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, categoryName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">সাইজ মেজারমেন্ট চার্ট (Size Guide)</h3>
              <p className="text-xs text-slate-500 font-medium">সঠিক মাপ জেনে সাইজ নির্বাচন করুন</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Size Table for Panjabi & Shirts */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase text-amber-600 tracking-wider">
            পাঞ্জাবি ও শার্ট এর মাপঝোক (ইঞ্চিতে)
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-white font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="p-3">সাইজ (Size)</th>
                  <th className="p-3">বুক/চেস্ট (Chest)</th>
                  <th className="p-3">দৈর্ঘ্য (Length)</th>
                  <th className="p-3">হাতা (Sleeve)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-semibold">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 bg-slate-50">M (40)</td>
                  <td className="p-3">৪০ ইঞ্চি</td>
                  <td className="p-3 font-mono">৪০ ইঞ্চি</td>
                  <td className="p-3">২৩.৫ ইঞ্চি</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 bg-slate-50">L (42)</td>
                  <td className="p-3">৪২ ইঞ্চি</td>
                  <td className="p-3 font-mono">৪২ ইঞ্চি</td>
                  <td className="p-3">২৪.০ ইঞ্চি</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 bg-slate-50">XL (44)</td>
                  <td className="p-3">৪৪ ইঞ্চি</td>
                  <td className="p-3 font-mono">৪৪ ইঞ্চি</td>
                  <td className="p-3">২৪.৫ ইঞ্চি</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 bg-slate-50">XXL (46)</td>
                  <td className="p-3">৪৬ ইঞ্চি</td>
                  <td className="p-3 font-mono">৪৫ ইঞ্চি</td>
                  <td className="p-3">২৫.০ ইঞ্চি</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Size Table for Pants / Joggers */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase text-amber-600 tracking-wider">
            প্যান্ট ও জগার্স এর মাপঝোক (কোমর/Waist)
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-white font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="p-3">সাইজ</th>
                  <th className="p-3">কোমর (Waist Size)</th>
                  <th className="p-3">লম্বা (Length)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-semibold">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 bg-slate-50">M</td>
                  <td className="p-3">২৮ - ৩০ ইঞ্চি</td>
                  <td className="p-3">৩৮ ইঞ্চি</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 bg-slate-50">L</td>
                  <td className="p-3">৩২ - ৩৪ ইঞ্চি</td>
                  <td className="p-3">৪০ ইঞ্চি</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900 bg-slate-50">XL</td>
                  <td className="p-3">৩৬ - ৩৮ ইঞ্চি</td>
                  <td className="p-3">৪২ ইঞ্চি</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tips Note */}
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900 font-medium">
          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>পরামর্শ:</strong> আপনার মেজারমেন্ট যদি দুটি সাইজের মাঝখানে হয়, তবে আরামদায়ক ফিটিংসের জন্য বড় সাইজটি সিলেক্ট করার পরামর্শ দেওয়া হচ্ছে।
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 rounded-2xl text-xs transition-colors cursor-pointer"
        >
          বুঝেছি, বন্ধ করুন
        </button>

      </div>
    </div>
  );
};
