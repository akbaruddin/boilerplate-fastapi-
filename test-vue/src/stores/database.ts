import { defineStore } from "pinia";
import PouchDB from "pouchdb";

const dbName = "my-database";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    db: new PouchDB(dbName), // Initialize PouchDB
    docs: [] as any[], // Array to hold documents
  }),
  actions: {
    async fetchDocs() {
      try {
        const result = await this.db.allDocs({ include_docs: true });
        this.docs = result.rows.map((row) => row.doc);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    },
    async addDoc(doc: any) {
      try {
        await this.db.post(doc);
        this.fetchDocs(); // Refresh documents after adding
      } catch (error) {
        console.error("Failed to add document:", error);
      }
    },
    async updateDoc(doc: any) {
      try {
        await this.db.put(doc);
        this.fetchDocs(); // Refresh documents after updating
      } catch (error) {
        console.error("Failed to update document:", error);
      }
    },
    async deleteDoc(doc: any) {
      try {
        await this.db.remove(doc);
        this.fetchDocs(); // Refresh documents after deleting
      } catch (error) {
        console.error("Failed to delete document:", error);
      }
    },
    async reset() {
      try {
        // Fetch all document IDs and revisions
        const result = await this.db.allDocs({ include_docs: false });
        const deletePromises = result.rows.map((row) =>
          this.db.remove(row.id, row.value.rev),
        );
        await Promise.all(deletePromises);
        this.docs = []; // Clear local documents array
      } catch (error) {
        console.error("Failed to reset database:", error);
      }
    },
    async deleteDatabase() {
      try {
        // Reset the database by deleting all documents
        await this.reset();
        // Destroy the database itself
        await this.db.destroy();
        // Recreate the database
        this.db = new PouchDB(dbName);
        this.docs = []; // Clear local documents array
      } catch (error) {
        console.error("Failed to delete database:", error);
      }
    },
  },
});
