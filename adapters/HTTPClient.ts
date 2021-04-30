class HTTPClient {
  endpoint: string;
  constructor({ endpoint }: { endpoint: string }) {
    this.endpoint = endpoint;
  }
  request = async <T>(options?: RequestInit): Promise<T> => {
    const rowData = await fetch(this.endpoint, options);
    return rowData.json();
  };
}

export default HTTPClient;
