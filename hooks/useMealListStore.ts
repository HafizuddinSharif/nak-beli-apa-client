import { create } from "zustand";
// Dummy data
// Define ItemSelection objects
const items: ItemSelection[] = [
  { id: "item-1", item_name: "Fish Fillet", unit: "piece" },
  { id: "item-2", item_name: "Red Chili Sauce", unit: "cup" },
  { id: "item-3", item_name: "Coconut Rice", unit: "serving" },
  { id: "item-4", item_name: "Sambal", unit: "serving" },
  { id: "item-5", item_name: "Fried Anchovies", unit: "serving" },
  { id: "item-6", item_name: "Boiled Egg", unit: "piece" },
  { id: "item-7", item_name: "Chicken", unit: "piece" },
  { id: "item-8", item_name: "Turmeric", unit: "teaspoon" },
  { id: "item-9", item_name: "Coconut Milk", unit: "cup" },
  { id: "item-10", item_name: "Potatoes", unit: "piece" },
  { id: "item-11", item_name: "Salt", unit: "teaspoon" },
  { id: "item-12", item_name: "Oil", unit: "cup" },
  { id: "item-13", item_name: "Grill Seasoning", unit: "teaspoon" },
  { id: "item-14", item_name: "Salmon Fillet", unit: "piece" },
  { id: "item-15", item_name: "Mentai Sauce", unit: "cup" },
];

// Helper function to get ItemSelection by item_name
const getItemSelection = (itemName: string): ItemSelection => {
  return items.find((item) => item.item_name === itemName)!;
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
      },
      {
        id: "meal-1-item-2",
        item_selection_id: getItemSelection("Red Chili Sauce"),
        quantity: 2,
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
      },
      {
        id: "meal-2-item-2",
        item_selection_id: getItemSelection("Sambal"),
        quantity: 1,
      },
      {
        id: "meal-2-item-3",
        item_selection_id: getItemSelection("Fried Anchovies"),
        quantity: 1,
      },
      {
        id: "meal-2-item-4",
        item_selection_id: getItemSelection("Boiled Egg"),
        quantity: 1,
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
      },
      {
        id: "meal-3-item-2",
        item_selection_id: getItemSelection("Turmeric"),
        quantity: 1,
      },
      {
        id: "meal-3-item-3",
        item_selection_id: getItemSelection("Coconut Milk"),
        quantity: 2,
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
      },
      {
        id: "meal-4-item-2",
        item_selection_id: getItemSelection("Salt"),
        quantity: 1,
      },
      {
        id: "meal-4-item-3",
        item_selection_id: getItemSelection("Oil"),
        quantity: 1,
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
      },
      {
        id: "meal-5-item-2",
        item_selection_id: getItemSelection("Grill Seasoning"),
        quantity: 1,
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
      },
      {
        id: "meal-6-item-2",
        item_selection_id: getItemSelection("Mentai Sauce"),
        quantity: 1,
      },
    ],
    cooking_guide: "",
  },
];

const dummyAddNewMeal: MealSelection = {
  id: "meal-7",
  meal_name: "Chicken wrap",
  description:
    "A delicious chicken wrap with fresh vegetables and a tangy sauce.",
  item_list: [
    {
      id: "meal-7-item-1",
      item_selection_id: getItemSelection("Chicken"),
      quantity: 1,
    },
    {
      id: "meal-7-item-2",
      item_selection_id: getItemSelection("Grill Seasoning"),
      quantity: 1,
    },
  ],
  cooking_guide: "",
};

const useMealListStore: any = create((set: any) => ({
  mealList: dummyMeals as MealSelection[],
  addNewMeal: () => addNewMeal(set),
}));

export default useMealListStore;

const addNewMeal = (set: any) => {
  console.log("New meal is added :)");
  set(({ mealList }: any) => {
    return {
      mealList: [...mealList, dummyAddNewMeal],
    };
  });
};
