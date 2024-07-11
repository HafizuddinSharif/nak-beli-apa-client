import { dummyItems, dummyUnits } from "@/dummy_data";
import { create } from "zustand";

const convertToDropdownOption = (list: any): DropdownOption[] => {
  if (!list) {
    return [];
  }
  const options: DropdownOption[] = [];
  list.forEach((elem) => {
    if ("unit" in elem && !("item_name" in elem)) {
      // elem is a Unit
      options.push({ value: elem.unit, label: elem.unit });
    } else if ("item_name" in elem) {
      // elem is an ItemSelection
      elem = elem as ItemSelection;
      options.push({ value: elem.id, label: elem.item_name });
    }
  });

  return options;
};

// store for dropdown options
const useContentStore: any = create((set: any) => ({
  unitOptions: [] as DropdownOption[],
  itemOptions: [] as DropdownOption[],
  fetchUnitOptions: () => fetchUnitOptions(set),
  fetchItemOptions: () => fetchItemOptions(set),
}));

export default useContentStore;

const fetchUnitOptions = (set: any) => {
  // fetch from BE should be done here
  const dropdownOption = convertToDropdownOption(dummyUnits);

  set(() => {
    return {
      unitOptions: dropdownOption,
    };
  });
};

const fetchItemOptions = (set: any) => {
  // fetch from BE should be done here
  const dropdownOption = convertToDropdownOption(dummyItems);

  set(() => {
    return {
      itemOptions: dropdownOption,
    };
  });
};
