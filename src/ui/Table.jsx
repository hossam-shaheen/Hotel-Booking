import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();
export const Table = ({ children, $columns }) => {
  return (
    <TableContext.Provider value={{ $columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
};

const TableHeader = ({ children }) => {
  const { $columns } = useContext(TableContext);
  return (
    <StyledHeader>
      <CommonRow $columns={$columns}>{children}</CommonRow>
    </StyledHeader>
  );
};

const TableBody = ({ data, render }) => {
  return (
    <StyledBody>
      <StyledRow>{data.map(render)}</StyledRow>
    </StyledBody>
  );
};

const TableFooter = ({ children }) => {
  return <Footer>{children}</Footer>;
};

const TableEmpty = ({ children }) => {
  return <Empty>{children}</Empty>;
};

Table.TableHeader = TableHeader;
Table.TableBody = TableBody;
Table.TableFooter = TableFooter;
Table.TableEmpty = TableEmpty;
