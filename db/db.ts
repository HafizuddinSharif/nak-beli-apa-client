// db.js
import { SQLiteDatabase } from "expo-sqlite";

// const dbConnection = await SQLite.openDatabaseAsync("nakbeliapa2.db");

const DB = {
  initializeDb: (db) => initializeDb,
  insertIntoUnits: (db, unitName) => insertIntoUnits(db, unitName),
  getDataFromDB: (db) => getDataFromDB(db),
  runDBScript: (db) => runDBScript(db),
  insertNewMeal: (db, newMeal) => insertNewMeal(db, newMeal),
  updateMeal: (db, meal) => updateMeal(db, meal),
};

// To initialize the db upon start-up
const initializeDb = async (db) => {
  const yeet = onInitialSetupDBScript.split(";");
  db.withTransactionAsync(async () => {
    try {
      yeet.forEach(async (line, i) => {
        await db.execAsync(line + ";");
      });
      console.log("Database created");
    } catch (error) {
      console.error("Error creating tables:", error);
    }
  });
};

const runDBScript = async (db) => {
  console.log("Running custom DB script");
  // await db.runAsync(resetDB);

  // const yeet = resetDB.split(";");
  // try {
  //   yeet.forEach(async (line, i) => {
  //     await db.execAsync(line + ";");
  //   });
  //   console.log("Database created");
  // } catch (error) {
  //   console.error("Error creating tables:", error);
  // }

  // await db.getAllAsync(
  //   "DELETE FROM meal_selections WHERE id = 8 or id = 9 or id = 7"
  // );
  // await db.getAllAsync(
  //   "DELETE FROM meal_items where meal_id = 8 or meal_id = 9 or meal_id = 7"
  // );
  const result = await db.getAllAsync("SELECT * FROM item_selections");
  const result2 = await db.getAllAsync("SELECT * FROM units");
  console.log(result.length);
  console.log(result2.length);
};

const getDataFromDB = async (db) => {
  const unitsData: UnitDAO[] = await getAllUnitTables(db);
  const itemSelectionsData = await getAllItemSelectionTable(db, unitsData);
  const mealSelectionsData = await getAllMealSelectionTable(
    db,
    itemSelectionsData,
    unitsData
  );

  // const mealSelectionsData = [];
  return { unitsData, itemSelectionsData, mealSelectionsData };
};

const getAllUnitTables = async (db): Promise<UnitDAO[]> => {
  const result: UnitDAO[] = await db.getAllAsync("SELECT * from units;");
  if (result.length > 0) {
    return result;
  } else {
    console.log("Table is empty");
  }
};

const getAllMealSelectionTable = async (
  db,
  itemSelections: ItemSelection[],
  units: UnitDAO[]
) => {
  const mealSelections: MealSelectionDAO[] = await db.getAllAsync(
    "SELECT * from meal_selections;"
  );
  const mealItems: (MealItemDAO & { unit_id: number; unit: string })[] =
    await db.getAllAsync(`SELECT mi.meal_id, mi.item_selection_id, mi.quantity, u.id as unit_id, u.unit
            FROM meal_items mi
            JOIN units u ON mi.unit_id = u.id;`);

  const mealSelectionList: MealSelection[] = [];

  mealSelections.forEach((elem) => {
    const mealItemSpecific = mealItems.filter((e) => e.meal_id === elem.id);
    const mealItemList = [];
    mealItemSpecific.forEach((item) => {
      const yesh = itemSelections.find(
        (itemS) => itemS.id === item.item_selection_id
      );
      const foundUnitDAO = units.find((y) => y.id === item.unit_id) as Unit;
      const itemToAdd: ItemForMeal = {
        id: item.id,
        item_selection_id: yesh,
        quantity: item.quantity,
        unit: foundUnitDAO,
      };

      mealItemList.push(itemToAdd);
    });
    const mealObj: MealSelection = {
      id: elem.id,
      meal_name: elem.meal_name,
      description: elem.description,
      cooking_guide: elem.cooking_guide,
      item_list: mealItemList,
    };
    mealSelectionList.push(mealObj);
  });

  return mealSelectionList;
};

