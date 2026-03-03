export interface UseLikesReturn {
  count: number;
  liked: boolean;
  like: () => Promise<void>;
}

export function useLikes(pageId: string): UseLikesReturn;
