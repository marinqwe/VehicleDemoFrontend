import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledNavBar = styled.div`
  display: flex;
  padding: 0 4vw;
  background-color: ${props => props.theme.black};
`;


export const StyledNavLink = styled(NavLink)`
  margin: 0 10px;
  padding: 2vh 0;
  cursor: pointer;
  text-decoration: none;
  font-size: large;
  color: ${props => props.theme.lightgrey};
  &.${(props) => props.activeClassName} {
    color: ${props => props.theme.green};
  }
  &:hover{
    color: ${props => props.theme.green};
  }
`;