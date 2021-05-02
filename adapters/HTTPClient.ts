class HttpClient {
  request = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error(`${endpoint} returns ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

export default HttpClient;
