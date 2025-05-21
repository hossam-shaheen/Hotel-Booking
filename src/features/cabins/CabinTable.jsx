import CabinTableRow from "./CabinRow";
import AddNewCabin from "./AddNewCabin";
import { Table } from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import CabinTableOperations from "./CabinTableOperations";

export const CabinTable = ({ cabins }) => {
  const [searchParams, _] = useSearchParams();
  const currentFilterValue = searchParams.get("discount") ?? "all";

  let filteredCabins = [];

  // Filter cabins
  if (currentFilterValue === "all") filteredCabins = cabins;
  if (currentFilterValue === "discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  if (currentFilterValue === "withoutDiscount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  // Sort cabins
  const currentSortValue = searchParams.get("sorting") ?? "name-asc";
  const [field, order] = currentSortValue.split("-");

  filteredCabins = filteredCabins.sort((a, b) => {
    if (typeof a[field] === "string") {
      return order === "dsc"
        ? b[field].localeCompare(a[field])
        : a[field].localeCompare(b[field]);
    } else {
      return order === "dsc" ? b[field] - a[field] : a[field] - b[field];
    }
  });

  return (
    <>
      <CabinTableOperations />
      <Table $columns={"0.6fr 1.5fr 2fr 1.5fr 1fr 1fr 1fr"}>
        <Table.TableHeader>
          <div>Image</div>
          <div>Name</div>
          <div>Description</div>
          <div>Price</div>
          <div>maxCapacity</div>
          <div>Discount</div>
        </Table.TableHeader>

        <Table.TableBody
          data={filteredCabins}
          render={(cabin) => <CabinTableRow key={cabin.id} cabin={cabin} />}
        />
        {(filteredCabins.length === 0 || !filteredCabins) && (
          <Table.TableEmpty> there are no Cabins loaded. </Table.TableEmpty>
        )}
      </Table>

      <AddNewCabin />
    </>
  );
};
