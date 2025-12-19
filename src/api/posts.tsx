
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

export const getPosts = (
  page: number,
  pageSize = 10
): Promise<ResponseFrontier> =>
  api<ResponseFrontier>(
    `/posts?page=${page}&pageSize=${pageSize}&published=true`
);
