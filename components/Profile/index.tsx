import { css, cx } from '@linaria/core';
import * as React from 'react';
import Column1 from './Column1';
import Column2 from './Column2';
import Column3 from './Column3';
import { border, boxShadow } from '@/components/shered';

export const Profile: React.VFC = () => {
  return (
    <div className={cx(root, border, boxShadow)}>
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
`;
