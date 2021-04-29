/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient as GraphQLRequest } from 'graphql-request';
import { DocumentNode } from 'graphql';

class GraphQLClient {
  private graphQLClient: GraphQLRequest;

  constructor({ endpoint }: { endpoint: string }) {
    this.graphQLClient = new GraphQLRequest(endpoint);
  }

  request = async <T = any>(query: DocumentNode): Promise<T> => {
    const result = await this.graphQLClient.request<T>(query);
    return result;
  };
}

export default GraphQLClient;
