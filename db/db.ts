// db.js
import * as SQLite from "expo-sqlite";

const db = await SQLite.openDatabaseAsync("nakbeliapa.db");

// Function to create tables
const createTables = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS units (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        unit VARCHAR(15)
      );
    `);
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

const insertIntoUnitsPrepare = await db.prepareAsync(
  "INSERT INTO units (unit) VALUES ($unit)"
);

const insertIntoUnits = async (unitName) => {
  try {
    const result = await insertIntoUnitsPrepare.executeAsync({
      $unit: unitName,
    });
    console.log("Insert result:", result.lastInsertRowId, result.changes);
  } catch (error) {
    console.error("Error inserting unit:", error);
  } finally {
    await insertIntoUnitsPrepare.finalizeAsync();
  }
};

const getUnitsTableData = async () => {
  try {
    return await db.execAsync(`SELECT * FROM units`);
  } catch (error) {
    console.error("Error fetching units:", error);
  }
};

// Export the database connection and utility functions
export { db, createTables, insertIntoUnits, getUnitsTableData };
