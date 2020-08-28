import styled from 'styled-components';

export const GreenButton = styled.button`
  width: 15%;
  padding: 5px 10px;
  margin: 10px;
  cursor: pointer;
  color: white;
  background-color: ${(props) => props.theme.green};
  border: 0px;
  border-radius: 3px;
  appearance: none;
  font-size: calc(8px + 2vmin);
  min-width: 90px;
`;

export const CancelButton = styled.p`
  width: 15%;
  padding: 5px 10px;
  margin: 10px;
  cursor: pointer;
  color: white;
  background-color: ${(props) => props.theme.black};
  border-radius: 3px;
  text-align: center;
  font-size: calc(8px + 2vmin);
  min-width: 90px;
`;

export const ButtonGroup = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
`;
