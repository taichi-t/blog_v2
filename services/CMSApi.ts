import { GraphQLClient } from 'graphql-request';
import { MyProfileDocument, MyProfileQuery } from '@/generated/graphql';

class CMSApi {
  graphQLClient: GraphQLClient;
  constructor() {
    this.graphQLClient = new GraphQLClient(
      process.env.NEXT_PUBLIC_GRAPHQL_CMS_ENDPOINT as string
    );
  }

  getMyProfile = async (): Promise<MyProfileQuery> => {
    console.log();
    const result = await this.graphQLClient.request<MyProfileQuery>(
      MyProfileDocument
    );
    console.log(result);

    return result;
  };
}

export default CMSApi;
