
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Clock, CheckCircle2, Package, Phone } from 'lucide-react';
import { Order } from '../types';
import Logo from '../components/Logo';

const OrderTracker: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [results, setResults] = useState<Order[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const master = JSON.parse(localStorage.getItem('sy_data_orders') || '[]');
    const found = master.filter((o: Order) => o.phoneNumber === phone);
    setResults(found);
    setHasSearched(true);
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <Logo size="sm" />
        <div className="w-10"></div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Track Your Data</h2>
          <p className="text-slate-500">Enter your phone number to check order status</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="tel"
              required
              placeholder="08123456789"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 rounded-2xl font-bold hover:bg-blue-700 transition-colors">
            <Search size={24} />
          </button>
        </form>

        {hasSearched && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            {results && results.length > 0 ? (
              results.sort((a,b) => b.createdAt - a.createdAt).map((order) => (
                <div key={order.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      order.status === 'SENT' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {order.status === 'SENT' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{order.network} {order.plan}</span>
                        <span className="text-[10px] text-slate-400 font-mono uppercase">#{order.id}</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Ordered on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                      order.status === 'SENT' ? 'bg-green-500 text-white shadow-sm shadow-green-100' : 'bg-orange-400 text-white'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Package className="mx-auto mb-2 opacity-20" size={48} />
                <p>No orders found for this number.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracker;
