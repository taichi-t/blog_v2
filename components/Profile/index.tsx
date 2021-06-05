import { css, cx } from '@linaria/core';
import * as React from 'react';

import { borderStyle, boxShadowStyle } from '@/components/shered';
import { BREAKPOINTS } from '@/constants/breakpoints';

import Column1 from './Column1';
import Column2 from './Column2';
import Column3 from './Column3';

export const Profile: React.VFC = () => {
  return (
    <div className={cx(root, borderStyle, boxShadowStyle)}>
      <Column1 />
      <Column2 />
      <Column3 />
    </div>
  );
};

export default Profile;

const root = css`
  display: grid;
  grid-template-columns: 150px auto auto;
  gap: var(--spacing-size-base);
  background-color: var(--color-paper);
  padding: var(--spacing-size-sm);
  width: fit-content;
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  ${BREAKPOINTS.MOBILE} {
    width: 100%;
    display: block;
    & > *:not(:last-child) {
      margin-bottom: var(--spacing-size-sm);
    }
    & > :nth-child(2) {
      margin-top: 50px;
    }
    box-shadow: none;
  }
`;
