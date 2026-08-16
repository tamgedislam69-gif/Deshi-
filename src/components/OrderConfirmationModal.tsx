import React, { useState } from 'react';
import { 
  CheckCircle2, Copy, Printer, PackageSearch, ShieldCheck, 
  MapPin, Phone, User, Calendar, ExternalLink, X 
} from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onTrackOrder
}) => {
  if (!order) return null;

  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col my-6 max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-950 text-white p-6 text-center relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            অর্ডার সফলভাবে জমা হয়েছে!
          </span>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            ধন্যবাদ, {order.customer.fullName}!
          </h2>

          <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
            আপনার ক্যাশ অন ডেলিভারি অর্ডারটি আমাদের সিস্টেমে সফলভাবে গ্রহণ করা হয়েছে। খুব শীঘ্রই আমাদের রিপ্রেজেন্টেটিভ আপনার সাথে ফোনে যোগাযোগ করবে।
          </p>
        </div>

        {/* Modal Content / Printable Invoice */}
        <div className="p-6 overflow-y-auto space-y-6" id="printable-invoice">
          
          {/* Tracking Code Highlight Box */}
          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div>
              <span className="block text-[11px] font-extrabold text-amber-800 uppercase tracking-wider">
                আপনার অর্ডার ট্র্যাকিং আইডি
              </span>
              <span className="text-2xl font-black text-slate-900 font-mono">
                {order.id}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="bg-white hover:bg-slate-100 text-slate-800 font-bold px-3 py-2 rounded-xl border border-amber-300 text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-amber-600" />
                <span>{copied ? 'কপি হয়েছে!' : 'আইডি কপি করুন'}</span>
              </button>

              <button
                onClick={handlePrintInvoice}
                className="no-print bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>ইনভয়েস প্রিন্ট</span>
              </button>
            </div>
          </div>

          {/* Customer & Delivery Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="space-y-1.5">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">
                গ্রাহকের বিবরণ
              </span>
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <User className="w-3.5 h-3.5 text-amber-600" />
                <span>{order.customer.fullName}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{order.customer.mobileNumber}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>{order.customer.address}, {order.customer.thana}, {order.customer.district}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">
                ডেলিভারি সংক্রান্ত তথ্য
              </span>
              <div className="text-slate-800 font-semibold">
                পেমেন্ট মেথড: <span className="font-bold text-emerald-700">ক্যাশ অন ডেলিভারি (COD)</span>
              </div>
              <div className="text-slate-800 font-semibold">
                ডেলিভারি সময়সীমা: <span className="font-bold text-amber-700">{order.customer.deliveryZone === 'inside_dhaka' ? '২৪-৪৮ ঘণ্টার মধ্যে' : '৩-৫ দিনের মধ্যে'}</span>
              </div>
              <div className="text-slate-800 font-semibold">
                কুরিয়ার পার্টনার: <span className="font-bold text-slate-900">{order.trackingCourier}</span>
              </div>
            </div>
          </div>

          {/* Items Invoice Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              অর্ডারকৃত পণ্যের তালিকা
            </h4>
            <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">পণ্য</th>
                    <th className="p-3">ভ্যারিয়েন্ট</th>
                    <th className="p-3 text-center">পরিমাণ</th>
                    <th className="p-3 text-right">মূল্য</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-bold text-slate-900">
                        {item.product.titleBn}
                      </td>
                      <td className="p-3 text-slate-600">
                        {item.selectedColor.nameBn} / {item.selectedSize}
                      </td>
                      <td className="p-3 text-center font-bold text-slate-900">
                        {item.quantity}
                      </td>
                      <td className="p-3 text-right font-extrabold text-amber-600">
                        ৳{(item.product.offerPrice * item.quantity).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Breakdown */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 border border-slate-800 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>পণ্যের মোট দাম:</span>
              <span className="font-bold text-white">৳{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>কুরিয়ার ডেলিভারি চার্জ:</span>
              <span className="font-bold text-amber-400">৳{order.deliveryFee}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-sm font-black text-amber-300">সর্বমোট প্রদেয় বিল:</span>
              <span className="text-xl font-black text-amber-400">
                ৳{order.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="no-print pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onTrackOrder(order.id);
              }}
              className="w-full sm:flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <PackageSearch className="w-4 h-4" />
              <span>লাইভ অর্ডার স্ট্যাটাস ট্র্যাকিং দেখুন</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-5 rounded-xl text-xs border border-slate-200 cursor-pointer"
            >
              কেনাকাটা চালিয়ে যান
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
