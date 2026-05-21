import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

// Set up server configurations
const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "library_db.json");

app.use(express.json());

// Seed Initial Data if storage file does not exist
const INITIAL_BOOKS = [
  {
    id: 'fourth-wing',
    title: 'The Fourth Wing',
    author: 'Rebecca Yarros',
    cover: '/src/assets/images/fourth_wing_cover_1779338040228.png',
    currentPage: 10,
    totalPages: 528,
    dueDate: '20 days left',
    category: 'loans',
    rating: 4.8,
    genre: 'Fantasy',
    releaseYear: 2023,
    description: 'Enter the brutal world of a military college for dragon riders, where the only rule is: graduate or die. Twenty-year-old Violet Sorrengail was supposed to live a quiet life among books, but now she must survive deadly trials.',
    personalNotes: 'Loved the introduction! The dragon bond elements feel really intensive and detailed. Aiming to read 30 pages a day.',
    labels: ['Must Read', 'Fantasy', 'High Stakes']
  },
  {
    id: 'her-body',
    title: 'Her Body and Other Parties',
    author: 'Carmen Maria Machado',
    cover: '/src/assets/images/her_body_cover_1779338058557.png',
    currentPage: 38,
    totalPages: 272,
    dueDate: '11 days left',
    category: 'loans',
    rating: 4.6,
    genre: 'Fiction / Short Stories',
    releaseYear: 2017,
    description: 'In her debut, Carmen Maria Machado demolishes the borders between magical realism, psychological realism, comedy, and horror. These stories shape-shift and shimmer, exploring the complex realities of women’s bodies.',
    personalNotes: 'Intense and beautifully written atmospheric stories. "The Husband Stitch" is absolutely haunting.',
    labels: ['Gothic', 'Magical Realism', 'Award Winner']
  },
  {
    id: 'frankenstein',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    cover: '/src/assets/images/frankenstein_cover_1779338080079.png',
    currentPage: 210,
    totalPages: 280,
    dueDate: '7 days left',
    category: 'loans',
    rating: 4.7,
    genre: 'Gothic Fiction',
    releaseYear: 1818,
    description: 'The story of Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment. It is a timeless classic combining gothic horror, romanticism, and profound moral philosophy.',
    personalNotes: 'Rereading this classic. The writing remains so atmospheric and poignant. Almost finished!',
    labels: ['Classic', 'Sci-Fi', 'Gothic']
  },
  {
    id: 'pride-prejudice',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover: '/src/assets/images/pride_prejudice_cover_1779338099580.png',
    currentPage: 0,
    totalPages: 432,
    dueDate: 'Estimated in 3 days',
    category: 'holds',
    rating: 4.9,
    genre: 'Classic Romance',
    releaseYear: 1813,
    description: 'The romantic clash between the opinionated Elizabeth Bennet and her proud suitor, Mr. Darcy, is a splendid performance of civilized sparring, wit, and social commentary.',
    personalNotes: 'On hold. Cant wait to dive back into Austen’s clever syntax. Darcy remains the golden standard.',
    labels: ['Austen’s Choice', 'Romance', 'Social Satire']
  },
  {
    id: 'little-women',
    title: 'Little Women',
    author: 'Louisa May Alcott',
    cover: '/src/assets/images/little_women_cover_1779338117568.png',
    currentPage: 145,
    totalPages: 448,
    dueDate: '15 days left',
    category: 'loans',
    rating: 4.8,
    genre: 'Classic Fiction',
    releaseYear: 1868,
    description: 'Chronicles the lives of the four March sisters—Meg, Jo, Beth, and Amy—in Civil War-era New England as they struggle with poverty, love, school, and growing up.',
    personalNotes: 'Extremely cozy and warm. Jo is incredibly inspirational as a female writer.',
    labels: ['Alcott’s Choice', 'Cozy Reading', 'Family Saga']
  }
];

const INITIAL_SESSIONS = [
  { date: 'May 18', pagesRead: 15, bookTitle: 'The Fourth Wing' },
  { date: 'May 19', pagesRead: 25, bookTitle: 'Her Body and Other Parties' },
  { date: 'May 20', pagesRead: 30, bookTitle: 'Frankenstein' },
  { date: 'May 21', pagesRead: 20, bookTitle: 'Little Women' }
];

const INITIAL_STATS = {
  streakDays: 5,
  dailyGoalPages: 40,
  username: "Jane"
};

interface DbSchema {
  books: typeof INITIAL_BOOKS;
  sessions: typeof INITIAL_SESSIONS;
  stats: typeof INITIAL_STATS;
}

function loadDatabase(): DbSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading database file, using fallback:", err);
  }
  
  // Seed fallback
  const fallbackData = {
    books: INITIAL_BOOKS,
    sessions: INITIAL_SESSIONS,
    stats: INITIAL_STATS
  };
  saveDatabase(fallbackData);
  return fallbackData;
}

function saveDatabase(data: DbSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to database file:", err);
  }
}

// Ensure database file is initialized
let dbState = loadDatabase();

// --- API ENDPOINTS ---

// Server check API
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Books APIs
app.get("/api/books", (req, res) => {
  dbState = loadDatabase();
  res.json(dbState.books);
});

app.post("/api/books", (req, res) => {
  const newBook = req.body;
  if (!newBook.id || !newBook.title) {
    res.status(400).json({ error: "Missing required fields: id and title" });
    return;
  }
  dbState = loadDatabase();
  dbState.books.push(newBook);
  saveDatabase(dbState);
  res.status(201).json(newBook);
});

app.put("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;
  
  dbState = loadDatabase();
  const index = dbState.books.findIndex(b => b.id === id);
  if (index !== -1) {
    dbState.books[index] = { ...dbState.books[index], ...updatedBook };
    saveDatabase(dbState);
    res.json(dbState.books[index]);
  } else {
    // If not found, append it
    dbState.books.push(updatedBook);
    saveDatabase(dbState);
    res.json(updatedBook);
  }
});

app.delete("/api/books/:id", (req, res) => {
  const { id } = req.params;
  dbState = loadDatabase();
  dbState.books = dbState.books.filter(b => b.id !== id);
  saveDatabase(dbState);
  res.json({ success: true, message: `Book with id ${id} deleted.` });
});

// Sessions API
app.get("/api/sessions", (req, res) => {
  dbState = loadDatabase();
  res.json(dbState.sessions);
});

app.post("/api/sessions", (req, res) => {
  const { bookTitle, pagesRead, date } = req.body;
  if (!bookTitle || !pagesRead) {
    res.status(400).json({ error: "Missing required bookTitle or pagesRead" });
    return;
  }
  dbState = loadDatabase();
  const today = date || new Date().toLocaleDateString([], { month: 'short', day: 'numeric' });
  const newSession = { date: today, pagesRead, bookTitle };
  
  dbState.sessions.unshift(newSession);
  saveDatabase(dbState);
  res.status(201).json(newSession);
});

// Stats API
app.get("/api/stats", (req, res) => {
  dbState = loadDatabase();
  res.json(dbState.stats);
});

app.put("/api/stats", (req, res) => {
  const updatedStats = req.body;
  dbState = loadDatabase();
  dbState.stats = { ...dbState.stats, ...updatedStats };
  saveDatabase(dbState);
  res.json(dbState.stats);
});

// Setup dev server or static static assets build integration
async function integrateFrontend() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html for undefined requests pointing to SPA routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server backend loaded on port ${PORT}`);
  });
}

integrateFrontend();
