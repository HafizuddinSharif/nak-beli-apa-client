import { create } from "zustand";

// Dummy data
const dummyMeals = [
  "Ikan masak merah",
  "Nasi Lemak",
  "Ayam masak lemak cili api",
  "Kentang goreng",
  "Ayam panggang",
  "Salmon mentai",
];

const useMealListStore: any = create((set: any) => ({
  mealList: dummyMeals,
  addNewMeal: () => addNewMeal(set),
  increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears: any) => set({ bears: newBears }),
}));

export default useMealListStore;

const addNewMeal = (set: any) => {
  console.log("New meal is added :)");
  set(({ mealList }: any) => {
    return {
      mealList: [...mealList, "New item 1"],
    };
  });
};
