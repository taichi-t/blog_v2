import { GraphQLClient } from 'graphql-request';
import { MyProfileDocument, MyProfileQuery } from '@/generated/graphql';

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
}

export default new CMSApi();
