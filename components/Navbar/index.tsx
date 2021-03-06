import { css } from '@linaria/core';
import Link from 'next/link';
import * as React from 'react';

import Icon from './Icon';
import LangSwitcher from './LangSwitcher';
import ThemeSwitcher from './ThemeSwicher';

const Navbar: React.VFC = () => {
  return (
    <nav className={navbarLayout}>
      <Link href="/" passHref shallow>
        <Icon />
      </Link>

      <div className={switchLayout}>
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;

const navbarLayout = css`
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
`;

const switchLayout = css`
  grid-column: 3 / 3;
  display: flex;
  align-items: center;
  & > div:after {
    content: '|';
    margin: 0 1rem;
  }
`;
