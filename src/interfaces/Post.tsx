
export default interface PostProps {
  id: number;
  title: string;
  slug: string;
  content: string;
  notes: string,
  author: string;
  image: string;
  published: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
}
