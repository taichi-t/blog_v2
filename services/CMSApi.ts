import { GraphQLClient } from 'graphql-request';

import { Locales } from '@/constants/locales';
import {
  GetIndexContentDocument,
  GetIndexContentQuery,
  GetIndexContentQueryVariables,
  GetPostBySlugDocument,
  GetPostBySlugQuery,
  GetPostBySlugQueryVariables,
  GetPostsByTagDocument,
  GetPostsByTagQuery,
  GetPostsByTagQueryVariables,
  Locale,
  PostOrderByInput,
} from '@/generated/graphql';

class CMSApi {
  graphQLClient: GraphQLClient;
  constructor() {
    this.graphQLClient = new GraphQLClient(
      process.env.GRAPHQL_CMS_ENDPOINT as string
    );
  }

  getIndexContent = async (
    skip: number,
    locale: Locales,
    orderBy: PostOrderByInput,
    limit: number
  ): Promise<GetIndexContentQuery> => {
    const response = await this.graphQLClient.request<
      GetIndexContentQuery,
      GetIndexContentQueryVariables
    >(GetIndexContentDocument, {
      // TODO:
      //replace メソッドをconvert...関数に含める
      locales: [locale.replace('-', '_') as Locale],
      orderBy,
      skip,
      limit,
    });
    return response;
  };

  getPostBySlug = async (
    locale: Locales,
    slug: string
  ): Promise<GetPostBySlugQuery> => {
    const response = await this.graphQLClient.request<
      GetPostBySlugQuery,
      GetPostBySlugQueryVariables
    >(GetPostBySlugDocument, {
      locales: [locale.replace('-', '_') as Locale],
      slug,
    });
    return response;
  };

  getPostsByTag = async (
    locale: [Locale],
    tagSlug: string
  ): Promise<GetPostsByTagQuery> => {
    const response = await this.graphQLClient.request<
      GetPostsByTagQuery,
      GetPostsByTagQueryVariables
    >(GetPostsByTagDocument, {
      locales: locale,
      tagSlug,
    });
    return response;
  };
}

export default new CMSApi();
