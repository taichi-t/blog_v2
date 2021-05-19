/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type Props = {
  onMouseEnter?:
    | ((event: React.MouseEvent<Element, MouseEvent>) => void)
    | undefined;
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
  href?: string | undefined;
  ref?: any;
} & JSX.IntrinsicElements['a'];

const Icon = React.forwardRef<HTMLAnchorElement, Props>(
  ({ href, onClick, ...rest }, ref) => {
    return (
      <a href={href} ref={ref} onClick={onClick} {...rest}>
        <img src="/images/logo.png" alt="me" width="100%" height="100%" />
      </a>
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;
