import React, { useState, useEffect } from 'react';
import { Book, ReadingSession } from '../types';
import { 
  Search, 
  Bell, 
  BookMarked, 
  Bookmark, 
  Plus, 
  Star, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  Award, 
  ArrowRight,
  BookOpen,
  Volume2,
  Check,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

interface DashboardProps {
  books: Book[];
  activeBookId: string;
  setActiveBookId: (id: string) => void;
  onUpdateBook: (updatedBook: Book) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  streakDays: number;
  dailyGoalPages: number;
  sessions: ReadingSession[];
  username: string;
}

export default function Dashboard({
  books,
  activeBookId,
  setActiveBookId,
  onUpdateBook,
  searchQuery,
  setSearchQuery,
  streakDays,
  dailyGoalPages,
  sessions,
  username
}: DashboardProps) {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [readingSpeed, setReadingSpeed] = useState<number>(30); // pages per day
  const [timeState, setTimeState] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [hoveredBookId, setHoveredBookId] = useState<string | null>(null);

  // Clock Update
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTimeState(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter genres list
  const genres = ['All', ...Array.from(new Set(books.map((b) => b.genre.split(' / ')[0])))];

  // Get current active book object
  const activeBook = books.find((b) => b.id === activeBookId) || books[0];

  // Filter books list
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedGenre === 'All') return matchesSearch;
    return matchesSearch && book.genre.startsWith(selectedGenre);
  });

  // Calculate remaining reading days estimation
  const pgsLeft = activeBook ? (activeBook.totalPages - activeBook.currentPage) : 0;
  const daysEstimate = Math.ceil(pgsLeft / readingSpeed);

  // Quick Action: Bookmark / Toggle labels
  const handleToggleLabel = (badge: string) => {
    if (!activeBook) return;
    const hasLabel = activeBook.labels.includes(badge);
    const updated: Book = {
      ...activeBook,
      labels: hasLabel 
        ? activeBook.labels.filter(g => g !== badge)
        : [...activeBook.labels, badge]
    };
    onUpdateBook(updated);
  };

  // Add to stack quick option
  const handleAddToStack = (book: Book) => {
    const updated: Book = {
      ...book,
      category: 'loans',
      dueDate: '14 days left'
    };
    onUpdateBook(updated);
  };

  const notificationList = [
    { id: 1, title: "Loan Reminder", body: "Frankenstein is due in 7 days", time: "Just now" },
    { id: 2, title: "Hold Ready", body: "Pride and Prejudice is now ready for retrieval", time: "2 hours ago" },
    { id: 3, title: "Streak Saved!", body: "Bravo! You logged reading 4 days in a row.", time: "1 day ago" }
  ];

  return (
    <div className="flex-1 bg-[#0d1216] text-white flex flex-col h-screen overflow-hidden">
      {/* 1. TOP HEADER BANNER */}
      <header className="px-8 py-5 bg-[#0a0e11]/80 border-b border-[#c5a85c]/10 flex items-center justify-between select-none shrink-0 relative z-20">
        <div>
          <span className="font-mono text-[#c5a85c] text-[9.5px] uppercase tracking-[0.25em] font-semibold block mb-0.5">
            Archival Core
          </span>
          <h2 className="text-xl md:text-2xl font-serif text-[#f4edd9] font-light">
            Welcome Back, <span className="text-[#dfba6b] font-medium">{username}</span>
          </h2>
        </div>

        {/* Search, Time & Notifications controls */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 border border-[#c5a85c]/15 bg-[#141b21] px-3.5 py-1.5 rounded-lg text-xs font-mono text-gray-400">
            <Clock size={12} className="text-[#c5a85c]" />
            <span className="text-[#dfba6b] tracking-wider font-semibold">{timeState || '04:32:52'}</span>
          </div>

          {/* Search bar wrapper matching dark round inputs in screenshot */}
          <div className="relative w-64 lg:w-80">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <Search size={14} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, author, tags..."
              className="w-full bg-[#141b21] border border-[#c5a85c]/10 hover:border-[#c5a85c]/30 focus:border-[#c5a85c] text-[12px] text-white pl-9 pr-4 py-2 rounded-full outline-none placeholder-gray-500 transition-all font-serif"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 font-mono text-[9px] text-red-400 hover:text-red-300 transition-colors uppercase cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Notifications bell dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              id="bell-notification-btn"
              className="p-2.5 rounded-full bg-[#141b21] hover:bg-[#1a232b] border border-[#c5a85c]/15 hover:border-[#c5a85c]/40 text-gray-400 hover:text-white transition-all cursor-pointer relative"
            >
              <Bell size={15} />
              <div className="absolute top-1 left-7 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-[#141b21] border border-[#c5a85c]/25 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.85)] p-4 space-y-3 z-30">
                <div className="flex items-center justify-between border-b border-[#c5a85c]/10 pb-2">
                  <span className="font-serif text-xs font-bold text-[#dfba6b]">Patron Notices</span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="font-mono text-[9px] text-gray-500 hover:text-white"
                  >
                    DISMISS ALL
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notificationList.map((notif) => (
                    <div key={notif.id} className="p-2.5 bg-[#0d1216] rounded border border-white/5 hover:border-[#c5a85c]/10 transition-colors">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-[11px] font-serif font-semibold text-white">{notif.title}</span>
                        <span className="text-[9px] font-mono text-gray-500">{notif.time}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 leading-relaxed">{notif.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Primary scroll content workspace */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 select-none">
        
        {/* 2. HERO FEATURED BOOK CAROUSEL PANEL (Looking rich, ambient and fully interactive) */}
        {activeBook && (
          <div className="p-1 bg-gradient-to-r from-[#9b8034]/25 via-[#dfba6b]/40 to-[#9b8034]/25 rounded-2xl shadow-[0_4px_30px_rgba(197,168,92,0.15)] overflow-hidden">
            <div className="bg-[#141b21] rounded-[14px] p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center relative overflow-hidden">
              
              {/* Luxury ambient vector backdrop effect */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#c5a85c]/5 to-transparent blur-3xl pointer-events-none" />

              {/* Left Column: Cover Deck showcasing side-by-side stack cards just like the original layout */}
              <div className="w-full lg:w-2/5 flex flex-col items-center">
                <span className="text-[#c5a85c] font-mono text-[9.5px] uppercase tracking-widest block mb-4">
                  Based on Your Last Read
                </span>
                
                {/* Book Carousel peeking deck exactly mirroring dashboard screenshot */}
                <div className="flex items-center justify-center gap-6 w-full max-w-sm relative px-4">
                  {/* Left book preview */}
                  <div className="w-14 aspect-[3/4] opacity-25 scale-75 rounded bg-[#0d1216] rotate-[-8deg] shadow-lg overflow-hidden shrink-0 transition-all hover:opacity-100 cursor-pointer"
                    onClick={() => {
                      const idx = books.findIndex(b => b.id === activeBookId);
                      const nextIdx = (idx - 1 + books.length) % books.length;
                      setActiveBookId(books[nextIdx].id);
                    }}
                  >
                    <img src={books[(books.findIndex(b => b.id === activeBookId) - 1 + books.length) % books.length]?.cover} className="w-full h-full object-cover" alt="prev" />
                  </div>

                  {/* ACTIVE BOOK */}
                  <div className="w-40 aspect-[3/4] rounded-lg bg-[#0d1216] shadow-[0_12px_44px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden relative group/hero z-10">
                    <img
                      src={activeBook.cover}
                      alt={activeBook.title}
                      className="w-full h-full object-cover transition-transform group-hover/hero:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="font-serif text-[11px] text-[#dfba6b] uppercase font-bold tracking-widest block mb-1">
                        Active Spot
                      </span>
                      <p className="text-[10px] text-gray-300 line-clamp-2 italic font-serif leading-normal">
                        "{activeBook.description}"
                      </p>
                    </div>
                  </div>

                  {/* Right book preview */}
                  <div className="w-14 aspect-[3/4] opacity-25 scale-75 rounded bg-[#0d1216] rotate-[8deg] shadow-lg overflow-hidden shrink-0 transition-all hover:opacity-100 cursor-pointer"
                    onClick={() => {
                      const idx = books.findIndex(b => b.id === activeBookId);
                      const nextIdx = (idx + 1) % books.length;
                      setActiveBookId(books[nextIdx].id);
                    }}
                  >
                    <img src={books[(books.findIndex(b => b.id === activeBookId) + 1) % books.length]?.cover} className="w-full h-full object-cover" alt="next" />
                  </div>
                </div>

                {/* Sub features layout buttons directly from mobile screen mockup */}
                <div className="flex items-center gap-6 mt-10 text-xs font-mono text-[#c5a85c] tracking-widest">
                  <span className="uppercase text-gray-500 text-[10px]">Spotlight Actions:</span>
                  <div className="flex items-center gap-4">
                    <button
                      title="Bookmark This Book"
                      onClick={() => handleToggleLabel('Favorite-Stack')}
                      className={`flex items-center gap-1 cursor-pointer transition-colors ${activeBook.labels.includes('Favorite-Stack') ? 'text-amber-400' : 'hover:text-white'}`}
                    >
                      {activeBook.labels.includes('Favorite-Stack') ? <Bookmark size={15} fill="currentColor" /> : <Bookmark size={15} />}
                      <span>Save</span>
                    </button>
                    {activeBook.category !== 'loans' && (
                      <button
                        onClick={() => handleAddToStack(activeBook)}
                        className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors"
                      >
                        <Plus size={15} />
                        <span>Add Slot</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic metadata & information */}
              <div className="flex-1 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-xs uppercase tracking-widest text-[#c5a85c] font-bold">
                      {activeBook.genre}
                    </span>
                    <span className="text-gray-600 font-mono">•</span>
                    <span className="font-mono text-xs text-gray-400">
                      Pub. {activeBook.releaseYear}
                    </span>
                  </div>

                  <h1 className="font-serif text-3xl md:text-4xl font-light text-[#f4edd9] leading-tight">
                    {activeBook.title}
                  </h1>
                  <p className="font-sans text-sm text-gray-400 font-medium">
                    By {activeBook.author}
                  </p>
                </div>

                <p className="text-[#eee3c7]/85 font-serif text-sm leading-relaxed max-w-xl italic">
                  "{activeBook.description}"
                </p>

                {/* Tags slider interaction */}
                <div className="space-y-1.5">
                  <span className="text-gray-500 font-mono text-[9px] uppercase tracking-widest block">
                    Guild Classification Tags
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeBook.labels.map((badge) => (
                      <button
                        key={badge}
                        onClick={() => handleToggleLabel(badge)}
                        className="px-2.5 py-1 text-[10px] font-mono uppercase bg-[#0c1013] border border-[#c5a85c]/15 hover:border-[#dfba6b] hover:text-[#dfba6b] rounded transition-all cursor-pointer"
                      >
                        #{badge}
                      </button>
                    ))}
                    <button
                      onClick={() => handleToggleLabel('Priority-Vault')}
                      className="px-2.5 py-1 text-[10px] font-mono uppercase bg-[#c5a85c]/10 text-[#dfba6b] rounded flex items-center gap-1 cursor-pointer hover:bg-[#c5a85c]/25 border border-dashed border-[#c5a85c]/20"
                    >
                      <Plus size={10} /> Add Target label
                    </button>
                  </div>
                </div>

                {/* Real-time slider reading progress underspot */}
                <div className="bg-[#0c1013]/70 p-4 rounded-xl border border-white/5 space-y-2 max-w-xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-serif">Current Archival Log Position</span>
                    <span className="text-[#dfba6b] font-mono font-bold">
                      {activeBook.currentPage} / {activeBook.totalPages} pages ({Math.round((activeBook.currentPage / activeBook.totalPages) * 100)}%)
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {activeBook.category !== 'loans' ? (
                      <div className="w-full flex justify-between items-center text-xs p-1">
                        <span className="text-gray-500 italic">This book is currently on {activeBook.category === 'holds' ? 'Hold Queue' : 'Wishlist'}.</span>
                        <button
                          onClick={() => handleAddToStack(activeBook)}
                          className="px-3 py-1 bg-[#c5a85c]/20 text-[#dfba6b] border border-[#c5a85c]/25 font-mono text-[10px] uppercase rounded-lg hover:bg-[#c5a85c] hover:text-black transition-all cursor-pointer"
                        >
                          Check out book
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-1.5 bg-gray-950 rounded-full overflow-hidden self-center">
                        <div
                          className="h-full bg-gradient-to-r from-[#9b8034] via-[#dfba6b] to-[#9b8034] rounded-full"
                          style={{ width: `${Math.round((activeBook.currentPage / activeBook.totalPages) * 100)}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3. BENTO INTERACTIVE STATISTICS & ESTIMATORS (Fully Responsive grids) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Bento Block 1: Real-time Speed/Estimator Tool */}
          {activeBook && (
            <div className="p-5 bg-[#141b21] rounded-xl border border-[#c5a85c]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-[#dfba6b]" />
                  <span className="font-serif text-[11px] uppercase tracking-widest text-[#dfba6b] font-bold">
                    Stack Completion Estimator
                  </span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed mb-4 font-serif">
                  Estimate how quickly you will complete <span className="text-white italic">"{activeBook.title}"</span> based on your customizable daily velocity:
                </p>

                <div className="p-3 bg-[#0d1216] rounded-lg border border-white/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-xs text-gray-400">Your Speed:</span>
                    <span className="font-mono text-xs font-bold text-[#dfba6b]">{readingSpeed} pages / day</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={readingSpeed}
                    onChange={(e) => setReadingSpeed(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#0a0e11] rounded-lg appearance-none cursor-pointer accent-[#c5a85c]"
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#c5a85c]/10 flex justify-between items-center">
                <div>
                  <span className="text-gray-500 font-mono text-[9px] uppercase">Est. Completion</span>
                  <p className="text-[#f4edd9] font-serif font-bold text-lg leading-tight">
                    {daysEstimate} {daysEstimate === 1 ? 'Day' : 'Days'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 font-mono text-[9px] uppercase">Overdue risk</span>
                  <span className={`font-mono text-xs block font-semibold ${daysEstimate > 20 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {daysEstimate > 20 ? 'High' : 'Low / Safe'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Bento Block 2: Reading Session Log Activity List */}
          <div className="p-5 bg-[#141b21] rounded-xl border border-[#c5a85c]/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} className="text-[#dfba6b]" />
                <span className="font-serif text-[11px] uppercase tracking-widest text-[#dfba6b] font-bold">
                  Recent Archivist Logs
                </span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                History of logged reading activity compiled by you in this local workspace session:
              </p>

              <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                {sessions.map((sess, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-[#0d1216] rounded border border-[#c5a85c]/5 hover:border-[#c5a85c]/15 transition-all text-xs">
                    <div className="font-serif truncate max-w-[150px]">
                      <span className="text-[#dfba6b] font-bold mr-1.5 font-mono text-[10px]">{sess.date}</span>
                      <span className="text-gray-300 italic">"{sess.bookTitle}"</span>
                    </div>
                    <span className="font-mono text-[#c5a85c] font-bold bg-[#c5a85c]/5 px-2 py-0.5 rounded shrink-0">
                      +{sess.pagesRead} pgs
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#c5a85c]/10 flex items-center justify-between text-xs text-gray-400">
              <span className="font-serif">Last recorded sync:</span>
              <span className="font-mono text-[#dfba6b] font-semibold">Today ({new Date().toLocaleDateString([], {month:'short', day:'numeric'})})</span>
            </div>
          </div>

          {/* Bento Block 3: Librarian's Special Editorial Spotlight */}
          <div className="p-5 bg-[#141b21] rounded-xl border border-[#c5a85c]/10 flex flex-col justify-between bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: `linear-gradient(rgba(20,27,33,0.95), rgba(20,27,33,0.98))` }}>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Award size={16} className="text-[#dfba6b]" />
                <span className="font-serif text-[11px] uppercase tracking-widest text-[#dfba6b] font-bold">
                  Librarian’s Guild Pick
                </span>
              </div>
              <span className="text-[#dfba6b] font-serif italic text-base block font-bold mb-1">
                Jane Austen, Ms. 1813
              </span>
              <p className="text-[#eee3c7]/85 font-serif text-xs leading-relaxed italic truncate-3-lines">
                "The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid." Enjoy fine letterpress classic designs from the guild shelves!
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-[#c5a85c]/10 flex items-center justify-between relative z-10">
              <button
                id="pick-austens-choice-btn"
                onClick={() => {
                  const pride = books.find(b => b.id === 'pride-prejudice');
                  if (pride) {
                    setActiveBookId('pride-prejudice');
                  }
                }}
                className="text-xs text-[#c5a85c] hover:text-[#dfba6b] font-mono tracking-wider uppercase cursor-pointer flex items-center gap-1.5 transition-all hover:translate-x-1"
              >
                Inspect Austen Choice <ArrowRight size={12} />
              </button>
            </div>
          </div>

        </div>

        {/* 4. EXQUISITE GRID BOOK BROWSER (Deeply rounded cards, clean hover states) */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-serif text-xl font-light text-[#f4edd9] tracking-wide">
              Explore Literary Vault Stocks
            </h3>
            
            {/* Genre classifications toggle */}
            <div className="flex flex-wrap gap-1.5">
              {genres.map((g) => (
                <button
                  key={g}
                  id={`genre-filter-${g}`}
                  onClick={() => setSelectedGenre(g)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-serif uppercase tracking-widest transition-all cursor-pointer ${
                    selectedGenre === g
                      ? 'bg-[#c5a85c] text-[#0d1216] font-bold shadow'
                      : 'bg-[#141b21] text-gray-400 hover:text-white hover:bg-[#1a232b]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                id={`explore-book-grid-item-${book.id}`}
                onClick={() => setActiveBookId(book.id)}
                onMouseEnter={() => setHoveredBookId(book.id)}
                onMouseLeave={() => setHoveredBookId(null)}
                className={`flex flex-col bg-[#141b21] hover:bg-[#1a232b] border rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 group ${
                  activeBookId === book.id
                    ? 'border-[#c5a85c] shadow-[0_4px_20px_rgba(197,168,92,0.15)] bg-[#192128]'
                    : 'border-[#c5a85c]/10 hover:border-[#c5a85c]/25'
                }`}
              >
                {/* Book cover area with active glow badges */}
                <div className="aspect-[3/4] bg-[#0d1216] overflow-hidden relative border-b border-black/10">
                  <img
                    src={book.cover}
                    alt={`${book.title} thumbnail`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category overlay label */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                    <span className="bg-[#0a0e11]/85 text-[#dfba6b] font-mono text-[9px] uppercase px-2 py-0.5 rounded border border-[#c5a85c]/15 backdrop-blur-sm shadow font-extrabold tracking-wider">
                      {book.genre.split(' / ')[0]}
                    </span>
                    {book.category !== 'wishlist' && (
                      <span className={`font-mono text-[8px] uppercase px-1.5 py-0.5 rounded tracking-wide backdrop-blur-sm text-center ${
                        book.category === 'loans' ? 'bg-emerald-500/85 text-emerald-100' : 'bg-sky-500/85 text-sky-100'
                      }`}>
                        {book.category}
                      </span>
                    )}
                  </div>

                  {/* Rating stamp details on hover */}
                  {hoveredBookId === book.id && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 p-3 flex justify-between items-center text-xs animate-fade-in">
                      <div className="flex items-center gap-1 text-amber-400 font-bold font-serif">
                        <Star size={11} fill="currentColor" /> {book.rating}
                      </div>
                      <span className="font-sans text-[10px] text-gray-300 font-semibold uppercase tracking-widest">
                        {book.totalPages} pages
                      </span>
                    </div>
                  )}
                </div>

                {/* Cover textual meta */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-xs font-bold text-gray-200 line-clamp-1 group-hover:text-[#dfba6b] transition-colors leading-relaxed">
                      {book.title}
                    </h4>
                    <p className="font-sans text-[10px] text-gray-500 line-clamp-1 font-medium mt-0.5">
                      {book.author}
                    </p>
                  </div>

                  {/* Direct checkouts status trigger footer */}
                  <div className="pt-3 border-t border-[#c5a85c]/5 mt-3 flex items-center justify-between">
                    {book.category === 'loans' ? (
                      <div className="w-full flex items-center justify-between text-[10px] font-mono text-emerald-400 uppercase">
                        <span>Currently Checked out</span>
                        <Check size={11} />
                      </div>
                    ) : (
                      <button
                        title="Add Book for Loan Checkout Slot"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToStack(book);
                        }}
                        className="text-[10px] text-[#c5a85c] hover:text-[#dfba6b] font-mono uppercase tracking-widest font-semibold cursor-pointer py-1 block w-full text-center hover:bg-[#c5a85c]/5 rounded"
                      >
                        + Add To Loans
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
