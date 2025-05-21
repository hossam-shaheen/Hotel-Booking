import styled from "styled-components";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../utils/Constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Pagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  let TotalOfNumPages = Math.ceil(count / PAGE_SIZE);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", currentPage);
    setSearchParams(newParams);
  }, [currentPage, searchParams, setSearchParams]);

  const next = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, TotalOfNumPages));
  };

  const previous = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const from = currentPage * PAGE_SIZE - PAGE_SIZE;
  const to = from + PAGE_SIZE;
  return (
    <StyledPagination>
      <P>
        Showing
        <span> {from} </span> to{" "}
        <span> {currentPage == TotalOfNumPages ? count : to} </span> of{" "}
        <span> {count}</span>
      </P>
      <Buttons>
        <PaginationButton onClick={previous}>
          <GrFormPrevious />
          prev
        </PaginationButton>
        <PaginationButton onClick={next}>
          Next
          <GrFormNext />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;