const insertNewMeal = async (db: SQLiteDatabase, newMeal: MealSelection) => {
  console.log("Adding new meal in DB:", newMeal.meal_name);
  const { id, meal_name, description, cooking_guide, item_list } = newMeal;
  // Start a transaction so if error happen we can rollback
  await db.withTransactionAsync(async () => {
    const savedMeal = await db.runAsync(
      `INSERT INTO meal_selections (id, meal_name, description, cooking_guide) VALUES (?, ?, ?, ?);`,
      id,
      meal_name,
      description,
      cooking_guide
    );
    console.log(savedMeal.lastInsertRowId, savedMeal.changes);
    const prepMealItemsSQLScript = [];

    const getMealItemsLength: any = await db.getAllAsync(
      `SELECT COUNT(*) FROM meal_items;`
    );
    item_list.forEach((item) => {
      const scriptLine = `(${savedMeal.lastInsertRowId}, ${item.item_selection_id.id}, ${item.quantity}, ${item.unit.id})`;
      prepMealItemsSQLScript.push(scriptLine);
    });
    const runScript = `INSERT INTO meal_items (meal_id, item_selection_id, quantity, unit_id) VALUES ${prepMealItemsSQLScript.join(
      ","
    )};`;
    await db.runAsync(runScript);
  });
  // const rs1 = await db.getAllAsync(`SELECT * from meal_selections;`);
  // const rs2 = await db.getAllAsync(`SELECT * from meal_items;`);
  // console.log("🍏", rs1);
  // console.log("🍟", rs2);
};

const updateMeal = async (db, meal: MealSelection) => {};

const insertIntoUnits = async (db, unitName) => {
  await db.runAsync(`INSERT INTO units (unit) VALUES (?)`, unitName);
  console.log(`New entry is added ${unitName}`);
};

const getAllItemSelectionTable = async (db: any, units) => {
  const itemSelections: ItemSelectionDAO[] = await db.getAllAsync(
    "SELECT * from item_selections;"
  );
  // const itemUnits: ItemUnitDAO[] = await db.getAllAsync(
  //   "SELECT * from item_units;"
  // );

  // const getUnits = (itemId) => {
  //   const returnUnits = [];
  //   const filterItemUnitList = itemUnits.filter((e) => e.item_id === itemId);
  //   filterItemUnitList.forEach((elem) => {
  //     const foundUnit = units.find((e) => e.id === elem.unit_id);
  //     returnUnits.push(foundUnit);
  //   });
  //   return returnUnits;
  // };

  const itemSelectionList: ItemSelection[] = [];
  itemSelections.forEach((elem) => {
    const newItem: ItemSelection = {
      id: elem.id,
      item_name: elem.item_name,
      units: units,
    };
    itemSelectionList.push(newItem);
  });

  return itemSelectionList;
};

const resetDB: string = `
DROP TABLE IF EXISTS meal_selections;
DROP TABLE IF EXISTS meal_items;
DROP TABLE IF EXISTS units;
DROP TABLE IF EXISTS item_selections;
DROP TABLE IF EXISTS item_units;
`;

