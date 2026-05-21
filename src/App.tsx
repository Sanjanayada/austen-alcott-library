import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, ReadingSession } from './types';
import { INITIAL_BOOKS, INITIAL_SESSIONS } from './data';
import IntroScreen from './components/IntroScreen';
import AuthScreen from './components/AuthScreen';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MyShelf from './components/MyShelf';
import Insights from './components/Insights';
import Discover from './components/Discover';

export default function App() {
  const [phase, setPhase] = useState<'intro' | 'auth' | 'app'>('intro');
  const [username, setUsername] = useState('Jane');
  const [currentView, setCurrentView] = useState<string>('dashboard');
  
  // Real active books state
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [activeBookId, setActiveBookId] = useState<string>('fourth-wing');
  const [searchQuery, setSearchQuery] = useState('');
  
  // High fidelity stats
  const [streakDays, setStreakDays] = useState(5);
  const [dailyGoalPages, setDailyGoalPages] = useState(40);
  const [sessions, setSessions] = useState<ReadingSession[]>(INITIAL_SESSIONS);

  // Synchronize state with our full-stack server
  useEffect(() => {
    if (phase === 'app') {
      fetch('/api/books')
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load");
          return res.json();
        })
        .then((data) => {
          if (data && data.length > 0) {
            setBooks(data);
          }
        })
        .catch((err) => console.log("Note: Running offline/initial books cache: ", err));

      fetch('/api/sessions')
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load");
          return res.json();
        })
        .then((data) => {
          if (data && data.length > 0) {
            setSessions(data);
          }
        })
        .catch((err) => console.log("Note: Running offline/initial sessions cache: ", err));

      fetch('/api/stats')
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load");
          return res.json();
        })
        .then((data) => {
          if (data) {
            setStreakDays(data.streakDays ?? 5);
            setDailyGoalPages(data.dailyGoalPages ?? 40);
            setUsername(data.username ?? 'Jane');
          }
        })
        .catch((err) => console.log("Note: Running offline/initial stats cache: ", err));
    }
  }, [phase]);

  // Update book across views cleanly
  const handleUpdateBook = (updatedBook: Book) => {
    setBooks((prevBooks) =>
      prevBooks.map((b) => (b.id === updatedBook.id ? updatedBook : b))
    );

    // Persist modifications directly to Express
    fetch(`/api/books/${updatedBook.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBook)
    }).catch((err) => console.error("Error updating book on backend API: ", err));
  };

  // Add reading session interactively and check streaks
  const handleAddSession = (bookTitle: string, pagesRead: number) => {
    if (pagesRead <= 0) return;
    const today = new Date().toLocaleDateString([], { month: 'short', day: 'numeric' });
    const newSession: ReadingSession = {
      date: today,
      pagesRead,
      bookTitle,
    };
    
    setSessions((prev) => [newSession, ...prev]);

    // Send payload to DB
    fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSession)
    }).catch((err) => console.error("Error creating reading session: ", err));

    // Check if daily pages target was reached to reward streak
    const totalToday = sessions
      .filter((s) => s.date === today)
      .reduce((sum, s) => sum + s.pagesRead, 0) + pagesRead;

    if (totalToday >= dailyGoalPages) {
      const nextStreak = streakDays + 1;
      setStreakDays(nextStreak);

      fetch('/api/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ streakDays: nextStreak, dailyGoalPages, username })
      }).catch((err) => console.error("Error updating daily streaks: ", err));
    }
  };

  const handleLoginSuccess = (name: string) => {
    setUsername(name);
    setPhase('app');

    // Sync credentials
    fetch('/api/stats', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ streakDays, dailyGoalPages, username: name })
    }).catch((err) => console.error("Error setting patron identity: ", err));
  };

  const handleLogout = () => {
    setPhase('auth');
    setCurrentView('dashboard');
  };

  const handleBackToIntro = () => {
    setPhase('intro');
  };

  // Totals for sidebar
  const totalLoans = books.filter((b) => b.category === 'loans').length;
  const totalHolds = books.filter((b) => b.category === 'holds').length;

  return (
    <div className="w-full min-h-screen bg-[#0c1013] text-white overflow-hidden relative font-sans antialiased text-sm">
      <AnimatePresence mode="wait">
        {/* PHASE 1: Loading Entry screen */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <IntroScreen onEnter={() => setPhase('auth')} />
          </motion.div>
        )}

        {/* PHASE 2: Login and card authentication */}
        {phase === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <AuthScreen
              onLoginSuccess={handleLoginSuccess}
              onBackToIntro={handleBackToIntro}
            />
          </motion.div>
        )}

        {/* PHASE 3: Main Desktop Workspace Layout */}
        {phase === 'app' && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex h-screen w-full overflow-hidden"
          >
            {/* LATER MENU PANEL */}
            <Sidebar
              currentView={currentView}
              setCurrentView={setCurrentView}
              username={username}
              streakDays={streakDays}
              dailyGoalPages={dailyGoalPages}
              totalLoans={totalLoans}
              totalHolds={totalHolds}
              onLogout={handleLogout}
            />

            {/* DYNAMIC SCENE MANAGER PANE */}
            <main className="flex-1 min-w-0 h-full relative flex flex-col">
              {currentView === 'dashboard' && (
                <Dashboard
                  books={books}
                  activeBookId={activeBookId}
                  setActiveBookId={setActiveBookId}
                  onUpdateBook={handleUpdateBook}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  streakDays={streakDays}
                  dailyGoalPages={dailyGoalPages}
                  sessions={sessions}
                  username={username}
                />
              )}

              {currentView === 'shelf' && (
                <MyShelf
                  books={books}
                  onUpdateBook={handleUpdateBook}
                  onAddSession={handleAddSession}
                />
              )}

              {currentView === 'insights' && (
                <Insights
                  books={books}
                  sessions={sessions}
                  dailyGoalPages={dailyGoalPages}
                />
              )}

              {currentView === 'discover' && (
                <Discover
                  books={books}
                  setActiveBookId={setActiveBookId}
                  setCurrentView={setCurrentView}
                />
              )}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
