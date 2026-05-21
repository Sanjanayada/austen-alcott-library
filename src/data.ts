import { Book } from './types';

export const LIBRARY_BG = '/src/assets/images/library_busts_bg_1779338018384.png';

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'fourth-wing',
    title: 'The Fourth Wing',
    author: 'Rebecca Yarros',
    cover: '/src/assets/images/fourth_wing_cover_1779338040228.png',
    currentPage: 10,
    totalPages: 528, // ~2% progress
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
    totalPages: 272, // ~14% progress
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
    totalPages: 280, // ~75% progress
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
    totalPages: 448, // ~32%
    dueDate: '15 days left',
    category: 'loans',
    rating: 4.8,
    genre: 'Classic Fiction',
    releaseYear: 1868,
    description: 'Chronicles the lives of the four March sisters—Meg, Jo, Beth, and Amy—in Civil War-era New England as they struggle with poverty, love, school, and growing up.',
    personalNotes: 'Extremely cozy and warm. Jo is incredibly inspirational as a female writer.',
    labels: ['Alcott’s Choice', 'Cozy Reading', 'Family Saga']
  },
  {
    id: 'the-secret-history',
    title: 'The Secret History',
    author: 'Donna Tartt',
    cover: 'https://picsum.photos/seed/secrethistory/300/400',
    currentPage: 0,
    totalPages: 559,
    dueDate: 'Estimated in 5 days',
    category: 'holds',
    rating: 4.7,
    genre: 'Mystery / Dark Academia',
    releaseYear: 1992,
    description: 'Under the influence of their charismatic classics professor, a group of clever, eccentric misfits at an elite New England college discover a way of thinking and living that is a world away from the humdrum existence of their contemporaries.',
    personalNotes: 'Heard amazing reviews from fellow bibliophiles. Dark academia style.',
    labels: ['Dark Academia', 'Mystery', 'Thriller']
  },
  {
    id: 'dracula',
    title: 'Dracula',
    author: 'Bram Stoker',
    cover: 'https://picsum.photos/seed/dracula/300/400',
    currentPage: 0,
    totalPages: 418,
    dueDate: 'Inactive wishlist',
    category: 'wishlist',
    rating: 4.5,
    genre: 'Gothic Horror',
    releaseYear: 1897,
    description: 'The famous epistolary novel that introduced the terrifying Count Dracula, setting the template for werewolf and vampire legends that would capture the popular imagination for over a century.',
    personalNotes: 'Perfect read for October or stormy winter nights. Will read immediately after Frankenstein.',
    labels: ['Horror', 'Vampires', 'Classic']
  },
  {
    id: 'circe',
    title: 'Circe',
    author: 'Madeline Miller',
    cover: 'https://picsum.photos/seed/circe/300/400',
    currentPage: 0,
    totalPages: 393,
    dueDate: 'Inactive wishlist',
    category: 'wishlist',
    rating: 4.7,
    genre: 'Mythology / Fantasy',
    releaseYear: 2018,
    description: 'A bold and subversive reimagining of the myth of Circe, the formidable sorceress from Homer’s Odyssey, written with lyrical prose and rich emotional depth.',
    personalNotes: 'Madeline Miller is an expert at Greek retellings. Looking forward to this.',
    labels: ['Greek Mythology', 'Feminism', 'Lyrical']
  }
];

export const INITIAL_SESSIONS = [
  { date: 'May 18', pagesRead: 15, bookTitle: 'The Fourth Wing' },
  { date: 'May 19', pagesRead: 25, bookTitle: 'Her Body and Other Parties' },
  { date: 'May 20', pagesRead: 30, bookTitle: 'Frankenstein' },
  { date: 'May 21', pagesRead: 20, bookTitle: 'Little Women' }
];
