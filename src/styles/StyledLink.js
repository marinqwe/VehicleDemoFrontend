import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: black;
  &:hover{
    color: ${props => props.theme.green};
  }
`;