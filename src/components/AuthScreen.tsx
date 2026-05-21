import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LIBRARY_BG } from '../data';
import Logo from './Logo';
import { Lock, User, Sparkles, LogIn, ChevronRight, Bookmark } from 'lucide-react';

interface AuthScreenProps {
  onLoginSuccess: (username: string) => void;
  onBackToIntro: () => void;
}

export default function AuthScreen({ onLoginSuccess, onBackToIntro }: AuthScreenProps) {
  const [username, setUsername] = useState('Jane');
  const [libraryCode, setLibraryCode] = useState('AA-1813-99');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorInput, setErrorInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorInput('Please reveal your name to the librarian.');
      return;
    }
    setErrorInput('');
    onLoginSuccess(username);
  };

  const handleQuickLoginAsJane = () => {
    onLoginSuccess('Jane');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex bg-[#0c1013] text-white">
      {/* LEFT PANE: Cinematic Library Background */}
      <div className="hidden lg:flex lg:w-3/5 h-full relative overflow-hidden flex-col justify-between p-12 select-none border-r border-[#c5a85c]/15">
        {/* Background Image with Gold Grading Filters */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
          style={{ backgroundImage: `url('${LIBRARY_BG}')` }}
          referrerPolicy="no-referrer"
        />
        {/* Ambiance gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0c1013]/60 to-[#0c1013]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090b0d] via-transparent to-[#1a1200]/30" />

        {/* Top brand stamp */}
        <div className="relative z-10 flex items-center gap-3">
          <Logo size={48} className="!mb-0 scale-75" />
          <div>
            <span className="font-serif text-sm tracking-[0.2em] font-medium text-[#dfba6b] block">AA</span>
            <span className="font-mono text-[9px] tracking-widest uppercase text-gray-400">Archival Stack II</span>
          </div>
        </div>

        {/* Atmospheric classical quotes overlay */}
        <div className="relative z-10 max-w-lg mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <span className="text-[#c5a85c] font-mono text-xs tracking-widest uppercase block mb-3">
              — EST. 1813
            </span>
            <blockquote className="font-serif text-2xl leading-relaxed text-[#f4edd9] font-light mb-4 italic">
              "I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a book!"
            </blockquote>
            <cite className="font-sans text-xs tracking-wider font-semibold text-gray-400 not-italic uppercase">
              Jane Austen, Pride and Prejudice
            </cite>
          </motion.div>
        </div>

        {/* Ambient indicator */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex -space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0c1013] pulse-ring" />
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-gray-400">
            Austen & Alcott Vault: ONLINE
          </span>
        </div>
      </div>

      {/* RIGHT PANE: Interactive Login Controls */}
      <div className="w-full lg:w-2/5 h-full flex flex-col justify-center items-center px-8 sm:px-12 md:px-16 relative z-10 bg-[#0c1013]">
        {/* Tiny retro button to return to loading intro */}
        <button
          onClick={onBackToIntro}
          className="absolute top-8 right-8 font-mono text-[10px] tracking-widest text-[#c5a85c] hover:text-[#dfba6b] transition-colors uppercase cursor-pointer flex items-center gap-1.5 border border-[#c5a85c]/20 px-3 py-1.5 hover:border-[#c5a85c]/60 rounded-sm"
        >
          <Bookmark size={10} /> Reset Vault
        </button>

        <div className="w-full max-w-md flex flex-col items-center">
          {/* logo */}
          <Logo size={100} className="mb-6 lg:mb-8" />

          {/* headers */}
          <div className="text-center mb-8 lg:mb-10 w-full">
            <h2 className="text-xl md:text-2xl font-serif text-[#dfba6b] tracking-wider mb-2">
              {isRegistering ? 'Join the Literary Guild' : 'Enter the Stack Vault'}
            </h2>
            <p className="text-xs text-gray-400 tracking-wider">
              {isRegistering
                ? 'Register your patron card for full stack access'
                : 'Please verify your credentials to retrieve your reading shelf'}
            </p>
          </div>

          {/* Quick bypass element */}
          <div className="w-full mb-6 p-4 bg-[#141b21] border border-[#c5a85c]/20 rounded-lg flex flex-col items-center justify-between text-center shadow-lg gap-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#dfba6b] animate-bounce-slow" />
              <span className="font-serif text-xs text-[#dfba6b] font-medium">
                Authorized Workspace Sandbox
              </span>
            </div>
            <p className="text-xs text-gray-400 max-w-xs leading-normal">
              Log in instantly using Jane's pre-configured archive from the user-uploaded mockup.
            </p>
            <button
              onClick={handleQuickLoginAsJane}
              id="quick-login-btn"
              type="button"
              className="w-full py-2 bg-[#c5a85c] hover:bg-[#dfba6b] text-[#0c1013] font-serif font-bold text-xs tracking-widest uppercase rounded cursor-pointer transition-all flex items-center justify-center gap-2 group shadow-md"
            >
              <span>Quick Enter As Jane</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="w-full flex items-center justify-center gap-4 my-4 opacity-50">
            <div className="h-[1px] bg-gray-800 flex-1" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500">OR</span>
            <div className="h-[1px] bg-gray-800 flex-1" />
          </div>

          {/* Standard Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-2 font-medium">
                Patron Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-500">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Jane Bennet"
                  className="w-full bg-[#11171c]/90 border border-[#c5a85c]/20 hover:border-[#c5a85c]/40 focus:border-[#c5a85c] text-white pl-10 pr-4 py-3 text-sm rounded outline-none placeholder-gray-600 transition-all font-serif"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-2 font-medium">
                Patron Library Card ID
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-500">
                  <Lock size={16} />
                </span>
                <input
                  type="text"
                  value={libraryCode}
                  onChange={(e) => setLibraryCode(e.target.value)}
                  placeholder="AA-XXXX-XX"
                  className="w-full bg-[#11171c]/90 border border-[#c5a85c]/20 hover:border-[#c5a85c]/40 focus:border-[#c5a85c] text-white pl-10 pr-4 py-3 text-sm rounded outline-none placeholder-gray-600 transition-all font-mono"
                />
              </div>
            </div>

            {errorInput && (
              <p className="text-red-400 text-xs font-mono tracking-wide text-center pt-1">
                ⚠️ {errorInput}
              </p>
            )}

            <button
              id="standard-auth-submit"
              type="submit"
              className="w-full py-3 bg-transparent border border-[#c5a85c] text-[#dfba6b] hover:bg-[#c5a85c] hover:text-[#0c1013] font-serif font-semibold text-xs tracking-widest uppercase rounded cursor-pointer transition-all flex items-center justify-center gap-2 group mt-6"
            >
              <LogIn size={14} />
              <span>{isRegistering ? 'Issue Patron Card' : 'Verify Credentials'}</span>
            </button>
          </form>

          {/* Form toggle links */}
          <div className="mt-8 text-center text-[11px] text-gray-500">
            <span>
              {isRegistering ? 'Already in our registers?' : 'First time at Austen & Alcott?'}
            </span>{' '}
            <button
              id="form-toggle-link"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-[#c5a85c] hover:underline font-serif ml-1 cursor-pointer focus:outline-none"
            >
              {isRegistering ? 'Sign in to access stack' : 'Apply for Guild registry'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
