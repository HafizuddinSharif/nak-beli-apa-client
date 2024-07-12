import { create } from "zustand";

const useChecklistStore = create((set: any) => ({
  checklist: [] as GroceryItem[],
  generateChecklist: (selectedMeals: MealBasketItem[]) =>
    generateChecklist(set, selectedMeals),
}));

const generateChecklist = (set: any, selectedMeals: MealBasketItem[]) => {
  set(() => {
    const newChecklist = [] as GroceryItem[];
    selectedMeals.forEach((meal) => {
      meal.item_list.forEach((item, index) => {
        console.log(
          "I have been called, ",
          index,
          item.item_selection_id.item_name,
          item.item_selection_id.id
        );
        const alreadyHave = newChecklist.find(
          (itm) => itm.id === item.item_selection_id.id
        );

        if (alreadyHave) {
          console.log("Is this same?", item.id, item.item_selection_id.id);
          alreadyHave.quantity =
            alreadyHave.quantity + item.quantity * meal.quantity;
        } else {
          const newGroceryItem = {
            id: item.item_selection_id.id,
            item_selection: item.item_selection_id,
            hasBought: false,
            quantity: item.quantity * meal.quantity,
          } as GroceryItem;
          newChecklist.push(newGroceryItem);
        }

        console.log("Next entry");
      });
    });
    return {
      checklist: newChecklist,
    };
  });
};

export default useChecklistStore;
