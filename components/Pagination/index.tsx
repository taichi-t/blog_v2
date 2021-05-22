import Link from 'next/link';
import * as React from 'react';

import { POSTS_LIMIT } from '@/constants/meta';
import { GetPostsCountQuery } from '@/generated/graphql';

type Props = {
  count: GetPostsCountQuery['postsConnection']['aggregate']['count'];
};

const Pagination: React.VFC<Props> = ({ count }) => {
  const postCountPerPages = Math.ceil(count / POSTS_LIMIT);
  const linkcomponents = [...Array(postCountPerPages)].map((_, index) => (
    <Link href={{ pathname: '/', query: { page: index } }} passHref key={index}>
      <a>{index + 1}</a>
    </Link>
  ));
  return <div>{linkcomponents}</div>;
};

export default Pagination;
