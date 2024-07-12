import { dummyMeals } from "@/dummy_data";
import { QualifiedSlot } from "expo-router/build/views/Navigator";
import { create } from "zustand";

const useBasketStore: any = create((set: any) => ({
  selectedMeals: [] as (MealSelection & { quantity: number })[],
  numOfSelectedMeals: 0 as number,
  addMeal: (newMeal: MealSelection) => addMeal(set, newMeal),
  removeMeal: (mealId: string) => removeMeal(set, mealId),
  fetchSelectedMeals: () => fetchSelectedMeals(set),
}));

export default useBasketStore;

const addMeal = (set: any, newMeal: MealSelection) => {
  set(
    ({
      selectedMeals,
      numOfSelectedMeals,
    }: {
      selectedMeals: (MealSelection & { quantity: number })[];
      numOfSelectedMeals: number;
    }) => {
      const alreadySelected = selectedMeals.find(
        (meal) => meal.id === newMeal.id
      ) as MealSelection & { quantity: number };

      if (alreadySelected) {
        alreadySelected.quantity = alreadySelected.quantity + 1;
        return {
          selectedMeals: selectedMeals,
          numOfSelectedMeals: numOfSelectedMeals + 1,
        };
      }

      return {
        selectedMeals: [...selectedMeals, { ...newMeal, quantity: 1 }],
        numOfSelectedMeals: numOfSelectedMeals + 1,
      };
    }
  );
};

const removeMeal = (set, mealId) => {
  set(({ selectedMeals, numOfSelectedMeals }: any) => {
    const alreadySelected = selectedMeals.find(
      (meal) => meal.id === mealId
    ) as MealSelection & { quantity: number };

    alreadySelected.quantity = alreadySelected.quantity - 1;

    return {
      selectedMeals:
        alreadySelected.quantity == 0
          ? (selectedMeals as MealSelection[]).filter(
              (meal) => meal.id !== mealId
            )
          : selectedMeals,
      numOfSelectedMeals: numOfSelectedMeals - 1,
    };
  });
};

const fetchSelectedMeals = (set) => {
  console.log("Fetching selected meals...");
  const dummySelectedMeals = [
    { ...dummyMeals.at(0), quantity: 1 },
    { ...dummyMeals.at(2), quantity: 1 },
  ];
  set(() => {
    return {
      selectedMeals: dummySelectedMeals,
      numOfSelectedMeals: dummySelectedMeals.length,
    };
  });
};
