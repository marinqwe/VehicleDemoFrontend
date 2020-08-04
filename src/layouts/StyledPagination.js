import styled from 'styled-components';

export const StyledPagination = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem;
  border: 1px solid ${(props) => props.theme.lightgrey};
  border-radius: 4px;
  button {
    border: none;
    border-right: 1px solid ${(props) => props.theme.lightgrey};
    font-size: calc(4px + 2vmin);
    cursor: pointer;
  }
  & > * {
    margin: 0;
    padding: 5px 10px;
    border-right: 1px solid ${(props) => props.theme.lightgrey};
    &:last-child {
      border-right: 0;
    }
  }
`;
