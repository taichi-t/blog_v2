import { GraphQLClient } from 'graphql-request';
import {
  GetPostsByPageDocument,
  GetPostsByPageQuery,
  GetPostsByPageQueryVariables,
  GetPostBySlugDocument,
  GetPostBySlugQuery,
  GetPostBySlugQueryVariables,
  GetPostsByTagDocument,
  GetPostsByTagQuery,
  GetPostsByTagQueryVariables,
  GetPostsCountDocument,
  GetPostsCountQuery,
  GetPostsCountQueryVariables,
  GetTagsDocument,
  GetTagsQuery,
  GetTagsQueryVariables,
  Locale,
  PostOrderByInput,
} from '@/generated/graphql';
import { Locales } from '@/constants/locales';

class CMSApi {
  graphQLClient: GraphQLClient;
  constructor() {
    this.graphQLClient = new GraphQLClient(
      process.env.GRAPHQL_CMS_ENDPOINT as string
    );
  }

  getPostsByPage = async (
    skip: number,
    locale: Locales,
    orderBy: PostOrderByInput,
    limit: number
  ): Promise<GetPostsByPageQuery> => {
    const response = await this.graphQLClient.request<
      GetPostsByPageQuery,
      GetPostsByPageQueryVariables
    >(GetPostsByPageDocument, {
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

  getTags = async (): Promise<GetTagsQuery> => {
    const response = await this.graphQLClient.request<
      GetTagsQuery,
      GetTagsQueryVariables
    >(GetTagsDocument);
    return response;
  };

  getPostsCount = async (): Promise<GetPostsCountQuery> => {
    const response = await this.graphQLClient.request<
      GetPostsCountQuery,
      GetPostsCountQueryVariables
    >(GetPostsCountDocument);
    return response;
  };
}

export default new CMSApi();
