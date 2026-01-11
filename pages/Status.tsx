
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, Home } from 'lucide-react';

const Status: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Wait 4 seconds as requested to be "patient"
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800 italic">"Process is processing, wait patiently my dear"</h2>
          <p className="text-slate-500 animate-pulse">Verifying payment with Flutterwave...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 animate-fade-in">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
        <CheckCircle2 size={64} />
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl font-black text-slate-900">Success!</h2>
        <p className="text-slate-600 max-w-sm mx-auto">
          Your payment was successful and your order has been queued. If you chose Manual, it will be sent within 5 minutes.
        </p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 bg-slate-800 text-white px-8 py-3 rounded-full font-bold transition-all hover:bg-slate-900"
      >
        <Home size={20} />
        Go Home
      </button>
    </div>
  );
};

export default Status;
