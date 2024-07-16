import { create } from "zustand";
import { dummyMeals, dummyAddNewMeal } from "@/dummy_data";

const useMealListStore: any = create((set: any) => ({
  mealList: dummyMeals as MealSelection[],
  addNewMeal: (newMeal: MealSelection) => addNewMeal(set, newMeal),
  removeMeal: (mealId: string) => removeMeal(set, mealId),
}));

export default useMealListStore;

const addNewMeal = (set: any, newMeal: MealSelection) => {
  set(({ mealList }: any) => {
    return {
      mealList: [...mealList, newMeal],
    };
  });
};

const removeMeal = (set: any, mealId: string) => {
  set(({ mealList }: any) => {
    return {
      mealList: mealList.filter((elem: MealSelection) => elem.id !== mealId),
    };
  });
};
