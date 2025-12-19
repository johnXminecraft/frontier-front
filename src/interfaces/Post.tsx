
export default interface PostProps {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
}
