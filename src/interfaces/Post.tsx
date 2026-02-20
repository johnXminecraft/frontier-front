
export default interface PostProps {
  id: number;
  title: string;
  slug: string;
  content: string;
  notes: string,
  author: string;
  published: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
}