const onInitialSetupDBScript: string = `
CREATE TABLE IF NOT EXISTS item_selections (
    id INTEGER PRIMARY KEY,
    item_name VARCHAR(50) NOT NULL,
    item_name_malay VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS units (
    id INTEGER PRIMARY KEY,
    unit VARCHAR(15) NOT NULL,
    unit_malay VARCHAR(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS meal_selections (
    id INTEGER PRIMARY KEY,
    meal_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cooking_guide TEXT
);

CREATE TABLE IF NOT EXISTS meal_items (
    meal_id INT,
    item_selection_id INT,
    quantity INT,
    unit_id INT,
    FOREIGN KEY (meal_id) REFERENCES meal_selections(id),
    FOREIGN KEY (item_selection_id) REFERENCES item_selections(id),
    FOREIGN KEY (unit_id) REFERENCES units(id)
);

INSERT OR IGNORE INTO item_selections (id, item_name, item_name_malay) VALUES
(1, 'Chicken', 'Ayam'),
(2, 'Beef', 'Daging'),
(3, 'Pasta', 'Pasta'),
(4, 'Olive oil', 'Minyak zaitun'),
(5, 'Cajun', 'Cajun'),
(6, 'Onion', 'Bawang besar'),
(7, 'Garlic', 'Bawang putih'),
(8, 'Lime leaves', 'Daun limau purut'),
(9, 'Birds eye chilli', 'Cili padi'),
(10, 'Tomyam paste', 'Pes tomyam'),
(11, 'Basil leaves', 'Daun basil'),
(12, 'Cooking cream', 'Krim masakan'),
(13, 'Butter', 'Mentega'),
(14, 'Lemon water', 'Air lemon'),
(15, 'Cheese', 'Keju'),
(16, 'Salt', 'Garam'),
(17, 'Sugar', 'Gula'),
(18, 'Tomato', 'Tomato'),
(19, 'Carrot', 'Lobak merah'),
(20, 'Potato', 'Kentang'),
(21, 'Rice', 'Beras'),
(22, 'Chilli paste', 'Pes cili'),
(23, 'Lemongrass', 'Serai'),
(24, 'Coconut milk', 'Santan'),
(25, 'Palm sugar', 'Gula melaka'),
(26, 'Egg', 'Telur'),
(27, 'Tamarind', 'Asam Jawa'),
(28, 'Turmeric', 'Kunyit'),
(29, 'Coriander', 'Ketumbar'),
(30, 'Cumin', 'Jintan putih'),
(31, 'Galangal', 'Lengkuas'),
(32, 'Curry leaves', 'Daun kari'),
(33, 'Pandan leaves', 'Daun pandan'),
(34, 'Dried shrimp', 'Udang kering'),
(35, 'Anchovy', 'Ikan bilis'),
(36, 'Soy sauce', 'Kicap'),
(37, 'Fish sauce', 'Sos ikan'),
(38, 'Belacan', 'Belacan'),
(39, 'Oyster sauce', 'Sos tiram'),
(40, 'Shallot', 'Bawang merah'),
(41, 'Star anise', 'Bunga lawang'),
(42, 'Clove', 'Cengkih'),
(43, 'Cinnamon', 'Kulit kayu manis'),
(44, 'Cardamom', 'Buah pelaga'),
(45, 'Nutmeg', 'Buah pala'),
(46, 'Black pepper', 'Lada hitam'),
(47, 'Tapioca flour', 'Tepung ubi kayu'),
(48, 'Rice flour', 'Tepung beras'),
(49, 'Tapioca pearls', 'Sagu'),
(50, 'Bean sprouts', 'Taugeh'),
(51, 'Chinese cabbage', 'Kubis cina'),
(52, 'Long beans', 'Kacang panjang'),
(53, 'Bok choy', 'Sawi'),
(54, 'Water spinach', 'Kangkung'),
(55, 'Ginger', 'Halia'),
(56, 'Kaffir lime', 'Limau purut'),
(57, 'Asam keping', 'Asam gelugor'),
(58, 'Candlenut', 'Buah keras'),
(59, 'Fenugreek', 'Halba'),
(60, 'Chili sauce', 'Sos cili'),
(61, 'Tomato sauce', 'Sos tomato'),
(62, 'Banana leaf', 'Daun pisang'),
(63, 'Cassava', 'Ubi kayu'),
(64, 'Yam', 'Keladi'),
(65, 'Tamarind paste', 'Pes asam jawa'),
(66, 'Coconut oil', 'Minyak kelapa'),
(67, 'Corn oil', 'Minyak jagung'),
(68, 'Saffron', 'Safron'),
(69, 'Tapioca starch', 'Kanji ubi kayu'),
(70, 'Coriander seeds', 'Biji ketumbar'),
(71, 'Fennel seeds', 'Biji jintan manis'),
(72, 'Black sesame seeds', 'Biji bijan hitam'),
(73, 'White sesame seeds', 'Biji bijan putih'),
(74, 'Brown sugar', 'Gula perang'),
(75, 'Rock sugar', 'Gula batu'),
(76, 'Prawn', 'Udang'),
(77, 'Squid', 'Sotong'),
(78, 'Mussels', 'Kupang'),
(79, 'Clams', 'Kerang'),
(80, 'Ikan tenggiri', 'Mackerel'),
(81, 'Ikan kembung', 'Indian mackerel'),
(82, 'Ikan bawal', 'Pomfret'),
(83, 'Ikan tongkol', 'Tuna'),
(84, 'Dried anchovies', 'Ikan bilis kering'),
(85, 'Ikan terubuk masin', 'Salted fish'),
(86, 'Petai', 'Stink bean'),
(87, 'Kacang botol', 'Winged bean'),
(88, 'Tahu', 'Tofu'),
(89, 'Tempeh', 'Tempeh'),
(90, 'Serunding', 'Meat floss'),
(91, 'Cili kering', 'Dried chili'),
(92, 'Kicap manis', 'Sweet soy sauce'),
(93, 'Hoisin sauce', 'Sos hoisin'),
(94, 'Black bean sauce', 'Sos kacang hitam'),
(95, 'Gula kabung', 'Palm sugar'),
(96, 'Kacang tanah', 'Peanuts'),
(97, 'Kacang hijau', 'Green beans'),
(98, 'Kacang dal', 'Lentils'),
(99, 'Tauhu kering', 'Dried tofu'),
(100, 'Lengkuas powder', 'Galangal powder');

INSERT OR IGNORE INTO units (id, unit, unit_malay) VALUES
(1, 'kg', 'kg'),
(2, 'g', 'g'),
(3, 'mg', 'mg'),
(4, 'lb', 'paun'),
(5, 'oz', 'auns'),
(6, 'l', 'l'),
(7, 'ml', 'ml'),
(8, 'cup', 'cawan'),
(9, 'tbsp', 'sudu besar'),
(10, 'tsp', 'sudu kecil'),
(11, 'piece', 'biji'),
(12, 'serving', 'hidangan'),
(13, 'slice', 'hiris'),
(14, 'pinch', 'cubitan'),
(15, 'dash', 'sejumput'),
(16, 'quart', 'kuart'),
(17, 'pint', 'pint'),
(18, 'gallon', 'galon'),
(19, 'cm', 'cm'),
(20, 'inch', 'inci'),
(21, 'm', 'm'),
(22, 'mm', 'mm'),
(23, 'km', 'km'),
(24, 'yard', 'ela'),
(25, 'foot', 'kaki'),
(26, 'dozen', 'dozen'),
(27, 'pack', 'pek'),
(28, 'bunch', 'ikat'),
(29, 'can', 'tin'),
(30, 'bottle', 'botol'),
(31, 'jar', 'balang'),
(32, 'stick', 'batang'),
(33, 'bar', 'bar'),
(34, 'clove', 'ulas'),
(35, 'head', 'kepala'),
(36, 'fillet', 'filet'),
(37, 'handful', 'genggam'),
(38, 'sachet', 'sachet'),
(39, 'tube', 'tiub'),
(40, 'sprig', 'tangkai'),
(41, 'leaf', 'helai'),
(42, 'block', 'ketul'),
(43, 'sheet', 'keping'),
(44, 'packet', 'bungkusan'),
(45, 'roll', 'gulung'),
(46, 'drop', 'titis'),
(47, 'gill', 'gelas kecil');

`;

// Export the database connection and utility functions
export {
  DB,
  // dbConnection,
  insertIntoUnits,
  initializeDb,
  onInitialSetupDBScript,
};
