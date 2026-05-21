import React, { useState } from 'react';
import { Book } from '../types';
import { 
  Plus, 
  Minus, 
  Calendar, 
  PlusCircle, 
  Trash2, 
  FileText, 
  Edit3, 
  Check, 
  Star, 
  Tag, 
  Clock, 
  Sparkles,
  ChevronRight,
  Bookmark
} from 'lucide-react';

interface MyShelfProps {
  books: Book[];
  onUpdateBook: (updatedBook: Book) => void;
  onAddSession: (bookTitle: string, pagesRead: number) => void;
}

export default function MyShelf({ books, onUpdateBook, onAddSession }: MyShelfProps) {
  const [activeTab, setActiveTab] = useState<'loans' | 'holds' | 'wishlist'>('loans');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [progressInput, setProgressInput] = useState<string>('');
  const [noteText, setNoteText] = useState<string>('');
  const [showManageModal, setShowManageModal] = useState(false);
  const [labelInput, setLabelInput] = useState('');

  // Count tallies
  const loansCount = books.filter((b) => b.category === 'loans').length;
  const holdsCount = books.filter((b) => b.category === 'holds').length;
  const wishlistCount = books.filter((b) => b.category === 'wishlist').length;

  const filteredBooks = books.filter((book) => book.category === activeTab);

  // Open manage book panel
  const handleOpenManage = (book: Book) => {
    setSelectedBook(book);
    setProgressInput(book.currentPage.toString());
    setNoteText(book.personalNotes || '');
    setShowManageModal(true);
  };

  // Save book updates
  const handleSaveProgress = () => {
    if (!selectedBook) return;
    const newPage = Math.min(
      selectedBook.totalPages,
      Math.max(0, parseInt(progressInput) || 0)
    );
    const difference = newPage - selectedBook.currentPage;
    
    const updated: Book = {
      ...selectedBook,
      currentPage: newPage,
      personalNotes: noteText
    };

    onUpdateBook(updated);
    setSelectedBook(updated);

    if (difference > 0) {
      onAddSession(selectedBook.title, difference);
    }
  };

  // Interactively increment reading progress
  const adjustPage = (amount: number) => {
    if (!selectedBook) return;
    const nextVal = Math.min(
      selectedBook.totalPages,
      Math.max(0, selectedBook.currentPage + amount)
    );
    setProgressInput(nextVal.toString());

    const updated: Book = {
      ...selectedBook,
      currentPage: nextVal
    };
    onUpdateBook(updated);
    setSelectedBook(updated);

    if (amount > 0) {
      onAddSession(selectedBook.title, amount);
    }
  };

  // Renew current loan by 14 days
  const handleRenew = () => {
    if (!selectedBook) return;
    
    // Parse current days remaining
    const currentDays = parseInt(selectedBook.dueDate) || 0;
    const newDays = currentDays === 0 ? 14 : currentDays + 14;
    
    const updated: Book = {
      ...selectedBook,
      dueDate: `${newDays} days left`
    };

    onUpdateBook(updated);
    setSelectedBook(updated);
  };

  // Add a tag label
  const handleAddLabel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook || !labelInput.trim()) return;
    if (selectedBook.labels.includes(labelInput.trim())) return;

    const updated: Book = {
      ...selectedBook,
      labels: [...selectedBook.labels, labelInput.trim()]
    };

    onUpdateBook(updated);
    setSelectedBook(updated);
    setLabelInput('');
  };

  // Delete tag label
  const handleRemoveLabel = (labelToRemove: string) => {
    if (!selectedBook) return;
    const updated: Book = {
      ...selectedBook,
      labels: selectedBook.labels.filter(l => l !== labelToRemove)
    };
    onUpdateBook(updated);
    setSelectedBook(updated);
  };

  // Change status of book (move holds to loans, wishlist to loans, etc.)
  const handleMoveCategory = (targetCat: 'loans' | 'holds' | 'wishlist') => {
    if (!selectedBook) return;
    const updated: Book = {
      ...selectedBook,
      category: targetCat,
      dueDate: targetCat === 'loans' ? '14 days left' : targetCat === 'holds' ? 'Estimated 7 days' : 'Inactive wishlist'
    };
    onUpdateBook(updated);
    setSelectedBook(updated);
    // Switch tab automatic
    setActiveTab(targetCat);
    setShowManageModal(false);
  };

  return (
    <div className="flex-1 bg-[#0d1216] text-white flex flex-col h-screen overflow-hidden">
      {/* Top action header info */}
      <div className="p-8 border-b border-[#c5a85c]/10 bg-[#0a0e11]/80">
        <span className="font-serif text-[10px] tracking-[0.25em] uppercase text-[#c5a85c] font-medium block mb-2">
          Patron Vault
        </span>
        <h1 className="text-3xl font-serif text-[#f4edd9] font-light tracking-wide mb-4">
          My Book Shelf
        </h1>

        {/* Dynamic header showing stack items counting like the mockup */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
          <div className="flex items-baseline gap-2">
            <span className="text-gray-400 font-sans text-sm">You currently have</span>
            <span className="text-[#dfba6b] font-serif font-bold text-4xl animate-pulse-slow">{loansCount}</span>
            <span className="text-gray-400 font-sans text-sm">{loansCount === 1 ? 'book' : 'books'} in your stack</span>
          </div>

          {/* Core pill toggle segment looking pristine like the screenshot */}
          <div className="inline-flex p-1 bg-[#141b21] rounded-full border border-[#c5a85c]/10 self-start">
            <button
              id="shelf-tab-loans"
              onClick={() => setActiveTab('loans')}
              className={`px-5 py-2.5 rounded-full text-xs font-serif tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'loans'
                  ? 'bg-[#c5a85c] text-[#0d1216] font-bold shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Loans</span>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${activeTab === 'loans' ? 'bg-[#0d1216]/10 text-[#0d1216]' : 'bg-white/5 text-gray-400'}`}>
                {loansCount}
              </span>
            </button>
            <button
              id="shelf-tab-holds"
              onClick={() => setActiveTab('holds')}
              className={`px-5 py-2.5 rounded-full text-xs font-serif tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'holds'
                  ? 'bg-[#c5a85c] text-[#0d1216] font-bold shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Holds</span>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${activeTab === 'holds' ? 'bg-[#0d1216]/10 text-[#0d1216]' : 'bg-white/5 text-gray-400'}`}>
                {holdsCount}
              </span>
            </button>
            <button
              id="shelf-tab-wishlist"
              onClick={() => setActiveTab('wishlist')}
              className={`px-5 py-2.5 rounded-full text-xs font-serif tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'wishlist'
                  ? 'bg-[#c5a85c] text-[#0d1216] font-bold shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Wishlist</span>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${activeTab === 'wishlist' ? 'bg-[#0d1216]/10 text-[#0d1216]' : 'bg-white/5 text-gray-400'}`}>
                {wishlistCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main book shelf display grid/list */}
      <div className="flex-1 overflow-y-auto p-8 space-y-4">
        {filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[#c5a85c]/10 rounded-xl bg-[#0a0e11]/30">
            <Bookmark size={40} className="text-[#c5a85c] opacity-30 mb-4 animate-bounce-slow" />
            <h3 className="font-serif text-lg text-[#dfba6b] mb-1">Stack Category Empty</h3>
            <p className="text-gray-400 text-xs max-w-xs leading-relaxed">
              No books currently placed under <span className="text-[#c5a85c] capitalize">{activeTab}</span>. Expand your selection in the dashboard stack.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredBooks.map((book, index) => {
              // Calculate percentage completion like the mockup
              const pct = book.totalPages > 0 ? Math.round((book.currentPage / book.totalPages) * 100) : 0;
              return (
                <div
                  key={book.id}
                  id={`shelf-book-card-${book.id}`}
                  className="bg-[#141b21] hover:bg-[#1a232b] rounded-xl p-5 border border-[#c5a85c]/10 hover:border-[#c5a85c]/25 transition-all duration-300 flex gap-6 shadow-md hover:shadow-xl group"
                >
                  {/* Left Column: Number and Cover Cover Artwork */}
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-serif text-4xl lg:text-5xl font-light text-[#c5a85c] opacity-35 group-hover:opacity-70 transition-opacity">
                      {index + 1}
                    </span>
                    <div className="w-20 md:w-24 aspect-[3/4] bg-[#0d1216] rounded shadow-lg overflow-hidden relative border border-white/5 shrink-0">
                      <img
                        src={book.cover}
                        alt={`${book.title} Book Cover`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Right Column: Title, Progress, and Action Trigger */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#f4edd9] leading-tight mb-1 group-hover:text-[#dfba6b] transition-colors">
                        {book.title}
                      </h3>
                      <p className="font-sans text-xs text-gray-400 mb-2">
                        {book.author}
                      </p>

                      {/* Info badges under title */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        <span className="bg-[#c5a85c]/10 text-[#dfba6b] font-mono text-[9px] uppercase px-2 py-0.5 rounded font-medium">
                          {book.genre}
                        </span>
                        {activeTab === 'loans' ? (
                          <span className="bg-emerald-500/10 text-emerald-400 font-mono text-[9px] uppercase px-2 py-0.5 rounded flex items-center gap-1">
                            <Clock size={8} /> {book.dueDate}
                          </span>
                        ) : (
                          <span className="bg-amber-500/10 text-amber-400 font-mono text-[9px] uppercase px-2 py-0.5 rounded flex items-center gap-1">
                            <Calendar size={8} /> {book.dueDate}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress tracking display matching original image styling perfectly */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-gray-400">
                          {activeTab === 'loans' ? `${pct}% read` : 'Awaiting Retrieval'}
                        </span>
                        <span className="text-gray-300 font-medium">
                          {book.currentPage} / {book.totalPages} pgs
                        </span>
                      </div>
                      
                      {/* Bar indicator */}
                      <div className="w-full h-1.5 bg-[#0a0e11] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#9b8034] via-[#dfba6b] to-[#9b8034] rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      {/* Actions footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#c5a85c]/5 mt-2">
                        <button
                          id={`shelf-manage-btn-${book.id}`}
                          onClick={() => handleOpenManage(book)}
                          className="text-[#c5a85c] hover:text-[#dfba6b] text-[11px] font-mono tracking-widest uppercase cursor-pointer flex items-center gap-1 transition-all hover:translate-x-0.5"
                        >
                          Manage Loan <ChevronRight size={12} />
                        </button>
                        
                        {/* Interactive incrementors directly on row for supreme usability */}
                        {activeTab === 'loans' && (
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <button
                              title="Decrement Progress"
                              onClick={() => { setSelectedBook(book); adjustPage(-10); }}
                              className="p-1 rounded bg-[#0a0e11] text-gray-400 hover:text-[#dfba6b] hover:bg-black/40 transition-all cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>
                            <button
                              title="Increment Progress"
                              onClick={() => { setSelectedBook(book); adjustPage(10); }}
                              className="p-1 rounded bg-[#0a0e11] text-gray-400 hover:text-[#dfba6b] hover:bg-black/40 transition-all cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DETAILED BOOK MANAGEMENT SHEET (SLIDE OVER DRAWER LOOKING PRISTINE) */}
      {showManageModal && selectedBook && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop screen filter */}
          <div
            className="absolute inset-0 bg-[#090b0d]/70 backdrop-blur-sm transition-all"
            onClick={() => setShowManageModal(false)}
          />

          {/* Drawer Paper Block */}
          <div className="relative w-full max-w-lg h-full bg-[#11161a] border-l border-[#c5a85c]/15 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between z-10 text-white animate-slide-in">
            {/* Header Area */}
            <div className="p-6 border-b border-[#c5a85c]/10 flex items-center justify-between bg-[#0e1216]">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#dfba6b]" />
                <span className="font-serif text-[11px] tracking-widest text-[#dfba6b] uppercase font-bold">
                  Managing Archives
                </span>
              </div>
              <button
                onClick={() => setShowManageModal(false)}
                className="text-gray-400 hover:text-white font-mono text-sm border border-gray-800 hover:border-gray-600 px-3 py-1 rounded"
              >
                CLOSE
              </button>
            </div>

            {/* Scrollable Center Pane */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Cover and details */}
              <div className="flex gap-6 items-start">
                <div className="w-28 shrink-0 aspect-[3/4] rounded-lg bg-black overflow-hidden shadow-xl border border-[#c5a85c]/10">
                  <img
                    src={selectedBook.cover}
                    alt={`${selectedBook.title} Detailed Cover`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#dfba6b]">
                    {selectedBook.title}
                  </h2>
                  <p className="text-gray-400 text-xs mb-3">
                    By {selectedBook.author}
                  </p>
                  
                  {/* Category Pill Tag selection */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[#c5a85c]/15 text-[#dfba6b] px-2.5 py-1 text-[10px] font-mono uppercase rounded-lg">
                      {selectedBook.genre}
                    </span>
                    <span className="bg-[#1a2128] text-gray-400 px-2.5 py-1 text-[10px] font-mono uppercase rounded-lg">
                      Year {selectedBook.releaseYear}
                    </span>
                  </div>

                  {/* Move statuses */}
                  <div className="space-y-1.5">
                    <span className="text-gray-500 font-mono text-[9px] uppercase tracking-wider block">
                      Transfer Shelf Location
                    </span>
                    <div className="flex gap-2">
                      {selectedBook.category !== 'loans' && (
                        <button
                          onClick={() => handleMoveCategory('loans')}
                          className="px-2.5 py-1.5 bg-[#c5a85c]/10 hover:bg-[#c5a85c]/25 text-[#dfba6b] font-mono text-[10px] uppercase rounded-sm cursor-pointer transition-all border border-[#c5a85c]/15"
                        >
                          Loan Stack
                        </button>
                      )}
                      {selectedBook.category !== 'holds' && (
                        <button
                          onClick={() => handleMoveCategory('holds')}
                          className="px-2.5 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 font-mono text-[10px] uppercase rounded-sm cursor-pointer transition-all border border-sky-500/15"
                        >
                          Holds Queue
                        </button>
                      )}
                      {selectedBook.category !== 'wishlist' && (
                        <button
                          onClick={() => handleMoveCategory('wishlist')}
                          className="px-2.5 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 font-mono text-[10px] uppercase rounded-sm cursor-pointer transition-all border border-purple-500/15"
                        >
                          Wishlist
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Slider (Only if currently a loan!) */}
              {selectedBook.category === 'loans' && (
                <div className="p-4 bg-[#141b21] rounded-lg border border-[#c5a85c]/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm text-[#f4edd9] font-medium">
                      Reading Performance
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      Page {selectedBook.currentPage} / {selectedBook.totalPages} (
                      {Math.round((selectedBook.currentPage / selectedBook.totalPages) * 100)}%)
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max={selectedBook.totalPages}
                    value={progressInput}
                    onChange={(e) => setProgressInput(e.target.value)}
                    className="w-full h-1.5 bg-[#0a0e11] rounded-lg appearance-none cursor-pointer accent-[#c5a85c]"
                  />

                  {/* Interactive fast toggles */}
                  <div className="flex justify-between items-center gap-2 pt-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => adjustPage(-25)}
                        className="px-2.5 py-1.5 bg-[#0a0e11] hover:bg-black text-[11px] text-gray-300 font-mono rounded cursor-pointer transition-colors border border-gray-800"
                      >
                        -25 pgs
                      </button>
                      <button
                        onClick={() => adjustPage(25)}
                        className="px-2.5 py-1.5 bg-[#0a0e11] hover:bg-black text-[11px] text-gray-300 font-mono rounded cursor-pointer transition-colors border border-gray-800"
                      >
                        +25 pgs
                      </button>
                    </div>

                    <button
                      onClick={handleSaveProgress}
                      className="px-4 py-1.5 bg-[#c5a85c] hover:bg-[#dfba6b] text-[#0d1216] font-mono text-xs font-bold uppercase rounded cursor-pointer transition-all flex items-center gap-1.5 shadow-md"
                    >
                      <Check size={12} /> Log Reading
                    </button>
                  </div>
                </div>
              )}

              {/* Custom tags/labels list */}
              <div className="space-y-3">
                <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase block">
                  Interactive Category Labels
                </span>
                
                <div className="flex flex-wrap gap-1.5">
                  {selectedBook.labels.map((label) => (
                    <span
                      key={label}
                      className="bg-[#182129] border border-[#c5a85c]/15 text-[#dfba6b] text-[10px] font-mono uppercase px-2.5 py-1 rounded flex items-center gap-1.5 hover:border-red-500/40 hover:text-red-400 group cursor-pointer transition-all"
                      title="Click to remove"
                      onClick={() => handleRemoveLabel(label)}
                    >
                      <Tag size={9} /> {label}
                      <span className="text-gray-500 group-hover:text-red-400 font-bold ml-1">×</span>
                    </span>
                  ))}
                </div>

                {/* Form to add custom label */}
                <form onSubmit={handleAddLabel} className="flex gap-2">
                  <input
                    type="text"
                    value={labelInput}
                    onChange={(e) => setLabelInput(e.target.value)}
                    placeholder="Create custom shelf category label..."
                    className="flex-1 bg-[#141b21] border border-gray-800 focus:border-[#c5a85c] text-xs px-3 py-2 outline-none rounded text-white"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-[#c5a85c]/10 hover:bg-[#c5a85c]/25 text-[#dfba6b] border border-[#c5a85c]/20 hover:border-[#c5a85c]/50 rounded cursor-pointer transition-all"
                  >
                    <PlusCircle size={14} />
                  </button>
                </form>
              </div>

              {/* Personal Reader Notes */}
              <div className="space-y-3">
                <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase block">
                  Librarian & Reader Logs
                </span>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Insert diary responses, quotes from Darcy/Shelley, or general notes..."
                  rows={4}
                  className="w-full bg-[#141b21] border border-gray-800 focus:border-[#c5a85c] outline-none rounded p-3 text-xs leading-relaxed text-gray-300 font-serif"
                />
                
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveProgress}
                    className="px-3.5 py-1.5 bg-[#1a2228] hover:bg-[#252f36] border border-[#c5a85c]/20 hover:border-[#c5a85c]/50 text-xs text-[#dfba6b] font-mono uppercase rounded cursor-pointer transition-all"
                  >
                    Update Log Record
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions section of Drawer */}
            <div className="p-6 bg-[#0a0e11] border-t border-[#c5a85c]/10 flex justify-between gap-4 items-center">
              <div>
                <span className="text-gray-500 font-mono text-[9px] uppercase tracking-wider block">
                  Status
                </span>
                <span className="text-[#dfba6b] font-mono text-xs uppercase font-bold flex items-center gap-1">
                  <Clock size={12} /> {selectedBook.dueDate}
                </span>
              </div>

              <div className="flex gap-2">
                {selectedBook.category === 'loans' && (
                  <button
                    onClick={handleRenew}
                    id="renewal-action-btn"
                    className="px-4 py-2 bg-transparent text-[#dfba6b] hover:bg-[#c5a85c]/5 border border-[#c5a85c]/30 hover:border-[#c5a85c] font-mono text-xs uppercase rounded cursor-pointer transition-all"
                  >
                    Renew Loan (+14 Days)
                  </button>
                )}
                
                <button
                  onClick={() => {
                    const confirmDel = window.confirm('Discard book registration from your personal archives?');
                    if (confirmDel) {
                      onUpdateBook({
                        ...selectedBook,
                        category: 'wishlist', // effectively archiving
                        dueDate: 'Archived / wishlist'
                      });
                      setShowManageModal(false);
                    }
                  }}
                  className="px-3.5 py-2 bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/20 hover:border-red-500/50 rounded cursor-pointer transition-all"
                  title="Remove from Shelf"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
