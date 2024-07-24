import { create } from "zustand";

const useMealListStore: any = create((set: any) => ({
  mealList: [] as MealSelection[],
  addNewMeal: (newMeal: MealSelection) => addNewMeal(set, newMeal),
  removeMeal: (mealId: string) => removeMeal(set, mealId),
  updateMeal: (meal: MealSelection) => updateMeal(set, meal),
  fetchMealList: (payload) => fetchMealList(set, payload),
}));

export default useMealListStore;

const fetchMealList = (set: any, payload: any) => {
  set(() => {
    return { mealList: payload };
  });
};
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
      mealList: mealList.filter(
        (elem: MealSelection) => elem.id !== parseInt(mealId)
      ),
    };
  });
};

const updateMeal = (set: any, meal: MealSelection) => {
  set(({ mealList }: { mealList: MealSelection[] }) => {
    const updatedMealList = [...mealList];
    let changedMeal = updatedMealList.find((elem) => elem.id === meal.id);
    console.log("BEFORE CHANGE", changedMeal.description);
    changedMeal.cooking_guide = meal.cooking_guide;
    changedMeal.description = meal.description;
    changedMeal.item_list = meal.item_list;
    changedMeal.meal_name = meal.meal_name;
    console.log("AFTER CHANGE", changedMeal.description);
    return {
      mealList: updatedMealList,
    };
  });
};
