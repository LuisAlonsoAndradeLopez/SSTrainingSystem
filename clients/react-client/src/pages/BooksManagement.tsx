import { Link } from "react-router-dom";

export default function BooksManagement() {
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="flex justify-center items-center h-17 bg-neutral-900 w-full">
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
    </div>
  );
}