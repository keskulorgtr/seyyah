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

export default db;
