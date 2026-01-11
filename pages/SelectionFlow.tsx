
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Phone, CreditCard, ChevronRight, Zap, Clock, AlertCircle, Building2, Copy } from 'lucide-react';
import { Network, Method, DataPlan, Order, PaymentMethod } from '../types';
import { PLANS, NETWORK_LOGOS } from '../constants';
import Logo from '../components/Logo';

const SelectionFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [network, setNetwork] = useState<Network | null>(null);
  const [method, setMethod] = useState<Method | null>(null);
  const [plan, setPlan] = useState<DataPlan | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isManualLocked, setIsManualLocked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const lockState = localStorage.getItem('sy_data_manual_locked');
    setIsManualLocked(lockState === 'true');
  }, []);

  const handleNetworkSelect = (n: Network) => {
    setNetwork(n);
    setStep(2);
  };

  const handleMethodSelect = (m: Method) => {
    if (m === 'MANUAL' && isManualLocked) return;
    setMethod(m);
    setStep(3);
  };

  const handlePlanSelect = (p: DataPlan) => {
    setPlan(p);
    setStep(4);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    setStep(5);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("1234567890");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinalPayment = async () => {
    if (!paymentMethod) return;
    setIsProcessing(true);
    
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      network: network!,
      method: method!,
      plan: plan!.label,
      price: plan!.price,
      phoneNumber,
      paymentMethod,
      status: 'PENDING',
      createdAt: Date.now()
    };

    const existingOrders = JSON.parse(localStorage.getItem('sy_data_orders') || '[]');
    localStorage.setItem('sy_data_orders', JSON.stringify([...existingOrders, newOrder]));
    localStorage.setItem('sy_data_last_order_id', newOrder.id);

    setTimeout(() => {
      navigate('/status');
    }, 1000);
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate('/')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <Logo size="sm" />
        <div className="w-10"></div>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between mb-12 px-4 relative">
        <div className="absolute top-5 left-10 right-10 h-0.5 bg-slate-200 -z-10" />
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="relative flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all z-10 ${
              step >= s ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 text-slate-400 bg-white'
            }`}>
              {step > s ? <Check size={20} /> : s}
            </div>
            <div className="absolute -bottom-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center w-20">
              {s === 1 && 'Network'}
              {s === 2 && 'Method'}
              {s === 3 && 'Plan'}
              {s === 4 && 'Number'}
              {s === 5 && 'Payment'}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 relative min-h-[400px]">
        
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Select Your Network</h2>
              <p className="text-slate-500">Choose the provider you want to top up</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {(['MTN', 'AIRTEL', 'GLO'] as Network[]).map((n) => (
                <button
                  key={n}
                  onClick={() => handleNetworkSelect(n)}
                  className={`flex items-center gap-5 p-5 rounded-2xl border-2 transition-all group bg-white hover:border-blue-500 hover:shadow-md border-slate-100`}
                >
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center p-2 bg-slate-50`}>
                    <img src={NETWORK_LOGOS[n]} alt={n} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-xl font-bold text-slate-800">{n}</span>
                    <p className="text-xs text-slate-400">Stable connection & fast delivery</p>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-blue-500 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step > 1 && network && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
             <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-100 w-16 h-16 flex items-center justify-center">
                <img src={NETWORK_LOGOS[network]} alt={network} className="max-w-full max-h-full object-contain" />
             </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 pt-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Manual or Auto?</h2>
              <p className="text-slate-500">Pick how you want to process this order</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                disabled={isManualLocked}
                onClick={() => handleMethodSelect('MANUAL')}
                className={`p-6 rounded-2xl border-2 text-left space-y-4 transition-all relative group ${
                  isManualLocked 
                    ? 'border-slate-100 bg-slate-50 cursor-not-allowed opacity-70' 
                    : 'border-slate-200 hover:border-blue-500 hover:bg-blue-50/30'
                } ${method === 'MANUAL' ? 'border-blue-500 bg-blue-50/50' : ''}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isManualLocked ? 'bg-slate-200 text-slate-400' : 'bg-orange-100 text-orange-600'}`}>
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    Manual 
                    {isManualLocked && <span className="text-[10px] font-black uppercase bg-red-100 text-red-600 px-2 py-0.5 rounded">Busy</span>}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isManualLocked ? "Admin busy. Please try later or use Auto." : "Cheapest price, 5mins max wait."}
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleMethodSelect('AUTO')}
                className={`p-6 rounded-2xl border-2 text-left space-y-4 transition-all hover:border-blue-500 hover:bg-blue-50/30 ${
                  method === 'AUTO' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200'
                }`}
              >
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Automatic</h3>
                  <p className="text-xs text-slate-500">Instant delivery in seconds.</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 3 && network && method && (
          <div className="space-y-6 pt-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Pick a Data Plan</h2>
              <p className="text-slate-500">For <span className="font-bold text-blue-600">{network} ({method})</span></p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {PLANS[network][method].map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePlanSelect(p)}
                  className={`p-4 rounded-xl border-2 text-center transition-all hover:border-blue-600 ${
                    plan?.id === p.id ? 'border-blue-600 bg-blue-50' : 'border-slate-100 bg-slate-50'
                  }`}
                >
                  <div className="text-lg font-bold text-slate-800">{p.label}</div>
                  <div className="text-blue-600 font-extrabold text-xl">₦{p.price}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && plan && (
          <div className="space-y-6 pt-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Your Number</h2>
              <p className="text-slate-500">Where should we send the <span className="font-bold">{plan.label}</span>?</p>
            </div>
            
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Phone size={16} /> Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 08123456789"
                  className="w-full p-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-2xl tracking-widest font-mono text-center"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl text-xl font-bold shadow-lg transition-all active:scale-95"
              >
                Continue to Payment
              </button>
            </form>
          </div>
        )}

        {step === 5 && plan && (
          <div className="space-y-6 pt-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Select Payment Method</h2>
              <p className="text-slate-500">Pay ₦{plan.price} for {network} {plan.label}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Card Payment Option */}
              <button
                onClick={() => setPaymentMethod('CARD')}
                className={`p-6 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                  paymentMethod === 'CARD' ? 'border-blue-600 bg-blue-50 shadow-inner' : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <CreditCard size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">Pay with Card</h3>
                  <p className="text-xs text-slate-500">Secure Flutterwave Payment (Instant)</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'CARD' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                  {paymentMethod === 'CARD' && <Check size={14} className="text-white" />}
                </div>
              </button>

              {/* Bank Transfer Option */}
              <button
                onClick={() => setPaymentMethod('TRANSFER')}
                className={`p-6 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                  paymentMethod === 'TRANSFER' ? 'border-blue-600 bg-blue-50 shadow-inner' : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <Building2 size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">Bank Transfer</h3>
                  <p className="text-xs text-slate-500">Manual verification (Up to 5 mins)</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'TRANSFER' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                  {paymentMethod === 'TRANSFER' && <Check size={14} className="text-white" />}
                </div>
              </button>
            </div>

            {/* Bank Details (Only visible if transfer selected) */}
            {paymentMethod === 'TRANSFER' && (
              <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Bank Name</p>
                  <p className="text-lg font-bold">OPAY / MONIEPOINT</p>
                </div>
                <div className="flex items-center justify-between group">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Account Number</p>
                    <p className="text-2xl font-black tracking-widest">1234567890</p>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                  >
                    {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                  </button>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Account Name</p>
                  <p className="text-lg font-bold">SY DATA SERVICES</p>
                </div>
                <p className="text-[10px] text-center text-slate-500 italic pt-2 border-t border-white/10">
                  Please click "Verify Payment" after sending the money.
                </p>
              </div>
            )}

            <button
              onClick={handleFinalPayment}
              disabled={!paymentMethod || isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl text-xl font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {paymentMethod === 'TRANSFER' ? 'I have Paid (Verify)' : 'Proceed to Payment'}
              {isProcessing && <Zap className="animate-pulse" size={20} />}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default SelectionFlow;
