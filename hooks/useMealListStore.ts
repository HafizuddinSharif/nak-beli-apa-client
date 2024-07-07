import { create } from "zustand";
// Dummy data
const dummyMeals: MealSelection[] = [
  {
    id: "meal-1",
    meal_name: "Ikan masak merah",
    description: "A rich and flavorful fish dish cooked in a red chili sauce.",
    item_list: [
      // { item_name: "Fish Fillet", quantity: 1 },
      // { item_name: "Red Chili Sauce", quantity: 2 }
    ],
  },
  {
    id: "meal-2",
    meal_name: "Nasi Lemak",
    description:
      "Traditional Malaysian dish with rice cooked in coconut milk, served with various accompaniments.",
    item_list: [
      // { item_name: "Coconut Rice", quantity: 1 },
      // { item_name: "Sambal", quantity: 1 },
      // { item_name: "Fried Anchovies", quantity: 1 },
      // { item_name: "Boiled Egg", quantity: 1 }
    ],
  },
  {
    id: "meal-3",
    meal_name: "Ayam masak lemak cili api",
    description:
      "A spicy and creamy chicken dish cooked with turmeric and coconut milk.",
    item_list: [
      // { item_name: "Chicken", quantity: 1 },
      // { item_name: "Turmeric", quantity: 1 },
      // { item_name: "Coconut Milk", quantity: 2 }
    ],
  },
  {
    id: "meal-4",
    meal_name: "Kentang goreng",
    description:
      "Crispy and golden French fries, a perfect snack or side dish.",
    item_list: [
      // { item_name: "Potatoes", quantity: 2 },
      // { item_name: "Salt", quantity: 1 },
      // { item_name: "Oil", quantity: 1 }
    ],
  },
  {
    id: "meal-5",
    meal_name: "Ayam panggang",
    description: "Juicy and flavorful grilled chicken, seasoned to perfection.",
    item_list: [
      // { item_name: "Chicken", quantity: 1 },
      // { item_name: "Grill Seasoning", quantity: 1 }
    ],
  },
  {
    id: "meal-6",
    meal_name: "Salmon mentai",
    description:
      "Delicious salmon topped with creamy mentai sauce, broiled to perfection.",
    item_list: [
      // { item_name: "Salmon Fillet", quantity: 1 },
      // { item_name: "Mentai Sauce", quantity: 1 }
    ],
  },
];

const dummyAddNewMeal = {
  id: "meal-7",
  meal_name: "Chicken wrap",
  description:
    "Delicious salmon topped with creamy mentai sauce, broiled to perfection.",
  item_list: [
    // { item_name: "Salmon Fillet", quantity: 1 },
    // { item_name: "Mentai Sauce", quantity: 1 }
  ],
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
