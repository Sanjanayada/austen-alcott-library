import React, { useState } from 'react';
import { Book } from '../types';
import { Sparkles, MessageSquare, Compass, Search, BookOpen, Star, RefreshCw } from 'lucide-react';

interface DiscoverProps {
  books: Book[];
  setActiveBookId: (id: string) => void;
  setCurrentView: (view: string) => void;
}

export default function Discover({ books, setActiveBookId, setCurrentView }: DiscoverProps) {
  const [currentGenre, setCurrentGenre] = useState<string>('All');
  const [lrbSuggestion, setLrbSuggestion] = useState<{
    title: string;
    author: string;
    quote: string;
    explanation: string;
  } | null>(null);
  const [isLibrarianConsulting, setIsLibrarianConsulting] = useState(false);

  const LIBRARIAN_ADVICE_POOL = [
    {
      title: "Frankenstein",
      author: "Mary Shelley",
      quote: "Nothing is so painful to the mind as a great and sudden change.",
      explanation: "Shelley's masterpiece is perfect for deep, rainy evening contemplations. If you are seeking atmospheric intensity, start this gothic narrative immediately."
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      quote: "Angry people are not always wise.",
      explanation: "Austen’s classic social comedy brings brilliant wit and romance to your shelf. Perfect to heal a tired mind with elegant, biting satire."
    },
    {
      title: "The Fourth Wing",
      author: "Rebecca Yarros",
      quote: "A dragon without its rider is a tragedy. A rider without their dragon is dead.",
      explanation: "In the mood for soaring, high-stakes dragon fantasy? This book features intense pacing and fierce military college trials that will keep you up all night."
    },
    {
      title: "Little Women",
      author: "Louisa May Alcott",
      quote: "I am not afraid of storms, for I am learning how to sail my ship.",
      explanation: "A cozy Civil-War family classic that wraps around you like a warm quilt. If you need peace, family warmth, and Jo’s inspiration, pick up Little Women."
    }
  ];

  const handleConsultLibrarian = () => {
    setIsLibrarianConsulting(true);
    setLrbSuggestion(null);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * LIBRARIAN_ADVICE_POOL.length);
      setLrbSuggestion(LIBRARIAN_ADVICE_POOL[idx]);
      setIsLibrarianConsulting(false);
    }, 1200);
  };

  return (
    <div className="flex-1 bg-[#0d1216] text-white flex flex-col h-screen overflow-hidden p-8 select-none">
      
      {/* Header banner */}
      <div className="border-b border-[#c5a85c]/10 pb-6 mb-8 uppercase">
        <span className="font-serif text-[10px] tracking-[0.25em] text-[#c5a85c] block mb-2">Discovery Deck</span>
        <h1 className="text-3xl font-serif font-light text-[#f4edd9] tracking-wide">Explore Stacks</h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-8 pr-2">
        {/* 1. INTERACTIVE LIBRARIAN DISPENSER */}
        <div className="p-6 bg-[#141b21] border border-[#c5a85c]/15 rounded-xl shadow-lg relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-tr from-[#c5a85c]/10 to-transparent blur-2xl pointer-events-none" />

          {/* Left instructions block */}
          <div className="flex-1 space-y-3 z-10">
            <div className="flex items-center gap-2 text-amber-500 font-serif text-xs uppercase font-extrabold tracking-widest">
              <Sparkles size={16} className="animate-pulse" />
              <span>Patron Advisory Core</span>
            </div>
            <h2 className="font-serif text-xl font-light text-white leading-normal">
              Experiencing Bibliophile Reader’s Block?
            </h2>
            <p className="text-gray-400 text-xs leading-relaxed max-w-lg">
              Consult the Austen & Alcott Librarian matching core today. We will shuffle original texts, match your historic reading, and provide a dedicated guidance card.
            </p>

            <button
              id="consult-librarian-btn"
              onClick={handleConsultLibrarian}
              disabled={isLibrarianConsulting}
              className="px-6 py-3 bg-[#c5a85c] hover:bg-[#dfba6b] text-[#0d1216] font-serif font-bold text-xs tracking-widest uppercase rounded cursor-pointer transition-all flex items-center gap-2.5 shadow-md disabled:opacity-50"
            >
              <RefreshCw size={13} className={isLibrarianConsulting ? 'animate-spin' : ''} />
              <span>{isLibrarianConsulting ? 'Whispering to Archive...' : 'Consult Librarian'}</span>
            </button>
          </div>

          {/* Right output banner */}
          <div className="w-full md:w-96 min-h-48 bg-[#0d1216]/90 border border-white/5 rounded-xl p-5 flex flex-col justify-center text-center relative z-10">
            {isLibrarianConsulting ? (
              <div className="text-center space-y-2">
                <div className="inline-block w-8 h-8 rounded-full border-2 border-dashed border-[#c5a85c] animate-spin mb-2" />
                <p className="font-serif text-xs text-gray-400 italic">"Ah. Shelves are speaking. Rolling ancient card catalogs..."</p>
              </div>
            ) : lrbSuggestion ? (
              <div className="space-y-4 text-left">
                <div>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block">RECOMMENDED WORK:</span>
                  <h4 className="font-serif text-sm font-bold text-[#dfba6b]">{lrbSuggestion.title}</h4>
                  <p className="text-xs text-gray-400">By {lrbSuggestion.author}</p>
                </div>
                
                <div className="p-3 bg-[#11171d] rounded border-l-2 border-[#c5a85c]">
                  <p className="font-serif text-xs italic text-gray-300 leading-relaxed font-light">
                    "{lrbSuggestion.quote}"
                  </p>
                </div>

                <p className="text-[11px] text-gray-400 leading-normal font-serif">
                  {lrbSuggestion.explanation}
                </p>

                <button
                  onClick={() => {
                    const target = books.find(b => b.title === lrbSuggestion.title);
                    if (target) {
                      setActiveBookId(target.id);
                      setCurrentView('dashboard');
                    }
                  }}
                  className="w-full py-2 bg-transparent text-[#c5a85c] hover:bg-[#c5a85c] hover:text-[#0d1216] border border-[#c5a85c]/40 hover:border-[#c5a85c] font-serif text-[11px] uppercase tracking-widest rounded cursor-pointer transition-all text-center"
                >
                  Retrieve Book Stack Details
                </button>
              </div>
            ) : (
              <div className="text-center space-y-2 opacity-50 py-4">
                <MessageSquare size={36} className="mx-auto text-[#c5a85c] opacity-30 animate-bounce-slow" />
                <span className="font-serif text-xs text-[#c5a85c] uppercase tracking-widest block font-medium">Silent Stack Vault</span>
                <p className="font-sans text-[11px] text-gray-500 leading-relaxed max-w-xs mx-auto">
                  Click the button to receive an instant, bespoke recommendation tailored to your soul.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 2. DISCOVERY CARDS */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg text-[#f4edd9] font-light">Featured Archival Readings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#141b21] border border-white/5 rounded-xl p-5 hover:border-[#c5a85c]/10 transition-all flex gap-4">
              <div className="w-16 aspect-[3/4] bg-black rounded overflow-hidden">
                <img src={books[0].cover} alt="b1" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-xs font-bold text-gray-100">The Rise of Fantasy</h4>
                  <p className="text-[10px] text-gray-500 mt-1">Explore current high-stakes fantasy in modern fiction stacks.</p>
                </div>
                <button 
                  onClick={() => { setActiveBookId(books[0].id); setCurrentView('dashboard'); }}
                  className="text-[10px] text-[#c5a85c] hover:underline hover:text-[#dfba6b] font-mono uppercase self-start"
                >
                  Inspect Stack
                </button>
              </div>
            </div>

            <div className="bg-[#141b21] border border-white/5 rounded-xl p-5 hover:border-[#c5a85c]/10 transition-all flex gap-4 font-serif">
              <div className="w-16 aspect-[3/4] bg-black rounded overflow-hidden">
                <img src={books[4].cover} alt="b2" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-xs font-bold text-gray-100">Womens Period SAGAS</h4>
                  <p className="text-[10px] text-gray-500 mt-1 font-sans">Journey into cozy domestic life, family values, and growing archives.</p>
                </div>
                <button 
                  onClick={() => { setActiveBookId(books[4].id); setCurrentView('dashboard'); }}
                  className="text-[10px] text-[#c5a85c] hover:underline hover:text-[#dfba6b] font-mono uppercase self-start"
                >
                  Inspect Stack
                </button>
              </div>
            </div>

            <div className="bg-[#141b21] border border-white/5 rounded-xl p-5 hover:border-[#c5a85c]/10 transition-all flex gap-4">
              <div className="w-16 aspect-[3/4] bg-black rounded overflow-hidden">
                <img src={books[3].cover} alt="b3" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-xs font-bold text-gray-100">Gothic Regency Romance</h4>
                  <p className="text-[10px] text-gray-500 mt-1">Uncover historical satire and elegant civil sparring selections.</p>
                </div>
                <button 
                  onClick={() => { setActiveBookId(books[3].id); setCurrentView('dashboard'); }}
                  className="text-[10px] text-[#c5a85c] hover:underline hover:text-[#dfba6b] font-mono uppercase self-start"
                >
                  Inspect Stack
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
