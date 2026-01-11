
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Clock, Search } from 'lucide-react';
import Logo from '../components/Logo';
import { NETWORK_LOGOS } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center px-4 py-8">
      <div className="max-w-4xl w-full text-center space-y-12">
        <div className="animate-fade-in mt-8">
          <Logo size="lg" />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Cheap, Fast & Reliable <br />
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">Data Solutions</span> for You.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stay connected with the most affordable data plans in Nigeria. 
            Choose your network and top up instantly or save more with our manual processing.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 pt-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/buy')}
              className="group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl text-2xl font-black shadow-2xl shadow-blue-200 transition-all hover:scale-105 active:scale-95"
            >
              Get Started
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/track')}
              className="group flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 px-8 py-5 rounded-2xl text-xl font-bold transition-all hover:border-blue-300"
            >
              <Search size={24} />
              Track Order
            </button>
          </div>

          {/* Supported Networks Logos */}
          <div className="space-y-4 w-full">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Supported Networks</p>
            <div className="flex justify-center items-center gap-8 md:gap-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <img src={NETWORK_LOGOS.MTN} alt="MTN" className="h-8 md:h-12 w-auto object-contain" />
              <img src={NETWORK_LOGOS.AIRTEL} alt="Airtel" className="h-8 md:h-12 w-auto object-contain" />
              <img src={NETWORK_LOGOS.GLO} alt="Glo" className="h-8 md:h-12 w-auto object-contain" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-slate-200">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-2 rotate-3 hover:rotate-0 transition-transform">
              <Zap size={28} />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Instant Delivery</h3>
            <p className="text-sm text-slate-500">Automatic methods process your request in seconds.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-2 -rotate-3 hover:rotate-0 transition-transform">
              <ShieldCheck size={28} />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Secure Payments</h3>
            <p className="text-sm text-slate-500">Your transactions are safe with Flutterwave encryption.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-2 rotate-6 hover:rotate-0 transition-transform">
              <Clock size={28} />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Cheap Rates</h3>
            <p className="text-sm text-slate-500">Get the best prices on the market, manual or auto.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
