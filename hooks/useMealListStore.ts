import { create } from "zustand";
import { dummyMeals, dummyAddNewMeal } from "@/dummy_data";

const useMealListStore: any = create((set: any) => ({
  mealList: dummyMeals as MealSelection[],
  addNewMeal: () => addNewMeal(set),
}));

export default useMealListStore;

const addNewMeal = (set: any) => {
  set(({ mealList }: any) => {
    return {
      mealList: [...mealList, dummyAddNewMeal],
    };
  });
};
