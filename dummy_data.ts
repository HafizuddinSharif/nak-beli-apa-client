// Dummy data
// Define ItemSelection objects
const dummyItems: ItemSelection[] = [
  {
    id: "item-1",
    item_name: "Fish Fillet",
    unit: "piece",
    units: [
      { id: "11", unit: "piece" },
      { id: "1", unit: "kg" },
    ],
  },
  {
    id: "item-2",
    item_name: "Red Chili Sauce",
    unit: "cup",
    units: [
      { id: "8", unit: "cup" },
      { id: "7", unit: "ml" },
    ],
  },
  {
    id: "item-3",
    item_name: "Coconut Rice",
    unit: "serving",
    units: [
      { id: "12", unit: "serving" },
      { id: "8", unit: "cup" },
    ],
  },
  {
    id: "item-4",
    item_name: "Sambal",
    unit: "serving",
    units: [
      { id: "12", unit: "serving" },
      { id: "9", unit: "tbsp" },
    ],
  },
  {
    id: "item-5",
    item_name: "Fried Anchovies",
    unit: "serving",
    units: [
      { id: "12", unit: "serving" },
      { id: "9", unit: "tbsp" },
    ],
  },
  {
    id: "item-6",
    item_name: "Boiled Egg",
    unit: "piece",
    units: [
      { id: "11", unit: "piece" },
      { id: "13", unit: "slice" },
    ],
  },
  {
    id: "item-7",
    item_name: "Chicken",
    unit: "piece",
    units: [
      { id: "11", unit: "piece" },
      { id: "1", unit: "kg" },
    ],
  },
  {
    id: "item-8",
    item_name: "Turmeric",
    unit: "teaspoon",
    units: [
      { id: "10", unit: "tsp" },
      { id: "2", unit: "g" },
    ],
  },
  {
    id: "item-9",
    item_name: "Coconut Milk",
    unit: "cup",
    units: [
      { id: "8", unit: "cup" },
      { id: "7", unit: "ml" },
    ],
  },
  {
    id: "item-10",
    item_name: "Potatoes",
    unit: "piece",
    units: [
      { id: "11", unit: "piece" },
      { id: "1", unit: "kg" },
    ],
  },
  {
    id: "item-11",
    item_name: "Salt",
    unit: "teaspoon",
    units: [
      { id: "10", unit: "tsp" },
      { id: "2", unit: "g" },
    ],
  },
  {
    id: "item-12",
    item_name: "Oil",
    unit: "cup",
    units: [
      { id: "8", unit: "cup" },
      { id: "7", unit: "ml" },
    ],
  },
  {
    id: "item-13",
    item_name: "Grill Seasoning",
    unit: "teaspoon",
    units: [
      { id: "10", unit: "tsp" },
      { id: "2", unit: "g" },
    ],
  },
  {
    id: "item-14",
    item_name: "Salmon Fillet",
    unit: "piece",
    units: [
      { id: "11", unit: "piece" },
      { id: "1", unit: "kg" },
    ],
  },
  {
    id: "item-15",
    item_name: "Mentai Sauce",
    unit: "cup",
    units: [
      { id: "8", unit: "cup" },
      { id: "7", unit: "ml" },
    ],
  },
];

const dummyUnits: Unit[] = [
  { id: "1", unit: "kg" },
  { id: "2", unit: "g" },
  { id: "3", unit: "mg" },
  { id: "4", unit: "lb" },
  { id: "5", unit: "oz" },
  { id: "6", unit: "l" },
  { id: "7", unit: "ml" },
  { id: "8", unit: "cup" },
  { id: "9", unit: "tbsp" },
  { id: "10", unit: "tsp" },
  { id: "11", unit: "piece" },
  { id: "12", unit: "serving" },
  { id: "13", unit: "slice" },
  { id: "14", unit: "pinch" },
  { id: "15", unit: "dash" },
  { id: "16", unit: "quart" },
  { id: "17", unit: "pint" },
  { id: "18", unit: "gallon" },
  { id: "19", unit: "cm" },
  { id: "20", unit: "inch" },
];

// Helper function to get ItemSelection by item_name
const getItemSelection = (itemName: string): ItemSelection => {
  return dummyItems.find((item) => item.item_name === itemName)!;
};

