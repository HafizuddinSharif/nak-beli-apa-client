// db.js
import * as SQLite from "expo-sqlite";

// const db2 = await SQLite.openDatabaseAsync("nakbeliapa2.db");

// To initialize the db upon start-up
const initializeDb = async (db) => {
  // console.log("SCRIPT", onInitialSetupDBScript);
  const yeet = onInitialSetupDBScript.split(";");
  yeet.forEach((line, i) => {
    console.log("SCRIPT", i, line);
  });
  try {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS units (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          unit VARCHAR(15)
        );
      `);

    yeet.forEach(async (line, i) => {
      console.log("Running script", i);
      await db.execAsync(line + ";");
    });
    console.log("Database created");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

const DB = {
  initializeDb: (db) => initializeDb,
  getAllUnitTables: (db) => getAllUnitTables(db),
  getAllItemSelectionTable: (db) => getAllItemSelectionTable(db),
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

const getAllItemSelectionTable = async (db) => {
  const itemSelections: any[] = await db.getAllAsync(
    "SELECT * from item_selections;"
  );
  const itemUnits: any[] = await db.getAllAsync("SELECT * from item_units;");
  const units: any[] = await db.getAllAsync("SELECT * from units;");
  console.log("Item total:", itemSelections.length);
  // console.log(itemSelections);

  const getUnits = (itemId) => {
    const returnUnits = [];
    const filterItemUnitList = itemUnits.filter((e) => e.item_id === itemId);
    filterItemUnitList.forEach((elem) => {
      const foundUnit = units.find((e) => e.id === elem.unit_id);
      returnUnits.push(foundUnit);
    });
    return returnUnits;
  };

  const itemSelectionList = [];
  itemSelections.forEach((elem) => {
    const newItem: ItemSelection = {
      id: elem.id,
      item_name: elem.item_name,
      units: getUnits(elem.id),
    };
    itemSelectionList.push(newItem);
  });

  return itemSelectionList;
};

const onInitialSetupDBScript: string = `
CREATE TABLE IF NOT EXISTS units (
    id INT PRIMARY KEY,
    unit VARCHAR(255) NOT NULL
);

INSERT OR IGNORE INTO units (id, unit) VALUES
(1, 'kg'),
(2, 'g'),
(3, 'mg'),
(4, 'lb'),
(5, 'oz'),
(6, 'l'),
(7, 'ml'),
(8, 'cup'),
(9, 'tbsp'),
(10, 'tsp'),
(11, 'piece'),
(12, 'serving'),
(13, 'slice'),
(14, 'pinch'),
(15, 'dash'),
(16, 'quart'),
(17, 'pint'),
(18, 'gallon'),
(19, 'cm'),
(20, 'inch');

CREATE TABLE IF NOT EXISTS item_selections (
    id INT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS item_units (
    item_id INT,
    unit_id INT,
    PRIMARY KEY (item_id, unit_id),
    FOREIGN KEY (item_id) REFERENCES item_selections(id),
    FOREIGN KEY (unit_id) REFERENCES units(id)
);

INSERT OR IGNORE INTO item_selections (id, item_name) VALUES
(1, 'Fish Fillet'),
(2, 'Red Chili Sauce'),
(3, 'Coconut Rice'),
(4, 'Sambal'),
(5, 'Fried Anchovies'),
(6, 'Boiled Egg'),
(7, 'Chicken'),
(8, 'Turmeric'),
(9, 'Coconut Milk'),
(10, 'Potatoes'),
(11, 'Salt'),
(12, 'Oil'),
(13, 'Grill Seasoning'),
(14, 'Salmon Fillet'),
(15, 'Mentai Sauce');

INSERT OR IGNORE INTO item_units (item_id, unit_id) VALUES
(1, 11), (1, 1),
(2, 8), (2, 7),
(3, 12), (3, 8),
(4, 12), (4, 9),
(5, 12), (5, 9),
(6, 11), (6, 13),
(7, 11), (7, 1),
(8, 10), (8, 2),
(9, 8), (9, 7),
(10, 11), (10, 1),
(11, 10), (11, 2),
(12, 8), (12, 7),
(13, 10), (13, 2),
(14, 11), (14, 1),
(15, 8), (15, 7);

CREATE TABLE IF NOT EXISTS meal_selections (
    id INT PRIMARY KEY,
    meal_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cooking_guide TEXT
);

CREATE TABLE IF NOT EXISTS meal_items (
    id INT PRIMARY KEY,
    meal_id INT,
    item_selection_id INT,
    quantity INT,
    unit_id INT,
    FOREIGN KEY (meal_id) REFERENCES meal_selections(id),
    FOREIGN KEY (item_selection_id) REFERENCES item_selections(id),
    FOREIGN KEY (unit_id) REFERENCES units(id)
);

INSERT OR IGNORE INTO meal_selections (id, meal_name, description, cooking_guide) VALUES
(1, 'Ikan masak merah', 'A rich and flavorful fish dish cooked in a red chili sauce.', ''),
(2, 'Nasi Lemak', 'Traditional Malaysian dish with rice cooked in coconut milk, served with various accompaniments.', ''),
(3, 'Ayam masak lemak cili api', 'A spicy and creamy chicken dish cooked with turmeric and coconut milk.', ''),
(4, 'Kentang goreng', 'Crispy and golden French fries, a perfect snack or side dish.', ''),
(5, 'Ayam panggang', 'Juicy and flavorful grilled chicken, seasoned to perfection.', ''),
(6, 'Salmon mentai', 'Delicious salmon topped with creamy mentai sauce, broiled to perfection.', '');

INSERT OR IGNORE INTO meal_items (id, meal_id, item_selection_id, quantity, unit_id) VALUES
(1, 1, 1, 1, 11),
(2, 1, 2, 2, 9),
(3, 2, 3, 1, 8),
(4, 2, 4, 1, 9),
(5, 2, 5, 1, 9),
(6, 2, 6, 1, 11),
(7, 3, 7, 1, 1),
(8, 3, 8, 1, 9),
(9, 3, 9, 2, 8),
(10, 4, 10, 2, 11),
(11, 4, 11, 1, 10),
(12, 4, 12, 1, 8),
(13, 5, 7, 1, 1),
(14, 5, 13, 1, 9),
(15, 6, 14, 1, 11),
(16, 6, 15, 1, 9);
`;

// Export the database connection and utility functions
export { DB, insertIntoUnits, initializeDb, onInitialSetupDBScript };
