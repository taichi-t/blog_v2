type Props = () => { onToggleTheme: () => void };

const useToggleTheme: Props = () => {
  const onToggleTheme = () => {
    if (!process.browser) return;
    const attribute = document.documentElement.getAttribute('data-theme');
    if (attribute === 'dark') {
      document.documentElement.setAttribute('data-theme', 'none');
      return;
    }
    document.documentElement.setAttribute('data-theme', 'dark');
  };
  return {
    onToggleTheme,
  };
};

export default useToggleTheme;
