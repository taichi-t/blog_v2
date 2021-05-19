import { css } from '@linaria/core';
import {
  CodeComponent,
  ReactMarkdownNames,
} from 'react-markdown/src/ast-to-react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock: CodeComponent | ReactMarkdownNames = ({
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter
      language={match[1]}
      PreTag="div"
      style={vscDarkPlus}
      children={String(children).replace(/\n$/, '')}
      {...props}
      wrapLongLines={false}
    />
  ) : (
    <code
      {...props}
      children={String(children).replace(/\n$/, '')}
      className={InlineCodeStyles}
    />
  );
};

export default CodeBlock;

const InlineCodeStyles = css`
  font-family: var(--font-family-code);
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: var(--color-grey200);
  border-radius: 3px;
`;
