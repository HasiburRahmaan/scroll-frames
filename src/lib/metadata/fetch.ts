export interface FetchOptions extends RequestInit {
  next?: {
    revalidate?: number;
  };
}

export interface RetryOptions {
  retries?: number;
  delay?: number;
  timeout?: number;
}

export class FetchError extends Error {
  constructor(message: string, public readonly attempt?: number) {
    super(message);
    this.name = 'FetchError';
  }
}

export const get = async <T>(
  url: string,
  cacheType?: FetchOptions,
  options: RetryOptions = { retries: 3, delay: 2000, timeout: 10000 }
): Promise<T> => {
  const { retries = 3, delay = 2000, timeout = 10000 } = options;

  const fetchWithTimeout = async (
    url: string,
    fetchOptions: FetchOptions,
    timeout: number
  ): Promise<Response> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { ...fetchOptions, signal: controller.signal });
      return response;
    } finally {
      clearTimeout(timer);
    }
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const fetchOptions: FetchOptions = cacheType
        ? cacheType
        : { next: { revalidate: 120 } };

      const res = await fetchWithTimeout(url, fetchOptions, timeout);

      if (!res.ok) {
        throw new FetchError(`Fetch error: ${res.statusText}`, attempt);
      }

      return (await res.json()) as T;
    } catch (error: any) {
      console.error(`Attempt ${attempt} failed: ${error.message}`);

      if (attempt < retries) {
        const backoffDelay = delay * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, backoffDelay));
      } else {
        console.error('Max retries reached. Could not fetch the data.');
        throw new FetchError('Max retries reached. Could not fetch the data.', attempt);
      }
    }
  }
  // This statement is unreachable, but TypeScript will throw an error during build if nothing is returned 
  throw new FetchError('Unexpected error');
};
