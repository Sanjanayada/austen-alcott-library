export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  currentPage: number;
  totalPages: number;
  dueDate: string;
  category: 'loans' | 'holds' | 'wishlist';
  rating: number;
  genre: string;
  releaseYear: number;
  description: string;
  personalNotes?: string;
  labels: string[];
}

export interface ReadingSession {
  date: string;
  pagesRead: number;
  bookTitle: string;
}

export interface LibraryState {
  books: Book[];
  activeBookId: string;
  currentTab: 'loans' | 'holds' | 'wishlist';
  searchQuery: string;
  selectedGenreFilter: string;
  userStreakDays: number;
  dailyGoalPages: number;
  sessions: ReadingSession[];
}
