import { styled } from '@linaria/react';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

const Description = () => {
  return (
    <Text>
      <FormattedMessage defaultMessage="I love learing new technologies" /> 💻
    </Text>
  );
};

export default Description;

const Text = styled.p`
  color: var(--color-secondaryText);
  font-weight: bold;
  font-size: var(--font-size-md);
`;
