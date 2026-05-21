import React, { useState } from 'react';
import { Book, ReadingSession } from '../types';
import { TrendingUp, Award, Clock, BookOpen, Target, Flame, Sparkles, Star } from 'lucide-react';

interface InsightsProps {
  books: Book[];
  sessions: ReadingSession[];
  dailyGoalPages: number;
}

export default function Insights({ books, sessions, dailyGoalPages }: InsightsProps) {
  const [selectedRange, setSelectedRange] = useState<'week' | 'month'>('week');

  const totalPagesRead = sessions.reduce((acc, curr) => acc + curr.pagesRead, 0);
  const activeLoans = books.filter(b => b.category === 'loans');
  const completedBooks = books.filter(b => b.category === 'loans' && b.currentPage === b.totalPages).length;

  // Render responsive SVG Chart representing reading progression activity logged
  const maxPages = Math.max(...sessions.map(s => s.pagesRead), 40);

  return (
    <div className="flex-1 bg-[#0d1216] text-white flex flex-col h-screen overflow-hidden p-8 select-none">
      <div className="border-b border-[#c5a85c]/10 pb-6 mb-8 uppercase">
        <span className="font-serif text-[10px] tracking-[0.25em] text-[#c5a85c] block mb-2">Metrics Core</span>
        <h1 className="text-3xl font-serif font-light text-[#f4edd9] tracking-wide">Reading Insights</h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-8 pr-2">
        {/* 1. HIGHLIGHTS SCORECARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#141b21] border border-[#c5a85c]/10 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3.5 rounded bg-[#c5a85c]/10 text-[#dfba6b]">
              <BookOpen size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-gray-400 block">Accomplished Pages</span>
              <span className="font-serif text-2xl font-bold text-white block mt-0.5">{totalPagesRead}</span>
            </div>
          </div>

          <div className="bg-[#141b21] border border-[#c5a85c]/10 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3.5 rounded bg-emerald-500/10 text-emerald-400">
              <Award size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-gray-400 block">Books Completed</span>
              <span className="font-serif text-2xl font-bold text-white block mt-0.5">{completedBooks}</span>
            </div>
          </div>

          <div className="bg-[#141b21] border border-[#c5a85c]/10 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3.5 rounded bg-sky-500/10 text-sky-400">
              <Clock size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-gray-400 block">Active Stack Slots</span>
              <span className="font-serif text-2xl font-bold text-white block mt-0.5">{activeLoans.length}</span>
            </div>
          </div>

          <div className="bg-[#141b21] border border-[#c5a85c]/10 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3.5 rounded bg-amber-500/10 text-amber-500">
              <Flame size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-gray-400 block">Target Daily Goal</span>
              <span className="font-serif text-2xl font-bold text-white block mt-0.5">{dailyGoalPages} pages</span>
            </div>
          </div>
        </div>

        {/* 2. CORE COMPRESSION PLOT AND BREAKDOWN DIAGRAM */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* SVG Progression Column */}
          <div className="bg-[#141b21] border border-[#c5a85c]/10 p-6 rounded-xl lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-base text-[#f4edd9] font-semibold">Workspace Reading Performance Graph</h3>
                <p className="text-gray-400 text-xs">Page velocity logged on consecutive daily intervals</p>
              </div>

              {/* Range select */}
              <div className="flex bg-[#0d1216] border border-gray-800 p-1 rounded-lg text-[10px] font-mono uppercase">
                <button
                  onClick={() => setSelectedRange('week')}
                  className={`px-3 py-1 rounded cursor-pointer ${selectedRange === 'week' ? 'bg-[#c5a85c] text-black font-bold' : 'text-gray-400'}`}
                >
                  Weekly Log
                </button>
              </div>
            </div>

            {/* SVG Visual graph block */}
            <div className="h-64 bg-[#0d1216] rounded-xl border border-white/5 p-4 relative flex flex-col justify-between">
              
              {/* Gridlines */}
              <div className="absolute inset-x-0 top-1/4 border-b border-white/5 border-dashed" />
              <div className="absolute inset-x-0 top-2/4 border-b border-white/5 border-dashed" />
              <div className="absolute inset-x-0 top-3/4 border-b border-white/5 border-dashed" />

              {/* Dynamic SVG Drawing */}
              <svg className="w-full h-full pt-4 pb-2 z-10" viewBox="0 0 500 150">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#c5a85c" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#c5a85c" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Plot Area */}
                <path
                  d={`M0 130 
                     L100 ${130 - (sessions[0]?.pagesRead / maxPages) * 100}
                     L200 ${130 - (sessions[1]?.pagesRead / maxPages) * 100}
                     L300 ${130 - (sessions[2]?.pagesRead / maxPages) * 100}
                     L400 ${130 - (sessions[3]?.pagesRead / maxPages) * 100}
                     L500 130 Z`}
                  fill="url(#chartGradient)"
                />
                
                <path
                  d={`M100 ${130 - (sessions[0]?.pagesRead / maxPages) * 100}
                     L200 ${130 - (sessions[1]?.pagesRead / maxPages) * 100}
                     L300 ${130 - (sessions[2]?.pagesRead / maxPages) * 100}
                     L400 ${130 - (sessions[3]?.pagesRead / maxPages) * 100}`}
                  stroke="#dfba6b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />

                {/* Plot Dots */}
                {sessions.map((sess, index) => {
                  const cx = (index + 1) * 100;
                  const cy = 130 - (sess.pagesRead / maxPages) * 100;
                  return (
                    <g key={index}>
                      <circle cx={cx} cy={cy} r="6" fill="#0d1216" stroke="#dfba6b" strokeWidth="2.5" />
                      <text x={cx} y={cy - 12} textAnchor="middle" fill="#f4edd9" fontSize="9" fontFamily="monospace">
                        {sess.pagesRead}p
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Labels Row */}
              <div className="flex justify-between font-mono text-[9px] text-gray-500 uppercase px-6">
                <span>{sessions[0]?.date || 'May 18'}</span>
                <span>{sessions[1]?.date || 'May 19'}</span>
                <span>{sessions[2]?.date || 'May 20'}</span>
                <span>{sessions[3]?.date || 'May 21'}</span>
              </div>
            </div>
          </div>

          {/* Target Milestone Block */}
          <div className="bg-[#141b21] border border-[#c5a85c]/10 p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#dfba6b]" />
              <span className="font-serif text-xs text-[#dfba6b] uppercase font-bold">
                Archival Milestones
              </span>
            </div>
            
            <p className="text-gray-400 text-xs font-serif leading-relaxed">
              Retrieve or unlock special badges as you maintain your literary commitments:
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3 items-center p-3 bg-[#0d1216] border border-white/5 rounded-lg">
                <div className="w-9 h-9 bg-amber-500/10 text-amber-500 rounded flex items-center justify-center font-bold">
                  ★
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#dfba6b]">First Folio Apprentice</h4>
                  <p className="text-[10px] text-gray-400">Logged 100 pages inside the stacks</p>
                </div>
              </div>

              <div className="flex gap-3 items-center p-3 bg-[#0d1216] border border-white/5 rounded-lg opacity-40">
                <div className="w-9 h-9 bg-gray-500/10 text-gray-400 rounded flex items-center justify-center font-bold">
                  ⚜
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-gray-400">Pemberley Companion</h4>
                  <p className="text-[10px] text-gray-400">Maintain a 5-day continuous reading streak</p>
                </div>
              </div>

              <div className="flex gap-3 items-center p-3 bg-[#0d1216] border border-white/5 rounded-lg opacity-40">
                <div className="w-9 h-9 bg-gray-500/10 text-gray-400 rounded flex items-center justify-center font-bold">
                  🕮
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-gray-400">Archivist Alchemist</h4>
                  <p className="text-[10px] text-gray-400">Complete 3 unique book categories</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
