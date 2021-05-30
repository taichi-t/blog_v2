/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from '@linaria/core';
import Image from 'next/image';
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
        <Image
          src="/images/logo.png"
          alt="me"
          width="100%"
          height="100%"
          loading="lazy"
          className={iconStyle}
        />
      </a>
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;

const iconStyle = css`
  &:hover {
    opacity: 0.8;
  }
`;
