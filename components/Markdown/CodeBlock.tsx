import {
  CodeComponent,
  ReactMarkdownNames,
} from 'react-markdown/src/ast-to-react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { css } from '@linaria/core';
import { PARSABLE_LANGUEAGES } from '@/constants/marked';
import { javascript } from 'react-syntax-highlighter/dist/cjs/languages/prism';
import { jsx } from 'react-syntax-highlighter/dist/cjs/languages/prism';
import { css as PrismCss } from 'react-syntax-highlighter/dist/cjs/languages/prism';
import { bash } from 'react-syntax-highlighter/dist/cjs/languages/prism';
import { json } from 'react-syntax-highlighter/dist/cjs/languages/prism';
import { typescript } from 'react-syntax-highlighter/dist/cjs/languages/prism';
import { tsx } from 'react-syntax-highlighter/dist/cjs/languages/prism';

SyntaxHighlighter.registerLanguage(PARSABLE_LANGUEAGES.JAVASCRIPT, javascript);
SyntaxHighlighter.registerLanguage(PARSABLE_LANGUEAGES.JSX, jsx);
SyntaxHighlighter.registerLanguage(PARSABLE_LANGUEAGES.CSS, PrismCss);
SyntaxHighlighter.registerLanguage(PARSABLE_LANGUEAGES.BASH, bash);
SyntaxHighlighter.registerLanguage(PARSABLE_LANGUEAGES.JSON, json);
SyntaxHighlighter.registerLanguage(PARSABLE_LANGUEAGES.TYPESCRIPT, typescript);
SyntaxHighlighter.registerLanguage(PARSABLE_LANGUEAGES.TSX, tsx);

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
