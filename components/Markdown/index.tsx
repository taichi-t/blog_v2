import { css } from '@linaria/core';
import {
  NormalComponents,
  SpecialComponents,
} from 'react-markdown/src/ast-to-react';

import CodeBlock from './CodeBlock';

const MarkdownElements: Partial<NormalComponents & SpecialComponents> = {
  code: CodeBlock,
};

export default MarkdownElements;

export const gfmMarkdownStyles = css`
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  word-wrap: break-word;
  font-size: var(--font-size-md);

  & code[class*=\"language-\"] {
    font-family: var(--font-family-code) !important;
    font-size: 1.2em !important;
  }

  & > details {
    display: block;
  }

  & > summary {
    display: list-item;
  }

  & > a {
    background-color: initial;
  }

  & > a:active,
  & > a:hover {
    outline-width: 0;
  }

  & > strong {
    font-weight: inherit;
    font-weight: bolder;
  }

  & > h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  & > img {
    border-style: none;
  }

  & > hr {
    box-sizing: initial;
    height: 0;
    overflow: visible;
  }

  & > input {
    font: inherit;
    margin: 0;
  }

  & > input {
    overflow: visible;
  }

  & > [type='checkbox'] {
    box-sizing: border-box;
    padding: 0;
  }

  & > * {
    box-sizing: border-box;
  }

  & > input {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  & > a {
    text-decoration: none;
  }

  & > a:hover {
    text-decoration: underline;
  }

  & > strong {
    font-weight: 600;
  }

  & > hr {
    height: 0;
    margin: 15px 0;
    overflow: hidden;
    background: transparent;
    border: 0;
    border-bottom: 1px solid var(--color-divider);
  }

  & > hr:after,
  & > hr:before {
    display: table;
    content: '';
  }

  & > hr:after {
    clear: both;
  }

  & > table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  & > td,
  & > th {
    padding: 0;
  }

  & > details summary {
    cursor: pointer;
  }

  & > h1,
  & > h2,
  & > h3,
  & > h4,
  & > h5,
  & > h6 {
    margin-top: 0;
    margin-bottom: 0;
  }

  & > h1 {
    font-size: 32px;
  }

  & > h1,
  & > h2 {
    font-weight: 600;
  }

  & > h2 {
    font-size: 24px;
  }

  & > h3 {
    font-size: 20px;
  }

  & > h3,
  & > h4 {
    font-weight: 600;
  }

  & > h4 {
    font-size: 16px;
  }

  & > h5 {
    font-size: 14px;
  }

  & > h5,
  & > h6 {
    font-weight: 600;
  }

  & > h6 {
    font-size: 12px;
  }

  & > p {
    margin-top: 0;
    margin-bottom: 10px;
  }

  & > blockquote {
    margin: 0;
  }

  & > ol,
  & > ul {
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  & > ol ol,
  & > ul ol {
    list-style-type: lower-roman;
  }

  & > ol ol ol,
  & > ol ul ol,
  & > ul ol ol,
  & > ul ul ol {
    list-style-type: lower-alpha;
  }

  & > dd {
    margin-left: 0;
  }

  & > hr {
    border-bottom-color: var(--color-divider);
  }

  & > :after,
  & > :before {
    display: table;
    content: '';
  }

  & > :after {
    clear: both;
  }

  & > :first-child {
    margin-top: 0 !important;
  }

  & > :last-child {
    margin-bottom: 0 !important;
  }

  & > a:not([href]) {
    color: inherit;
    text-decoration: none;
  }

  & > blockquote,
  & > details,
  & > dl,
  & > ol,
  & > p,
  & > table,
  & > ul {
    margin-top: 0;
    margin-bottom: 16px;
  }

  & > hr {
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: var(--color-skeleton);
    border: 0;
  }

  & blockquote {
    padding: 0 1em;
    color: var(--color-grey300);
    border-left: 0.25em solid var(--color-grey200);
  }

  & > blockquote > :first-child {
    margin-top: 0;
  }

  & > blockquote > :last-child {
    margin-bottom: 0;
  }

  & > h1,
  & > h2,
  & > h3,
  & > h4,
  & > h5,
  & > h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }

  & > h1 {
    font-size: 2em;
  }

  & > h1,
  & > h2 {
    padding-bottom: 0.3em;
    border-bottom: 1px solid var(--color-divider);
  }

  & > h2 {
    font-size: 1.5em;
  }

  & > h3 {
    font-size: 1.25em;
  }

  & > h4 {
    font-size: 1em;
  }

  & > h5 {
    font-size: 0.875em;
  }

  & > h6 {
    font-size: 0.85em;
    color: var(--color-grey300);
  }

  & > ol,
  & > ul {
    padding-left: 2em;
  }

  & > ol ol,
  & > ol ul,
  & > ul ol,
  & > ul ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  & > li {
    word-wrap: break-all;
  }

  & > li > p {
    margin-top: 16px;
  }

  & > li + li {
    margin-top: 0.25em;
  }

  & > dl {
    padding: 0;
  }

  & > dl dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: 600;
  }

  & > dl dd {
    padding: 0 16px;
    margin-bottom: 16px;
  }

  & > table {
    display: block;
    width: 100%;
    overflow: auto;
  }

  & > table th {
    font-weight: 600;
  }

  & > table td,
  & > table th {
    padding: 6px 13px;
    border: 1px solid var(--color-divider);
  }

  & > table tr {
    background-color: var(--color-background);
    border-top: 1px solid var(--color-divider);
  }

  & > table tr:nth-child(2n) {
    background-color: var(--color-skeleton);
  }

  & img {
    max-width: 100%;
    box-sizing: initial;
    background-color: var(--color-background);
  }

  & img[align='right'] {
    padding-left: 20px;
  }

  & img[align='left'] {
    padding-right: 20px;
  }
`;
