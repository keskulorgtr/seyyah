import Database from 'better-sqlite3';
import path from 'path';

// Store DB in the project root
const dbPath = path.join(process.cwd(), 'seyyah.db');
const db = new Database(dbPath);

// Initialize DB schema
db.exec(`
  CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    reservationDate TEXT NOT NULL,
    destination TEXT NOT NULL,
    pax INTEGER NOT NULL,
    status TEXT DEFAULT 'Yeni',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Migration: add email and phone columns if they don't exist
try {
  db.exec(`ALTER TABLE requests ADD COLUMN email TEXT`);
} catch { /* column already exists */ }

try {
  db.exec(`ALTER TABLE requests ADD COLUMN phone TEXT`);
} catch { /* column already exists */ }

// Migration: add status column
try {
  db.exec(`ALTER TABLE requests ADD COLUMN status TEXT DEFAULT 'Yeni'`);
} catch { /* column already exists */ }

// AR / 3D Landmark tables
db.exec(`
  CREATE TABLE IF NOT EXISTS ar_countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    nameEn TEXT,
    emoji TEXT,
    sortOrder INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS ar_landmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    countryId INTEGER NOT NULL,
    name TEXT NOT NULL,
    nameEn TEXT,
    description TEXT,
    thumbnailUrl TEXT,
    modelUrl TEXT NOT NULL,
    sortOrder INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (countryId) REFERENCES ar_countries(id) ON DELETE CASCADE
  )
`);

export default db;
