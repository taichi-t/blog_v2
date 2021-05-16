import * as React from 'react';
import { css } from '@linaria/core';
import ThemeSwitcher from './ThemeSwicher';
import LangSwitcher from './LangSwitcher';

const Navbar: React.VFC = () => {
  return (
    <nav className={NavbarLayout}>
      <ThemeSwitcher />
      <LangSwitcher />
    </nav>
  );
};

export default Navbar;

const NavbarLayout = css``;
