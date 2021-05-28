import { styled } from '@linaria/react';
import * as React from 'react';

const Description = () => {
  return <Text>新しいものが好き 💻</Text>;
};

export default Description;

const Text = styled.p`
  color: var(--color-secondaryText);
  font-weight: bold;
  font-size: var(--font-size-md);
`;
