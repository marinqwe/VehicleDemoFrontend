import React from 'react';
import { StyledNavBar, StyledNavLink } from '../layouts';

function Navbar() {
  return (
    <StyledNavBar>
      <StyledNavLink exact to='/' activeClassName='yo'>
        Home
      </StyledNavLink>
      <StyledNavLink to='/vehiclemakes' activeClassName='yo'>
        Vehicle Makes
      </StyledNavLink>
      <StyledNavLink to='/vehiclemodels' activeClassName='yo'>
        Vehicle Models
      </StyledNavLink>
    </StyledNavBar>
  );
}

export default Navbar;
