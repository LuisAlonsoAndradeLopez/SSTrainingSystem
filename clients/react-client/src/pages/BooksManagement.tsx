import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createBook, getBooks, updateBook } from "../api/booksApi";
import type { Book } from "../types/Book";
import { getAxiosErrorMessage } from "../utils/axiosError";

export default function BooksManagement() {
  //Auxiliary consts
  const getAllSSTrainingSystemDatabaseBooks = async () => {
    const res = await getBooks();
    setSSTrainingSystemDatabaseBooks(res.data);
  };

  //Book filtering useStates and auxiliary conts
  const [booksSearchText, setBooksSearchText] = useState('');
  const [booksSearchType, setBooksSearchType] = useState<'title' | 'author'>('title');
  const inputPlaceholder =
    booksSearchType === 'title'
      ? 'Search by Title...'
      : 'Search by Author...';

  //Books useStates and filtered books consts
  const [ssTrainingSystemDatabaseBooks, setSSTrainingSystemDatabaseBooks] = useState<Book[]>([]);
  const filteredSSTrainingSystemDatabaseBooks =
    ssTrainingSystemDatabaseBooks.filter((book) => {
      const value =
        booksSearchType === 'title'
          ? book.title
          : book.author;

      return value
        .toLowerCase()
        .startsWith(booksSearchText.toLowerCase());
    });

  const [addBookForm, setAddBookForm] = useState<Book>({
    title: '',
    author: '',
    release_date: '',
  });
  const [selectedBookForm, setSelectedBookForm] = useState<Book>({
    id: 0,
    title: '',
    author: '',
    release_date: '',
  });
  const [modifyBookForm, setModifyBookForm] = useState<Book>({
    id: 0,
    title: '',
    author: '',
    release_date: '',
  });

  const addBookHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddBookForm({
      ...addBookForm,
      [e.target.name]: e.target.value,
    });
  };

  const modifyBookHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifyBookForm({
      ...modifyBookForm,
      [e.target.name]: e.target.value,
    });
  };

  const clearAddBookForm = () => {
    setAddBookForm({
      title: '',
      author: '',
      release_date: '',
    });
  };

  //Books divs CRUD visibility
  type ViewMode = 'nothing_selected' | 'add' | 'view' | 'edit';
  const [viewMode, setViewMode] = useState<ViewMode>('nothing_selected');

  //Buttons OnClick Consts
  const addBookButton1OnClick = async () => {
    setViewMode('add');
  };

  const addBookButton2OnClick = async () => {
    try {
      await createBook(addBookForm);

      alert("Book added successfully");
      getAllSSTrainingSystemDatabaseBooks();
      setViewMode('nothing_selected');
      clearAddBookForm();
    } catch (error) {
      alert(getAxiosErrorMessage(error, "Registration failed"));
    }
  };

  const ssTrainingSystemDatabaseBookButtonOnClick = (book: Book) => {
    setSelectedBookForm(book);
    setViewMode('view');
  };

  const modifyBookButton1OnClick = async () => {
    setModifyBookForm({
      title: selectedBookForm.title,
      author: selectedBookForm.author,
      release_date: selectedBookForm.release_date
    });

    setViewMode('edit');
  };

  const modifyBookButton2OnClick = async () => {
    if (!selectedBookForm.id) {
      return;
    }

    try {
      await updateBook(selectedBookForm.id, {
        title: modifyBookForm.title,
        author: modifyBookForm.author,
        release_date: modifyBookForm.release_date,
      });

      alert("Book modified successfully");
      getAllSSTrainingSystemDatabaseBooks();
      setViewMode('nothing_selected');
      clearAddBookForm();
    } catch (error) {
      alert(getAxiosErrorMessage(error, "Modification failed"));
    }
  };

  //Initializer code
  useEffect(() => {
    getAllSSTrainingSystemDatabaseBooks();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-4 gap-4">
      {/* Header */}
      <div className="flex justify-center items-center w-full h-17 bg-neutral-900 rounded-lg">
        <div className="flex justify-start items-center w-[33.3%]">
          <Link to="/" className="w-30 text-center !text-white bg-red-600 hover:bg-red-700
              font-semibold py-2 rounded-md transition duration-200 ms-4">Back</Link>
        </div>
        <div className="flex justify-center items-center w-[33.3%]">
          <h2 className="text-3xl font-bold">Books Management</h2>
        </div>
        <div className="flex justify-center items-center w-[33.3%]">
          <h2 className="text-2xl">{localStorage.getItem("loggedUserName")}</h2>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col justify-start items-center w-full h-165 p-4 gap-4 bg-neutral-900 rounded-lg">
        {/* Books filters and extra buttons */}
        <div className="flex flex-row justify-start items-center w-full h-17 p-4 gap-4 bg-neutral-700 rounded-lg">
          <h2 className="text-3xl">Search: </h2>
          <input
            type="text"
            name="booksbooksSearchText"
            placeholder={inputPlaceholder}
            value={booksSearchText}
            onChange={(e) => setBooksSearchText(e.target.value)}
            className="w-[33.3%] h-10 px-2 bg-white text-xl text-black rounded-md"
          />
          <select
            name="booksSearchType"
            value={booksSearchType}
            onChange={(e) => setBooksSearchType(e.target.value as 'title' | 'author')}
            className="w-[33.3%] h-10 px-2 bg-white text-xl text-black rounded-md"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
          <button
            type="button"
            onClick={addBookButton1OnClick}
            className="w-[10%] ms-40 text-center text-white bg-neutral-800 hover:bg-neutral-700
             font-semibold py-2 rounded-md transition duration-200"
          >
            Add Book
          </button>
        </div>

        {/* Books management divs */}
        <div className="flex flex-row justify-center items-start w-full h-17 gap-4 rounded-lg">
          {/* Books list div */}
          <div className="flex flex-col justify-start items-center w-full h-135 p-4 gap-4 overflow-y-auto bg-neutral-700 rounded-lg">
            {filteredSSTrainingSystemDatabaseBooks.map((filteredSSTrainingSystemDatabaseBook) => (
              <button
                key={filteredSSTrainingSystemDatabaseBook.id}
                className="
                flex-shrink-0
                  flex flex-col justify-center items-center
                  w-full p-4
                  bg-neutral-900 rounded-lg
                  text-white
                  hover:bg-neutral-800
                  transition
                "
                onClick={() => ssTrainingSystemDatabaseBookButtonOnClick(filteredSSTrainingSystemDatabaseBook)}
              >
                <h2 className="text-3xl">Title: {filteredSSTrainingSystemDatabaseBook.title}</h2>
                <h2 className="text-3xl">Author: {filteredSSTrainingSystemDatabaseBook.author}</h2>
              </button>
            ))}
          </div>

          {/* Books actions div */}
          <div className="flex flex-col justify-center items-center w-full h-135 bg-neutral-700 rounded-lg">
            {viewMode === 'nothing_selected' && (
              <div style={{ fontSize: "90px" }} className="font-semibold">Select a book</div>
            )}
            {viewMode === 'add' && (
              <div className="flex flex-col justify-start items-center w-full h-120 gap-7">
                <h2 style={{ fontSize: "50px" }} className="font-semibold">Add Book</h2>
                <div className="flex flex-col justify-start items-center w-full gap-3">
                  <h2 className="text-2xl font-semibold">Name:</h2>
                  <input
                    type="text"
                    name="title"
                    value={addBookForm.title}
                    onChange={addBookHandleChange}
                    className="w-[60%] h-10 px-2 bg-white text-xl text-black rounded-md"
                  />
                  <h2 className="text-2xl font-semibold">Author:</h2>
                  <input
                    type="text"
                    name="author"
                    value={addBookForm.author}
                    onChange={addBookHandleChange}
                    className="w-[60%] h-10 px-2 bg-white text-xl text-black rounded-md"
                  />
                  <h2 className="text-2xl font-semibold">Release Date:</h2>
                  <input
                    type="date"
                    name="release_date"
                    value={addBookForm.release_date}
                    onChange={addBookHandleChange}
                    className="w-[60%] h-10 px-2 bg-white text-xl text-black rounded-md"
                  />
                </div>
                <button
                  type="button"
                  onClick={addBookButton2OnClick}
                  className="w-[20%] text-center text-white bg-blue-800 hover:bg-blue-700
                  font-semibold py-2 rounded-md transition duration-200"
                >
                  Add Book
                </button>
              </div>
            )}
            {viewMode === 'view' && (
              <div className="flex flex-col justify-start items-center w-full h-120 gap-7">
                <h2 style={{ fontSize: "50px" }} className="font-semibold">Selected Book</h2>
                <div className="flex flex-col justify-start items-center w-full gap-3">
                  <h2 className="text-2xl font-semibold">Name:</h2>
                  <div className="flex flex-row justify-start items-center w-[60%] h-10 px-2 bg-white text-xl text-black rounded-md">
                    {selectedBookForm.title}
                  </div>
                  <h2 className="text-2xl font-semibold">Author:</h2>
                  <div className="flex flex-row justify-start items-center w-[60%] h-10 px-2 bg-white text-xl text-black rounded-md">
                    {selectedBookForm.author}
                  </div>
                  <h2 className="text-2xl font-semibold">Release Date:</h2>
                  <div className="flex flex-row justify-start items-center w-[60%] h-10 px-2 bg-white text-xl text-black rounded-md">
                    {selectedBookForm.release_date}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={modifyBookButton1OnClick}
                  className="w-[21%] text-center text-white bg-blue-800 hover:bg-blue-700
                  font-semibold py-2 rounded-md transition duration-200"
                >
                  Modify Book
                </button>
              </div>
            )}
            {viewMode === 'edit' && (
              <div className="flex flex-col justify-start items-center w-full h-120 gap-7">
                <h2 style={{ fontSize: "50px" }} className="font-semibold">Modify Book</h2>
                <div className="flex flex-col justify-start items-center w-full gap-3">
                  <h2 className="text-2xl font-semibold">Name:</h2>
                  <input
                    type="text"
                    name="title"
                    value={modifyBookForm.title}
                    onChange={modifyBookHandleChange}
                    className="w-[60%] h-10 px-2 bg-white text-xl text-black rounded-md"
                  />
                  <h2 className="text-2xl font-semibold">Author:</h2>
                  <input
                    type="text"
                    name="author"
                    value={modifyBookForm.author}
                    onChange={modifyBookHandleChange}
                    className="w-[60%] h-10 px-2 bg-white text-xl text-black rounded-md"
                  />
                  <h2 className="text-2xl font-semibold">Release Date:</h2>
                  <input
                    type="date"
                    name="release_date"
                    value={modifyBookForm.release_date}
                    onChange={modifyBookHandleChange}
                    className="w-[60%] h-10 px-2 bg-white text-xl text-black rounded-md"
                  />
                </div>
                <button
                  type="button"
                  onClick={modifyBookButton2OnClick}
                  className="w-[21%] text-center text-white bg-blue-800 hover:bg-blue-700
                  font-semibold py-2 rounded-md transition duration-200"
                >
                  Modify Book
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}