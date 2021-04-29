/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient as GraphQLRequest } from 'graphql-request';
import { DocumentNode } from 'graphql';

class GraphQLClient {
  private graphQLClient: GraphQLRequest;

  constructor({ endpoint }: { endpoint: string }) {
    this.graphQLClient = new GraphQLRequest(endpoint);
  }

  request = async (query: DocumentNode): Promise<Record<string, any>> => {
    const result = await this.graphQLClient.request(query);
    return result;
  };
}

export default GraphQLClient;