// Define MealSelection objects
const dummyMeals: MealSelection[] = [
  {
    id: "meal-1",
    meal_name: "Ikan masak merah",
    description: "A rich and flavorful fish dish cooked in a red chili sauce.",
    item_list: [
      {
        id: "meal-1-item-1",
        item_selection_id: getItemSelection("Fish Fillet"),
        quantity: 1,
        unit: { id: "11", unit: "piece" },
      },
      {
        id: "meal-1-item-2",
        item_selection_id: getItemSelection("Red Chili Sauce"),
        quantity: 2,
        unit: { id: "9", unit: "tbsp" },
      },
    ],
    cooking_guide: "",
  },
  {
    id: "meal-2",
    meal_name: "Nasi Lemak",
    description:
      "Traditional Malaysian dish with rice cooked in coconut milk, served with various accompaniments.",
    item_list: [
      {
        id: "meal-2-item-1",
        item_selection_id: getItemSelection("Coconut Rice"),
        quantity: 1,
        unit: { id: "8", unit: "cup" },
      },
      {
        id: "meal-2-item-2",
        item_selection_id: getItemSelection("Sambal"),
        quantity: 1,
        unit: { id: "9", unit: "tbsp" },
      },
      {
        id: "meal-2-item-3",
        item_selection_id: getItemSelection("Fried Anchovies"),
        quantity: 1,
        unit: { id: "9", unit: "tbsp" },
      },
      {
        id: "meal-2-item-4",
        item_selection_id: getItemSelection("Boiled Egg"),
        quantity: 1,
        unit: { id: "11", unit: "piece" },
      },
    ],
    cooking_guide: "",
  },
  {
    id: "meal-3",
    meal_name: "Ayam masak lemak cili api",
    description:
      "A spicy and creamy chicken dish cooked with turmeric and coconut milk.",
    item_list: [
      {
        id: "meal-3-item-1",
        item_selection_id: getItemSelection("Chicken"),
        quantity: 1,
        unit: { id: "1", unit: "kg" },
      },
      {
        id: "meal-3-item-2",
        item_selection_id: getItemSelection("Turmeric"),
        quantity: 1,
        unit: { id: "9", unit: "tbsp" },
      },
      {
        id: "meal-3-item-3",
        item_selection_id: getItemSelection("Coconut Milk"),
        quantity: 2,
        unit: { id: "8", unit: "cup" },
      },
    ],
    cooking_guide: "",
  },
  {
    id: "meal-4",
    meal_name: "Kentang goreng",
    description:
      "Crispy and golden French fries, a perfect snack or side dish.",
    item_list: [
      {
        id: "meal-4-item-1",
        item_selection_id: getItemSelection("Potatoes"),
        quantity: 2,
        unit: { id: "11", unit: "piece" },
      },
      {
        id: "meal-4-item-2",
        item_selection_id: getItemSelection("Salt"),
        quantity: 1,
        unit: { id: "10", unit: "tsp" },
      },
      {
        id: "meal-4-item-3",
        item_selection_id: getItemSelection("Oil"),
        quantity: 1,
        unit: { id: "8", unit: "cup" },
      },
    ],
    cooking_guide: "",
  },
  {
    id: "meal-5",
    meal_name: "Ayam panggang",
    description: "Juicy and flavorful grilled chicken, seasoned to perfection.",
    item_list: [
      {
        id: "meal-5-item-1",
        item_selection_id: getItemSelection("Chicken"),
        quantity: 1,
        unit: { id: "1", unit: "kg" },
      },
      {
        id: "meal-5-item-2",
        item_selection_id: getItemSelection("Grill Seasoning"),
        quantity: 1,
        unit: { id: "9", unit: "tbsp" },
      },
    ],
    cooking_guide: "",
  },
  {
    id: "meal-6",
    meal_name: "Salmon mentai",
    description:
      "Delicious salmon topped with creamy mentai sauce, broiled to perfection.",
    item_list: [
      {
        id: "meal-6-item-1",
        item_selection_id: getItemSelection("Salmon Fillet"),
        quantity: 1,
        unit: { id: "11", unit: "piece" },
      },
      {
        id: "meal-6-item-2",
        item_selection_id: getItemSelection("Mentai Sauce"),
        quantity: 1,
        unit: { id: "9", unit: "tbsp" },
      },
    ],
    cooking_guide: "",
  },
];

const dummyAddNewMeal: MealSelection = {
  id: "meal-new",
  meal_name: "",
  description: "",
  item_list: [],
  cooking_guide: "",
};

const dummyAddNewItemForMeal = (
  mealId: string,
  itemCount: number
): ItemForMeal => {
  const generatedId = `${mealId}-item-${itemCount}`;
  return {
    id: generatedId,
    item_selection_id: { id: "XXX", item_name: "", unit: "", units: [] },
    quantity: null,
    unit: { id: "XXX", unit: "" },
  };
};

export {
  dummyItems,
  dummyMeals,
  dummyUnits,
  dummyAddNewMeal,
  dummyAddNewItemForMeal,
};
