interface GroceryItem {
  id: string; // Unique identifier for the item
  item_selection: ItemSelection; // Name of the grocery item
  quantity: number; // Quantity of the item to purchase
  hasBought: boolean; // Indicates if the item has been bought
  unit: Unit;
}
