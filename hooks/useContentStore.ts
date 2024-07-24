import { DB } from "@/db/db";
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
  itemList: [] as ItemSelection[],
  unitList: [] as Unit[],
  fetchUnitOptions: (payload) => fetchUnitOptions(set, payload),
  fetchItemOptions: (payload) => fetchItemOptions(set, payload),
  fetchItemList: (payload) => fetchItemList(set, payload),
  fetchUnitList: (payload) => fetchUnitList(set, payload),
}));

export default useContentStore;

const fetchUnitOptions = (set: any, payload: any) => {
  // fetch from BE should be done here
  // const result = await DB.getAllUnitTables(db2);
  // console.log("Yeeted here", result);
  // const dropdownOption = convertToDropdownOption(result);
  const dropdownOption = convertToDropdownOption(payload);
  // console.log("DROPDOWN HERE: ", dropdownOption.length);

  set(() => {
    return {
      unitOptions: dropdownOption,
    };
  });
};

const fetchItemOptions = (set: any, payload: any) => {
  // fetch from BE should be done here
  const dropdownOption = convertToDropdownOption(payload);

  set(() => {
    return {
      itemOptions: dropdownOption,
    };
  });
};

const fetchItemList = (set: any, payload: any) => {
  set(() => {
    return {
      itemList: payload,
    };
  });
};

const fetchUnitList = (set: any, payload: any) => {
  set(() => {
    return {
      unitList: payload,
      // unitList: result,
    };
  });
};
