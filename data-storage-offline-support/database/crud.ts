import { dbPromise } from "./db";

export interface User {
  id: number;
  name: string;
  email: string;
}

// Create User
export async function createUser(name: string, email: string): Promise<number> {
  const db = await dbPromise;
  const result = await db.runAsync(
    "INSERT INTO users (name, email) VALUES (?, ?);",
    name,
    email
  );
  return result.lastInsertRowId;
}

// Read All Users
export async function getUsers(): Promise<User[]> {
  try {
    const db = await dbPromise;
    const rows = await db.getAllAsync<User>("SELECT * FROM users;");
    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

// Read Single User by ID
export async function getUserById(id: number): Promise<User | null> {
  const db = await dbPromise;
  const row = await db.getFirstAsync<User>("SELECT * FROM users WHERE id = ?;", id);
  return row;
}

// Update User
export async function updateUser(id: number, name: string, email: string): Promise<void> {
  const db = await dbPromise;
  await db.runAsync(
    "UPDATE users SET name = ?, email = ? WHERE id = ?;",
    name,
    email,
    id
  );
}

// Delete User
export async function deleteUser(id: number): Promise<void> {
  const db = await dbPromise;
  await db.runAsync("DELETE FROM users WHERE id = ?;", id);
}
