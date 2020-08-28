import React from 'react';
import { StyledNavBar, StyledNavLink } from '../styles';

function Navbar() {
  return (
    <StyledNavBar>
      <StyledNavLink exact to='/' activeClassName='yo'>
        Home
      </StyledNavLink>
      <StyledNavLink to='/vehicle-makes' activeClassName='yo'>
        Vehicle Makes
      </StyledNavLink>
      <StyledNavLink to='/vehicle-models' activeClassName='yo'>
        Vehicle Models
      </StyledNavLink>
    </StyledNavBar>
  );
}

export default Navbar;
