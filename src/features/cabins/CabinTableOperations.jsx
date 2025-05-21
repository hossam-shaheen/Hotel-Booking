import { SortBy } from "../../ui/SortBy";
import { Filter } from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  const filteredOptions = [
    {
      value: "all",
      option: "All",
    },
    {
      value: "discount",
      option: "With-Discount",
    },
    {
      value: "withoutDiscount",
      option: "Without-Discount",
    },
  ];
  const selectOptions = [
    {
      value: "name-asc",
      option: "Cabin Name(Asc)",
    },
    {
      value: "name-dsc",
      option: "Cabin Name(dsc)",
    },
    {
      value: "regularPrice-asc",
      option: "Cabin Price(asc)",
    },
    {
      value: "regularPrice-dsc",
      option: "Cabin Price(dsc)",
    },
    {
      value: "maxCapacity-asc",
      option: "Cabin max capacity(asc)",
    },
    {
      value: "maxCapacity-dsc",
      option: "Cabin max capacity(dsc)",
    },
  ];
  return (
    <TableOperations>
      <Filter
        filteredKey="discount" 
        filteredOptions={filteredOptions}
      />

      <SortBy
        sortingKey="sorting"
        sortedOptions={selectOptions}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
