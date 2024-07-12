import { create } from "zustand";
import { dummyMeals, dummyAddNewMeal } from "@/dummy_data";

const useMealListStore: any = create((set: any) => ({
  mealList: dummyMeals as MealSelection[],
  addNewMeal: (newMeal: MealSelection) => addNewMeal(set, newMeal),
}));

export default useMealListStore;

const addNewMeal = (set: any, newMeal: MealSelection) => {
  set(({ mealList }: any) => {
    return {
      mealList: [...mealList, newMeal],
    };
  });
};
