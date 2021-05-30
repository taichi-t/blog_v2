import { cx } from '@linaria/core';
import { styled } from '@linaria/react';
import React from 'react';

import { borderStyle, boxShadowStyle } from '@/components/shered';

type Props = JSX.IntrinsicElements['button'];

const ContentsSwitch = React.forwardRef<HTMLButtonElement, Props>(
  ({ onClick, ...rest }, ref) => {
    return (
      <Button
        className={cx(borderStyle, boxShadowStyle)}
        {...rest}
        ref={ref}
        onClick={onClick}>
        📖
      </Button>
    );
  }
);

export default ContentsSwitch;

ContentsSwitch.displayName = 'ContentsSwitch';

const Button = styled.button`
  background-color: var(--color-paper);
  font-size: var(--font-size-xl);
  width: 5rem;
  height: 5rem;
`;
