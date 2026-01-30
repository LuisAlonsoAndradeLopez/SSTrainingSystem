//TODO:
// Datepicker to published year
// Filters should work
// Books management divs hiding and showing

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createBook, getBooks } from "../api/booksApi";
import type { Book } from "../types/Book";
import { getAxiosErrorMessage } from "../utils/axiosError";

export default function BooksManagement() {
  const [ssTrainingSystemDatabaseBooks, setSSTrainingSystemDatabaseBooksBooks] = useState<Book[]>([]);
  useEffect(() => {
    getBooks()
      .then(res => setSSTrainingSystemDatabaseBooksBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const [addBookForm, setAddBookForm] = useState({
    title: '',
    author: '',
    published_year: '',
  });

  const addBookHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddBookForm({
      ...addBookForm,
      [e.target.name]: e.target.value,
    });
  };

  const [selectABookDivIsVisible, setSelectABookDivIsVisible] = useState(true);
  const [addBookDivIsVisible, setAddBookDivIsVisible] = useState(false);
  const [modifyBookDivIsVisible, setModifyBookDivIsVisible] = useState(false);

  //Buttons OnClick Functions
  const addBookButton1OnClick = async () => {

  };

  const addBookButton2OnClick = async () => {
    try {
      await createBook({
        title: addBookForm.title,
        author: addBookForm.author,
        published_year: addBookForm.published_year,
      });

      alert("Book added successfully");
      navigate('/');
    } catch (error) {
      alert(getAxiosErrorMessage(error, "Registration failed"));
    }
  };

  const ssTrainingSystemDatabaseBookButtonOnClick = async () => {

  };

  const modifyBookButtonOnClick = async () => {

  };

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
            name="booksSearchText"
            placeholder="Search by Title..."
            className="w-[33.3%] h-10 px-2 bg-white text-xl text-black rounded-md"
          />
          <select
            name="booksSearchType"
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
            {ssTrainingSystemDatabaseBooks.map((ssTrainingSystemDatabaseBook) => (
              <button
                key={ssTrainingSystemDatabaseBook.id}
                className="
                flex-shrink-0
                  flex flex-col justify-center items-center
                  w-full p-4
                  bg-neutral-900 rounded-lg
                  text-white
                  hover:bg-neutral-800
                  transition
                "
                onClick={ssTrainingSystemDatabaseBookButtonOnClick}
              >
                <h2 className="text-3xl">Title: {ssTrainingSystemDatabaseBook.title}</h2>
                <h2 className="text-3xl">Author: {ssTrainingSystemDatabaseBook.author}</h2>
              </button>
            ))}
          </div>

          {/* Books actions div */}
          <div className="flex flex-col justify-center items-center w-full h-135 bg-neutral-700 rounded-lg">
            {!selectABookDivIsVisible && (
              <div style={{ fontSize: "90px" }} className="font-semibold">Select a book</div>
            )}
            {addBookDivIsVisible && (
              <div className="flex flex-col justify-start items-center w-full h-120 gap-7">
                <h2 style={{ fontSize: "50px" }} className="font-semibold">Add Book</h2>
                <div className="flex flex-col justify-start items-center w-full gap-3">
                  <h2 className="text-2xl font-semibold">Name:</h2>
                  <input
                    type="text"
                    name="addBookNameText"
                    value={addBookForm.title}
                    onChange={addBookHandleChange}
                    className="w-[60%] h-10 px-2 bg-white text-xl text-black rounded-md"
                  />
                  <h2 className="text-2xl font-semibold">Author:</h2>
                  <input
                    type="text"
                    name="addBookAuthorText"
                    value={addBookForm.author}
                    onChange={addBookHandleChange}
                    className="w-[60%] h-10 px-2 bg-white text-xl text-black rounded-md"
                  />
                  <h2 className="text-2xl font-semibold">Published Year:</h2>
                  <input
                    type="date"
                    name="addBookPublishedYearText"
                    value={addBookForm.published_year}
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
            {!modifyBookDivIsVisible && (
              <div style={{ fontSize: "90px" }}>Select a book</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}