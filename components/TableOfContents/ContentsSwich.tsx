import { styled } from '@linaria/react';
import { cx } from '@linaria/core';
import React from 'react';
import { border, boxShadow } from '@/components/shered';

type Props = JSX.IntrinsicElements['button'];

const ContentsSwitch = React.forwardRef<HTMLButtonElement, Props>(
  ({ onClick, ...rest }, ref) => {
    return (
      <Button
        className={cx(border, boxShadow)}
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
