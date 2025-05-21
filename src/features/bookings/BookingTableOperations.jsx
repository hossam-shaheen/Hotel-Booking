import { SortBy } from "../../ui/SortBy";
import { Filter } from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filteredKey="status"
        filteredOptions={[
          { value: "all", option: "All" },
          { value: "checked-out", option: "Checked out" },
          { value: "checked-in", option: "Checked in" },
          { value: "unconfirmed", option: "Unconfirmed" },
        ]}
      />

      <SortBy
        sortingKey="sorting"
        sortedOptions={[
          { value: "startDate-desc", option: "Sort by date (recent first)" },
          { value: "startDate-asc", option: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            option: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", option: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
