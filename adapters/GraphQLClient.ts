import { GraphQLClient as _GraphQLClient } from 'graphql-request';
import { DocumentNode } from 'graphql';
class GraphQLClient {
  private graphQLClient: _GraphQLClient;

  constructor({ endpoint }: { endpoint: string }) {
    this.graphQLClient = new _GraphQLClient(endpoint);
  }

  request = async <T>(query: DocumentNode): Promise<T> => {
    return await this.graphQLClient.request<T>(query);
  };
}

export default GraphQLClient;
