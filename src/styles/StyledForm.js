import styled from 'styled-components';

export const StyledForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.input`
  padding: 10px;
  margin: 10px;
  font-size: large;
  width: 60%;
  min-width: 200px;
  border: none;
  border-bottom: 1px solid grey;
  border-radius: 2px;
`;

export const StyledSearch = styled.form`
  width: 100%;
  display: flex;
  label {
    width: 100%;
    display: flex;
    align-items: center;
    input {
      width: 100%;
      margin: 10px 0;
    }
  }
`;
