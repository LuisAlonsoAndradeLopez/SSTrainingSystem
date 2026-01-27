export interface Book {
  id?: number; // optional because it doesn't exist when creating
  title: string;
  author: string;
  published_year: number;
  created_at?: string;
  updated_at?: string;
}
