import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export const getDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("notes.db");
    await db.execAsync(
      `
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            );
            `,
    );
  }
  return db;
};

export const initDatabase = async () => {
  await getDatabase();
};

export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

// Create
export const addNote = async (title: string, content: string): Promise<number> => {
  const database = await getDatabase();
  const result = await database.runAsync(
    "INSERT INTO notes (title, content) VALUES (?, ?);",
    title,
    content
  );
  return result.lastInsertRowId;
};

// Read all
export const getNotes = async (): Promise<Note[]> => {
  const database = await getDatabase();
  const notes = await database.getAllAsync<Note>("SELECT * FROM notes ORDER BY id DESC;");
  return notes;
};

// Read single
export const getNoteById = async (id: number): Promise<Note | null> => {
  const database = await getDatabase();
  const note = await database.getFirstAsync<Note>("SELECT * FROM notes WHERE id = ?;", id);
  return note;
};

// Update
export const updateNote = async (id: number, title: string, content: string): Promise<void> => {
  const database = await getDatabase();
  await database.runAsync(
    "UPDATE notes SET title = ?, content = ? WHERE id = ?;",
    title,
    content,
    id
  );
};

// Delete
export const deleteNote = async (id: number): Promise<void> => {
  const database = await getDatabase();
  await database.runAsync("DELETE FROM notes WHERE id = ?;", id);
};
