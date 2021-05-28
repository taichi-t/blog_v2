import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

const Column3 = () => {
  return (
    <ul className={root}>
      <li>
        <Title>
          <FormattedMessage defaultMessage="location" />
        </Title>
        <p>
          <FormattedMessage defaultMessage="Vancouver, Canada" />
        </p>
      </li>
      <li>
        <Title>
          <FormattedMessage defaultMessage="hometown" />
        </Title>
        <p>
          <FormattedMessage defaultMessage="Japan" />
        </p>
      </li>
      <li>
        <Title>
          <FormattedMessage defaultMessage="work" />
        </Title>
        <p>
          <FormattedMessage defaultMessage="Frontend Developer" />
        </p>
      </li>
    </ul>
  );
};

export default Column3;

const Title = styled.h3`
  text-transform: uppercase;
  color: var(--color-secondaryText);
  font-weight: bold;
  font-size: var(--font-size-base);
`;

const root = css`
  margin: auto;
  & > :not(:last-of-type):nth-of-type(n) {
    margin-bottom: var(--spacing-size-xs);
  }
  & ${Title} {
    margin-bottom: var(--spacing-size-xxs);
  }
`;
