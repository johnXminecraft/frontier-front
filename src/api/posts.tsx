
import { api } from "./api"

export interface Item {
    id: number;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    createdAtUtc: string;
    updatedAt: string;
}

export interface ResponseFrontier {
    items: Item[];
    total: number;
    page: number;
    pageSize: number;
}

export const getPosts = (): Promise<ResponseFrontier> => {
  return api<ResponseFrontier>(
    "/posts?page=1&pageSize=10&published=true"
  );
};
