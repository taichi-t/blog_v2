import * as React from 'react';
import Image from 'next/image';
import { styled } from '@linaria/react';

const Column1 = () => {
  return (
    <StyledImage
      src="/images/me.jpg"
      width="100%"
      height="auto"
      loading="lazy"
      objectFit="cover"
    />
  );
};

export default Column1;

const StyledImage = styled(Image)`
  border-radius: 50%;
  border: 3px solid var(--color-border) !important;
`;
