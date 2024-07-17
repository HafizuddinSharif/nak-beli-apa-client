// db.js
import * as SQLite from "expo-sqlite";

// const db2 = await SQLite.openDatabaseAsync("nakbeliapa2.db");

// To initialize the db upon start-up
const initializeDb = async (db) => {
  try {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS units (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          unit VARCHAR(15)
        );
      `);
    console.log("Database created");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

const DB = {
  initializeDb: (db) => initializeDb,
  getAllUnitTables: (db) => getAllUnitTables(db),
  insertIntoUnits: (db, unitName) => insertIntoUnits(db, unitName),
};

const getAllUnitTables = async (db) => {
  const result = await db.getAllAsync("SELECT * from units;");
  if (result.length > 0) {
    console.log(result);
    return result;
  } else {
    console.log("Table is empty");
  }
};

const insertIntoUnits = async (db, unitName) => {
  await db.runAsync(`INSERT INTO units (unit) VALUES (?)`, unitName);
  console.log(`New entry is added ${unitName}`);
};

// Export the database connection and utility functions
export { DB, insertIntoUnits, initializeDb };
