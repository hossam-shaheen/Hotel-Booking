import { useSearchParams } from "react-router-dom";
import { StyledSelect } from "./Select";



export const SortBy = ({ sortedOptions, sortingKey }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const onSelect = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(sortingKey, e.target.value);
    setSearchParams(newParams);
  };
  const selectedValue = searchParams.get(sortingKey) || sortedOptions.at(0).value;
  return (
    <StyledSelect onChange={onSelect} value={selectedValue}>
      {sortedOptions.length > 0 &&
        sortedOptions.map((selectOption) => (
          <option value={selectOption.value} key={selectOption.value}>
            {selectOption.option}
          </option>
        ))}
    </StyledSelect>
  );
};
