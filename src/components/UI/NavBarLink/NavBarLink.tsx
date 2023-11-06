import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

interface NavBarLinkProps {
  path: string;
  end?: boolean;
  label: string;
  icon: string;
  collapsed?: boolean;
}

const NavBarLink = ({
  path = '/',
  end = false,
  label = 'Home',
  icon,
  collapsed = false,
}: NavBarLinkProps) => {
  return (
    <NavLink
      to={path}
      className={`navlink-container ${
        collapsed && 'navlink-container--collapsed'
      }`}
      end={end}
    >
      <img src={icon} alt={label} className='navlink-icon' />
      <span
        className={`navlink-label ${collapsed && 'navlink-label--collapsed'}`}
      >
        {label}
      </span>
    </NavLink>
  );
};

export default NavBarLink;
