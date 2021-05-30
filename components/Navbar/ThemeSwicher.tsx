import { css } from '@linaria/core';
import * as React from 'react';

import useToggleTheme from '@/hooks/useToggleTheme';

const ThemeSwitcher: React.VFC = () => {
  const { onToggleTheme, dark } = useToggleTheme();

  return (
    <button onClick={onToggleTheme} className={ButtonStyles}>
      {dark ? '🌞' : '🌚'}
    </button>
  );
};

export default ThemeSwitcher;

const ButtonStyles = css`
  position: relative;
  font-size: var(--font-size-xl);
`;
