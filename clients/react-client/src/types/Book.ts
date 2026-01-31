export interface Book {
  id?: number; // optional because it doesn't exist when creating
  title: string;
  author: string;
  release_date: string;
  created_at?: string;
  updated_at?: string;
}
