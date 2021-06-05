import * as React from 'react';
import { css } from '@linaria/core';
import Image from 'next/image';
import { BREAKPOINTS } from '@/constants/breakpoints';

const Column1 = () => {
  return (
    <div className={root}>
      <Image
        src="/images/me.jpg"
        width="200px"
        height="200px"
        loading="lazy"
        objectFit="contain"
      />
    </div>
  );
};

export default Column1;

const root = css`
  box-sizing: border-box;
  text-align: center;

  & > div {
    background-color: var(--color-paper);
    border-radius: 100%;
    border: 3px solid var(--color-border);
  }
  ${BREAKPOINTS.MOBILE} {
    width: 100px;
    position: absolute;
    top: -50px;
    left: 5%;
    & > :nth-child(2) {
      margin-top: calc(var(--spacing-size-sm) + 25px);
    }
  }
`;
