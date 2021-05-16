import { css } from '@linaria/core';
import useToggleTheme from '@/hooks/useToggleTheme';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

const ThemeSwitcher: React.VFC = () => {
  const { onToggleTheme } = useToggleTheme();

  return (
    <button onClick={onToggleTheme} className={ButtonStyles}>
      <FormattedMessage defaultMessage="Toggle dark Theme" />
    </button>
  );
};

export default ThemeSwitcher;

const ButtonStyles = css``;
