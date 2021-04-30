class HTTPClient {
  endpoint: string;
  constructor({ endpoint }: { endpoint: string }) {
    this.endpoint = endpoint;
  }
  request = async <T>(options?: RequestInit): Promise<T> => {
    const data = await fetch(this.endpoint, options);
    return data.json();
  };
}

export default HTTPClient;
