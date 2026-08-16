import React, { useState } from 'react';
import { 
  ShieldCheck, Phone, MessageSquare, Download, Printer, Plus, 
  Search, Filter, Save, FileText, CheckCircle2, Clock, Truck, 
  AlertCircle, DollarSign, Package, User, ExternalLink, X 
} from 'lucide-react';
import { Order, OrderStatus, Product } from '../types';

interface AdminDashboardProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  onUpdateInternalNote: (orderId: string, note: string) => void;
  onAddNewProduct: (product: Product) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  onUpdateOrderStatus,
  onUpdateInternalNote,
  onAddNewProduct
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [noteText, setNoteText] = useState<string>(selectedOrder?.internalNotes || '');
  
  // Add Product Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTitleBn, setNewTitleBn] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newOfferPrice, setNewOfferPrice] = useState('');
  const [newCategory, setNewCategory] = useState('mens_fashion');
  const [newCategoryBn, setNewCategoryBn] = useState('পুরুষের পোশাক');

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== 'All' && order.status !== statusFilter) return false;
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const matchId = order.id.toLowerCase().includes(q);
      const matchName = order.customer.fullName.toLowerCase().includes(q);
      const matchPhone = order.customer.mobileNumber.includes(q);
      if (!matchId && !matchName && !matchPhone) return false;
    }
    return true;
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (o.status !== 'Cancelled' ? o.totalAmount : 0), 0);
  const totalOrdersCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const confirmedCount = orders.filter((o) => o.status === 'Confirmed').length;
  const inCourierCount = orders.filter((o) => o.status === 'In Courier').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setNoteText(order.internalNotes || '');
  };

  const handleSaveNote = () => {
    if (!selectedOrder) return;
    onUpdateInternalNote(selectedOrder.id, noteText);
    alert('অভ্যন্তরীণ নোট সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  const handleExportCSV = () => {
    const csvHeader = 'Order ID,Date,Customer Name,Phone,Zone,District,Status,Total BDT\n';
    const csvRows = orders.map(
      (o) => `"${o.id}","${o.createdAt}","${o.customer.fullName}","${o.customer.mobileNumber}","${o.customer.deliveryZone}","${o.customer.district}","${o.status}",${o.totalAmount}`
    ).join('\n');

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DeshiStore_Orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice.trim()) return;

    const orig = parseFloat(newPrice) || 1000;
    const off = parseFloat(newOfferPrice) || orig * 0.8;
    const disc = Math.round(((orig - off) / orig) * 100);

    const created: Product = {
      id: `prod-custom-${Date.now()}`,
      sku: `DS-NEW-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      titleBn: newTitleBn || newTitle,
      category: newCategory,
      categoryBn: newCategoryBn,
      originalPrice: orig,
      offerPrice: off,
      discountPercent: disc,
      rating: 5.0,
      reviewsCount: 1,
      images: [
        'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800'
      ],
      colors: [
        { name: 'Standard White', nameBn: 'স্ট্যান্ডার্ড হোয়াইট', hex: '#ffffff' },
        { name: 'Dark Navy', nameBn: 'ডার্ক নেভি', hex: '#1e293b' }
      ],
      sizes: ['M', 'L', 'XL'],
      description: 'Newly added custom store item.',
      descriptionBn: 'নতুন কাস্টম স্টোর প্রোডাক্ট।',
      inStock: true,
      isNewArrival: true
    };

    onAddNewProduct(created);
    setShowAddProductModal(false);
    alert('নতুন পণ্য সফলভাবে স্টোরে আপলোড করা হয়েছে!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Admin Header Banner */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              এডমিন অর্ডার ম্যানেজমেন্ট
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            কাস্টমার অর্ডার ও ক্যাশ অন ডেলিভারি কন্ট্রোল প্যানেল
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            অর্ডারের স্ট্যাটাস পরিবর্তন, কাস্টমার হোয়াটসঅ্যাপ চ্যাট ও ইন্টারনাল নোট পরিচালনা করুন।
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowAddProductModal(true)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন পণ্য যোগ করুন</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>CSV ডাটা এক্সপোর্ট</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            সর্বমোট সেলস (BDT)
          </span>
          <div className="text-xl sm:text-2xl font-black text-amber-600">
            ৳{totalRevenue.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] font-semibold text-slate-400">মোট {totalOrdersCount} টি অর্ডার</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            পেন্ডিং অর্ডার
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {pendingCount}
          </div>
          <span className="text-[10px] font-bold text-amber-600">কনফার্মেশনের অপেক্ষায়</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            কুরিয়ারে আছে (In Courier)
          </span>
          <div className="text-xl sm:text-2xl font-black text-sky-600">
            {inCourierCount}
          </div>
          <span className="text-[10px] font-semibold text-slate-400">Pathao / Steadfast</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            ডেলিভার্ড সম্পন্ন
          </span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600">
            {deliveredCount}
          </div>
          <span className="text-[10px] font-bold text-emerald-700">ক্যাশ রিসিভড</span>
        </div>
      </div>

      {/* Main Admin Two Column Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Order List Table & Filters */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
          
          {/* Filter Bar */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="font-extrabold text-sm text-slate-900">অর্ডার তালিকা ({filteredOrders.length})</h3>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {['All', 'Pending', 'Confirmed', 'In Courier', 'Delivered', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-colors cursor-pointer ${
                      statusFilter === st
                        ? 'bg-slate-900 text-amber-400 shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="অর্ডার নম্বর, নাম বা ফোন দিয়ে ফিল্টার করুন..."
                className="w-full bg-white text-xs font-medium pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto flex-1 max-h-[500px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                <tr>
                  <th className="p-3">অর্ডার আইডি</th>
                  <th className="p-3">গ্রাহক</th>
                  <th className="p-3">ডেলিভারি এরিয়া</th>
                  <th className="p-3">বিল</th>
                  <th className="p-3">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => handleSelectOrder(order)}
                      className={`hover:bg-amber-50/50 cursor-pointer transition-colors ${
                        selectedOrder?.id === order.id ? 'bg-amber-50 border-l-4 border-amber-500 font-bold' : ''
                      }`}
                    >
                      <td className="p-3 font-mono font-bold text-slate-900">
                        {order.id}
                        <span className="block text-[10px] text-slate-400 font-normal">{order.createdAt}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block">{order.customer.fullName}</span>
                        <span className="text-slate-500">{order.customer.mobileNumber}</span>
                      </td>
                      <td className="p-3 text-slate-700 font-medium">
                        {order.customer.district} ({order.customer.deliveryZone === 'inside_dhaka' ? 'ঢাকা' : 'বাইরে'})
                      </td>
                      <td className="p-3 font-black text-amber-600">
                        ৳{order.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          order.status === 'Delivered' 
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'In Courier'
                            ? 'bg-sky-100 text-sky-800'
                            : order.status === 'Confirmed'
                            ? 'bg-amber-100 text-amber-800'
                            : order.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      কোনো অর্ডার পাওয়া যায়নি!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* Right Column: Order Details Inspector & Admin Internal Notes */}
        {selectedOrder ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-5 space-y-5 flex flex-col">
            
            {/* Header Inspector */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  অর্ডার ইন্সপেক্টর
                </span>
                <span className="text-lg font-black font-mono text-slate-900">{selectedOrder.id}</span>
              </div>

              {/* Status Updater Dropdown */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">স্ট্যাটাস আপডেট:</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => onUpdateOrderStatus(selectedOrder.id, e.target.value as OrderStatus)}
                  className="bg-amber-50 border-2 border-amber-400 font-extrabold text-amber-900 text-xs py-1.5 px-2.5 rounded-xl cursor-pointer focus:outline-none"
                >
                  <option value="Pending">Pending (পেন্ডিং)</option>
                  <option value="Confirmed">Confirmed (কনফার্মড)</option>
                  <option value="In Courier">In Courier (কুরিয়ারে)</option>
                  <option value="Delivered">Delivered (ডেলিভার্ড)</option>
                  <option value="Cancelled">Cancelled (বাতিল)</option>
                </select>
              </div>
            </div>

            {/* Quick WhatsApp & Call Action Buttons */}
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/88${selectedOrder.customer.mobileNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপ মেসেজ</span>
              </a>

              <a
                href={`tel:${selectedOrder.customer.mobileNumber}`}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold p-2.5 rounded-xl text-xs border border-slate-300 transition-colors"
                title="Direct Phone Call"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Customer Details Box */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">
                কাস্টমার তথ্য
              </span>
              <div className="font-bold text-slate-900">{selectedOrder.customer.fullName}</div>
              <div className="text-slate-700 font-semibold">{selectedOrder.customer.mobileNumber}</div>
              <div className="text-slate-600">
                {selectedOrder.customer.address}, {selectedOrder.customer.thana}, {selectedOrder.customer.district}
              </div>
              {selectedOrder.customer.orderNote && (
                <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] mt-1 font-medium">
                  নোট: "{selectedOrder.customer.orderNote}"
                </div>
              )}
            </div>

            {/* Items Box */}
            <div className="space-y-2">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                অর্ডারকৃত পণ্য তালিকা
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 line-clamp-1">{it.product.titleBn}</div>
                      <div className="text-[10px] text-slate-500">{it.selectedColor.nameBn} | {it.selectedSize}</div>
                    </div>
                    <div className="font-extrabold text-amber-600">
                      ৳{it.product.offerPrice} × {it.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Internal Notes Area */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-1">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>এডমিন ইন্টারনাল প্রাইভেট নোট (Admin Internal Note)</span>
              </label>
              <textarea
                rows={3}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="অর্ডার ডেলিভারির বিশেষ তথ্য বা ফলোআপ নোট লিখুন..."
                className="w-full bg-slate-50 focus:bg-white text-xs p-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none"
              />
              <button
                onClick={handleSaveNote}
                className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>নোট সেভ করুন</span>
              </button>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-slate-400">
            তালিকা থেকে একটি অর্ডার সিলেক্ট করুন
          </div>
        )}

      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">স্টোরে নতুন পণ্য যোগ করুন</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">পণ্য নাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={newTitleBn}
                  onChange={(e) => setNewTitleBn(e.target.value)}
                  placeholder="যেমন: প্রিমিয়াম সিল্ক কটন শাড়ি"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">পণ্য নাম (English) *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Premium Silk Cotton Saree"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">মূল দাম (৳)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="2500"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">অফার দাম (৳)</label>
                  <input
                    type="number"
                    required
                    value={newOfferPrice}
                    onChange={(e) => setNewOfferPrice(e.target.value)}
                    placeholder="1800"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 rounded-xl shadow-md transition-all text-xs cursor-pointer mt-2"
              >
                পণ্যটি পাবলিশ করুন
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
