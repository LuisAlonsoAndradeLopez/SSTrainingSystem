import api from './api';
import type { Book } from '../types/Book';

export const getBooks = () =>
  api.get<Book[]>('/books');

export const getBook = (id: number) =>
  api.get<Book>(`/books/${id}`);

export const createBook = (book: Book) =>
  api.post<Book>('/books', book);

export const updateBook = (id: number, book: Book) =>
  api.put<Book>(`/books/${id}`, book);

export const deleteBook = (id: number) =>
  api.delete(`/books/${id}`);

