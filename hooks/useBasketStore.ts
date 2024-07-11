import { create } from "zustand";

const useBasketStore: any = create((set: any) => ({
  selectedMeal: [] as MealSelection[],
  numOfSelectedMeal: 0 as number,
  addMeal: () => addMeal(set),
  removeMeal: () => removeMeal(set),
}));

export default useBasketStore;

const addMeal = (set) => {};

const removeMeal = (set) => {};
