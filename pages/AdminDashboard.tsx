
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckCircle, Package, Search, LogOut, Lock, Unlock, RefreshCw, CreditCard, Building2 } from 'lucide-react';
import { Order } from '../types';
import Logo from '../components/Logo';

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isManualLocked, setIsManualLocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedOrders = JSON.parse(localStorage.getItem('sy_data_orders') || '[]');
    setOrders(savedOrders.filter((o: Order) => o.method === 'MANUAL'));
    
    const lockState = localStorage.getItem('sy_data_manual_locked');
    setIsManualLocked(lockState === 'true');
  };

  const toggleManualLock = () => {
    const newState = !isManualLocked;
    setIsManualLocked(newState);
    localStorage.setItem('sy_data_manual_locked', String(newState));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert("Invalid admin password!");
    }
  };

  const markAsSent = (id: string) => {
    const master = JSON.parse(localStorage.getItem('sy_data_orders') || '[]');
    const updatedMaster = master.map((o: Order) => o.id === id ? { ...o, status: 'SENT' } : o);
    localStorage.setItem('sy_data_orders', JSON.stringify(updatedMaster));
    loadData();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 bg-slate-900">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 space-y-6 shadow-2xl animate-fade-in">
          <Logo size="sm" />
          <div className="text-center">
            <h2 className="text-xl font-bold">Admin Portal</h2>
            <p className="text-slate-500 text-sm">Enter password to access dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin Password"
              className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition-colors">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pendingCount = orders.filter(o => o.status === 'PENDING').length;

  return (
    <div className="flex-1 bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Logo size="sm" />
          <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
          <div className="flex items-center gap-2 text-slate-600 font-bold">
            <LayoutDashboard size={20} />
            Admin Dashboard
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={loadData} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
            <RefreshCw size={20} />
          </button>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-medium"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isManualLocked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {isManualLocked ? <Lock size={24} /> : <Unlock size={24} />}
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Manual Processing System</h3>
              <p className="text-sm text-slate-500">
                Currently: {isManualLocked ? 'Locked (Busy)' : 'Active (Available)'}
              </p>
            </div>
          </div>
          <button 
            onClick={toggleManualLock}
            className={`px-8 py-3 rounded-xl font-bold transition-all shadow-md ${
              isManualLocked 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {isManualLocked ? 'Enable Manual Orders' : 'Disable Manual Orders'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">Pending Manual</p>
              <h3 className="text-3xl font-black text-slate-900">{pendingCount}</h3>
            </div>
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
              <Package size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">Total Manual Orders</p>
              <h3 className="text-3xl font-black text-slate-900">{orders.length}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <Search size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h4 className="font-bold text-slate-800">Manual Order Management</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Network</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Phone Number</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                      No manual orders found yet.
                    </td>
                  </tr>
                ) : (
                  orders.sort((a,b) => b.createdAt - a.createdAt).map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-400 uppercase">{order.id}</td>
                      <td className="px-6 py-4">
                        <span className="font-black text-xs text-slate-700">{order.network}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">{order.plan}</td>
                      <td className="px-6 py-4 font-mono text-slate-600">{order.phoneNumber}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-[10px] font-bold">
                          {order.paymentMethod === 'CARD' ? (
                            <><CreditCard size={12} className="text-blue-500" /> CARD</>
                          ) : (
                            <><Building2 size={12} className="text-green-500" /> TRANSFER</>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                          order.status === 'SENT' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {order.status === 'PENDING' ? (
                          <button
                            onClick={() => markAsSent(order.id)}
                            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                          >
                            <CheckCircle size={14} />
                            Complete
                          </button>
                        ) : (
                          <span className="text-slate-400 text-xs flex items-center gap-1 italic">
                            <CheckCircle size={14} className="text-green-500" /> Finished
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
