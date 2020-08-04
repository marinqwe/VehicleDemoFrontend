import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 10px auto;
  th,
  td {
    border-bottom: 1px solid white;
    padding: 5px;
    text-align: left;
  }
  th,
  tr:hover {
    background-color: ${(props) => props.theme.lightgrey};
  }
  tr {
    border-radius: 5px;
  }
`;

export const StyledTd = styled.td`
  :hover {
    color: ${(props) => props.theme.red};
    cursor: pointer;
  }
`;
