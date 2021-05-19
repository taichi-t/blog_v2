import React from 'react';

type Props = () => { onToggleTheme: () => void; dark: boolean };

const useToggleTheme: Props = () => {
  const [dark, setDark] = React.useState(false);
  const onToggleTheme = () => {
    if (!process.browser) return;
    setDark(!dark);
  };
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'none');
  }, [dark]);
  return {
    onToggleTheme,
    dark,
  };
};

export default useToggleTheme;
