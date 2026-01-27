import axios from 'axios';
import type { Book } from '../types/Book';

const booksApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

export const getBooks = () => booksApi.get<Book[]>('/books');
export const getBook = (id: number) => booksApi.get<Book>(`/books/${id}`);
export const createBook = (book: Book) => booksApi.post<Book>('/books', book);
export const updateBook = (id: number, book: Book) => booksApi.put<Book>(`/books/${id}`, book);
export const deleteBook = (id: number) => booksApi.delete(`/books/${id}`);
