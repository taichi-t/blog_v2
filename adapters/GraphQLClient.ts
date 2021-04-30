/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient as _GraphQLClient } from 'graphql-request';
import { DocumentNode } from 'graphql';

class GraphQLClient {
  private graphQLClient: _GraphQLClient;

  constructor({ endpoint }: { endpoint: string }) {
    this.graphQLClient = new _GraphQLClient(endpoint);
  }

  request = async <T = any>(query: DocumentNode): Promise<T> => {
    const result = await this.graphQLClient.request<T>(query);
    return result;
  };
}

export default GraphQLClient;
