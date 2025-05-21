import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { CabinTable } from "../features/cabins/CabinTable";
import Spinner from "../ui/Spinner";
import useFetchCabin from "../hooks/useFetchCabin";

function Cabins() {
  const { cabins, isPending, error, status } = useFetchCabin();

  if (isPending === "fetching") return <Spinner />;
  if (error?.message) return <div>Error: {error?.message}</div>;

  return (
    <Row type="vertical">
      <Heading as="h1">All cabins</Heading>
      {status === "success" && !error?.message && (
        <CabinTable cabins={cabins} />
      )}
    </Row>
  );
}

export default Cabins;
