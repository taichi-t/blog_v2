import { styled } from '@linaria/react';
import * as React from 'react';

const Name = () => {
  return <Text>タイチ@code 🧑‍💻</Text>;
};

export default Name;

const Text = styled.p`
  font-size: var(--font-size-xl);
  font-weight: bold;
`;
