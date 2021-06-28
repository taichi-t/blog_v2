import { css } from '@linaria/core';
import {
  CodeComponent,
  ReactMarkdownNames,
} from 'react-markdown/src/ast-to-react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import prismCss from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { PARSABLE_LANGUEAGES } from '@/constants/marked';

SyntaxHighlighter.registerLanguage(PARSABLE_LANGUEAGES.JSX, jsx);
SyntaxHighlighter.registerLanguage(PARSABLE_LANGUEAGES.JAVASCRIPT, javascript);
SyntaxHighlighter.registerLanguage(PARSABLE_LANGUEAGES.JSON, json);
SyntaxHighlighter.registerLanguage(PARSABLE_LANGUEAGES.CSS, prismCss);
SyntaxHighlighter.registerLanguage(PARSABLE_LANGUEAGES.BASH, bash);
SyntaxHighlighter.registerLanguage(PARSABLE_LANGUEAGES.MARKDOWN, markdown);
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
      wrapLines={true}
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
