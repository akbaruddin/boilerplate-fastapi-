import { writable } from "svelte/store";
import PouchDB from "pouchdb";
const dbName = "next-application-offline";

// Initialize PouchDB instance
let db = new PouchDB(dbName);

// Store to hold documents
export const docs = writable([]);

// Load all documents
export async function loadDocs() {
  try {
    const result = await db.allDocs({ include_docs: true });
    docs.set(result.rows.map((row) => row.doc));
    console.log("State updated successfully!");
  } catch (error) {
    console.error("Error loading documents:", error);
  }
}

// Add a new document
export async function addDoc(content) {
  try {
    await db.post({ content });
    loadDocs(); // Reload documents after adding
  } catch (error) {
    console.error("Error adding document:", error);
  }
}

// Delete a document
export async function deleteDoc(id, rev) {
  try {
    await db.remove(id, rev);
    loadDocs(); // Reload documents after deleting
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}

// Function to delete the database
export async function deleteDatabase() {
  try {
    await db.destroy();
    console.log("Database deleted successfully!");
  } catch (err) {
    console.error("Failed to delete the database:", err);
  }
}

// Load all documents
export async function resetDB() {
  try {
    // Initialize a temporary database instance
    const tempDb = new PouchDB(dbName);
    // Delete the existing database
    await tempDb.destroy();
    console.log("Database deleted successfully");

    db = new PouchDB(dbName);
    console.log("Database created successfully!");
    const result = await db.allDocs({ include_docs: true });
    docs.set(result.rows.map((row) => row.doc));
    console.log("State updated successfully!");
  } catch (error) {
    console.error("Error loading documents:", error);
  }
}
