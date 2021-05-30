import { styled } from '@linaria/react';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

const Name = () => {
  return (
    <Text>
      <FormattedMessage defaultMessage="Taichi" />
      @code 🧑‍💻
    </Text>
  );
};

export default Name;

const Text = styled.p`
  font-size: var(--font-size-xl);
  font-weight: bold;
`;
