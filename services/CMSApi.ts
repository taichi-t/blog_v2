import { GraphQLClient } from 'graphql-request';
import {
  MyProfileDocument,
  MyProfileQuery,
  GetPostsDocument,
  GetPostsQueryVariables,
  GetPostsQuery,
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

  getMyProfile = async (): Promise<MyProfileQuery> => {
    const response = await this.graphQLClient.request<MyProfileQuery>(
      MyProfileDocument
    );

    return response;
  };

  getPosts = async (): Promise<GetPostsQuery> => {
    const response = await this.graphQLClient.request<
      GetPostsQuery,
      GetPostsQueryVariables
    >(GetPostsDocument, {
      locales: [Locale.JaJp],
      orderBy: PostOrderByInput.ContentDesc,
    });
    return response;
  };
}

export default new CMSApi();
