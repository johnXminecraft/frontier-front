
import { api } from "./api"
import type PostProps from "../interfaces/Post.tsx"

export interface ResponseFrontier {
    items: PostProps[];
    total: number;
    page: number;
    pageSize: number;
}

export interface UpdatePostRequest {
  title?: string;
  slug?: string;
  content?: string;
  notes?: string;
  author?: string;
  image?: string;
  published?: boolean;
}

export const getPosts = (
  page: number,
  pageSize = 10
): Promise<ResponseFrontier> =>
  api<ResponseFrontier>(`/posts?page=${page}&pageSize=${pageSize}&published=true`);

export const getPostById = (
  id: number
): Promise<PostProps> => 
  api<PostProps>(`/posts/${id}`);

export const addPost = (
  title: string,
  slug: string,
  content: string,
  notes: string,
  author: string,
  image: string,
  published: boolean
): Promise<PostProps> => {
  return api<PostProps>("/posts", {
    method: "POST",
    body: JSON.stringify({ title, slug, content, notes, author, image, published }),
  });
};

export const deletePost = (id: number): Promise<void> => {
  return api<void>(`/posts/${id}`, {
    method: "DELETE",
  });
};

export const updatePost = (
  id: number,
  data: UpdatePostRequest
): Promise<PostProps> => {
  return api<PostProps>(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
